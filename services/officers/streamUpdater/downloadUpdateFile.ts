import { readFile, mkdir, stat } from 'fs/promises';
import SftpClient from 'ssh2-sftp-client'
import {dirExists, fileExists, getEnv} from '../shared/utils.js'
import assert from "assert";
import {PassThrough, Readable, Writable} from "stream";
import {createReadStream, createWriteStream} from "fs";
import {Temporal} from "@js-temporal/polyfill";
async function getSftpClient() {
  console.time('Connect to SFTP server')
  const keyFilename = getEnv("SFTP_KEY_FILENAME")
  const sftpUser = getEnv('SFTP_USER')
  const sftpHost = getEnv('SFTP_HOST')
  assert(fileExists(keyFilename), 'Private key file does not exist at provided path: ' + keyFilename)
  const privateKey = await readFile(keyFilename).then(String)
  const sftp = new SftpClient();

  await sftp.connect({
    host: sftpHost,
    port: 22,
    username: sftpUser,
    privateKey
  })
  console.timeEnd('Connect to SFTP server')
  return sftp
}
const pad = n => n.toString().padStart(2, '0')
/**
 * Download the update file for the date specified from the SFTP server. Requires ENV variables to be set.
 * @param date - the year, month and day of the file to get.
 * @param cache - whether it can skip downloading if the file already exists, or whether to stream directly from host.
 *
 * Set these environment variables before calling this function:
 * - `SFTP_KEY_FILENAME`: path to private key to authenticate access to SFTP server
 * - `SFTP_USER`: username for SFTP server
 * - `SFTP_HOST`: host (or IP address) of SFTP server
 * @returns filepath of output.
 */
export async function streamUpdateFile(date: {year: number, month: number, day: number}, cache = true): Promise<Readable>{
  const outputName = `downloads/update-${date.year}-${pad(date.month)}-${pad(date.day)}.dat`

  if(cache && await fileExists(outputName)) {
    console.log("File already exists locally, skipping downloading. To prevent, set cache=false.")
    return createReadStream(outputName, {autoClose: true})
  }
  const sftp = await getSftpClient()
  const dirName = `/free/prod198/${date.year}/${pad(date.month)}/${pad(date.day)}/`
  const dayExists = await sftp.exists(dirName)
  if(!dayExists) {
    await sftp.end()
    throw new Error('Requested date does not exist on server. Try a different day.')
  }
  const filename = getUpdateFilename(date)
  if(cache){
    console.time('Download update file over SFTP')
    await sftp.fastGet(dirName + filename, outputName)
    console.timeEnd('Download update file over SFTP')
    await sftp.end()
    return createReadStream(outputName, {autoClose: true})
  }else{
    const writeStream = new PassThrough()
    writeStream.on('end', ()=> {
      console.log('Write stream ended, closing SFTP connection')
      sftp.end()
    })
    sftp.get(dirName + filename, writeStream)
    return writeStream
  }
}


/** Download all the update files in a date range from the SFTP server */
export async function downloadAllInRange(startDate:{year: number, month: number, day: number}, endDate:{year: number, month: number, day: number}=Temporal.Now.plainDateISO('UTC')){
  const firstDay = Temporal.PlainDate.from(startDate)
  const daysDifference = firstDay.until(endDate).total('days')

  const sftp = await getSftpClient()
  for (let i = 0; i < daysDifference; i++) {
    const date = firstDay.add({days:i})
    if(date.dayOfWeek === 1 || date.dayOfWeek === 7) continue
    const outputName = `downloads/update-${date.year}-${pad(date.month)}-${pad(date.day)}.dat`
    if(await fileExists(outputName)) continue
    const dirName = `/free/prod198/${date.year}/${pad(date.month)}/${pad(date.day)}/`
    const dayExists = await sftp.exists(dirName) // approx 50 - 100 milliseconds to perform this op
    if(!dayExists) {
      // occasionally, a Saturday doesn't exist (about 1 per year)
      console.log("Day folder doesn't exist: ", date.toString())
      continue
    }
    // const filename = await sftp.list(dirName).then(f=>f.length === 1 ? f[0].name : undefined)
    const filename = getUpdateFilename(date)
    console.time('Download update file over SFTP')
    await sftp.fastGet(dirName + filename, outputName)
    console.timeEnd('Download update file over SFTP')
  }
  await sftp.end()
}

/*
todo:
 - try event sourcing for updates, rather than only storing current state
 */

/**
 * Calculate filename by counting number of days since run number zero index.
 * Saves having to list the files in the server directory.
 */
export function getUpdateFilename(date: {year: number, month: number, day: number}){
  const plainDate = Temporal.PlainDate.from(date)
  const zeroIndex = Temporal.PlainDate.from('2010-03-20')
  const weeks = zeroIndex.until(plainDate).round({relativeTo: '2010-03-20',roundingMode: 'ceil', smallestUnit: 'weeks'}).total({relativeTo: '2010-03-20',unit:'weeks'})
  const runNumber = weeks * 5 + plainDate.dayOfWeek
  const suffixIntroduced = Temporal.PlainDate.from('2020-11-18')
  const suffix = plainDate.until(suffixIntroduced).sign === 1 ? '' :'.txt'
  return `Prod198_${runNumber}${suffix}`
}

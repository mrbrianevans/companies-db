import { readFile, mkdir, stat } from 'fs/promises';
import SftpClient from 'ssh2-sftp-client'
import {dirExists, fileExists, getEnv} from '../shared/utils.js'
import assert from "assert";
import {PassThrough, Readable, Writable} from "stream";
import {createReadStream, createWriteStream} from "fs";

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
  const keyFilename = getEnv("SFTP_KEY_FILENAME")
  const sftpUser = getEnv('SFTP_USER')
  const sftpHost = getEnv('SFTP_HOST')
  assert(fileExists(keyFilename), 'Private key file does not exist at provided path: '+keyFilename)
  const privateKey = await readFile(keyFilename).then(String)
  const pad = n => n.toString().padStart(2, '0')
  const outputName = `downloads/update-${date.year}-${pad(date.month)}-${pad(date.day)}.dat`

  if(cache && await fileExists(outputName)) {
    console.log("File already exists locally, skipping downloading. To prevent, set cache=false.")
    return createReadStream(outputName)
  }

  const sftp = new SftpClient();

  await sftp.connect({
    host: sftpHost,
    port: 22,
    username: sftpUser,
    privateKey
  })

  const dirName = `/free/prod198/${date.year}/${pad(date.month)}/${pad(date.day)}/`
  const dayExists = await sftp.exists(dirName)
  if(!dayExists) throw new Error('Requested date does not exist on server. Try a different day.')
  // const filename = `Prod198_${3244}.txt` // run number could be calculated by number of days
  const filename = await sftp.list(dirName).then(f=>f.length === 1 ? f[0].name : undefined)
  if(cache){
    console.time('Download update file over SFTP')
    await sftp.fastGet(dirName + filename, outputName)
    console.timeEnd('Download update file over SFTP')
    return createReadStream(outputName)
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


/*
todo:
 - try event sourcing for updates, rather than only storing current state
 */

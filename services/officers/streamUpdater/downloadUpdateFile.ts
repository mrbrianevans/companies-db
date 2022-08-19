import { readFile, mkdir, stat } from 'fs/promises';
import SftpClient from 'ssh2-sftp-client'
import {dirExists, fileExists, getEnv} from '../shared/utils.js'
import * as assert from "assert";

/**
 * Download the update file for the date specified from the SFTP server. Requires ENV variables to be set.
 * @param date - the year, month and day of the file to get.
 * @param forceDownload - whether it can skip downloading if the file already exists, or force downloading anyway.
 *
 * Set these environment variables before calling this function:
 * - `SFTP_KEY_FILENAME`: path to private key to authenticate access to SFTP server
 * - `SFTP_USER`: username for SFTP server
 * - `SFTP_HOST`: host (or IP address) of SFTP server
 * @returns filepath of output.
 */
export async function downloadUpdateFile(date: {year: number, month: number, day: number}, forceDownload = false){
  const keyFilename = getEnv("SFTP_KEY_FILENAME")
  const sftpUser = getEnv('SFTP_USER')
  const sftpHost = getEnv('SFTP_HOST')
  assert(fileExists(keyFilename), 'Private key file does not exist at provided path: '+keyFilename)
  const privateKey = await readFile(keyFilename).then(String)

  if(!await dirExists('downloads')) await mkdir('downloads', {recursive: true})
  const pad = n => n.toString().padStart(2, '0')
  const outputName = `downloads/update-${date.year}-${pad(date.month)}-${pad(date.day)}.dat`
  if(!forceDownload && await fileExists(outputName)) {
    console.log("File already exists locally, skipping downloading. To prevent, set forceDownload=true.")
    return outputName
  }

  const sftp = new SftpClient();

  await sftp.connect({
    host: sftpHost,
    port: 22,
    username: sftpUser,
    privateKey
  })

  console.time('Fetch update file')
  const dirName = `/free/prod198/${date.year}/${pad(date.month)}/${pad(date.day)}/`
  // const filename = `Prod198_${3244}.txt` // run number could be calculated by number of days
  const filename = await sftp.list(dirName).then(f=>f.length === 1 ? f[0].name : undefined)
  console.timeLog('Fetch update file','Downloading',{dirName, filename})
  await sftp.get(dirName + filename, outputName)
  console.timeEnd('Fetch update file')

  await sftp.end()

  return outputName
}


/*
todo:
 - try event sourcing for updates, rather than only storing current state
 */

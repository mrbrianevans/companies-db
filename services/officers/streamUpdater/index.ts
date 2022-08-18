import { readFile } from 'fs/promises';
import * as SftpClient from 'ssh2-sftp-client'
import {getEnv} from '../shared/utils.js'

const sftp = new SftpClient();

// put these in environment variables
const keyFilename = getEnv("SFTP_KEY_FILENAME")
const sftpUser = getEnv('SFTP_USER')
const sftpHost = getEnv('SFTP_HOST')

async function downloadUpdateFile(date: {year: number, month: number, day: number}){
  const privateKey = await readFile(keyFilename).then(String)

  await sftp.connect({
    host: sftpHost,
    port: 22,
    username: sftpUser,
    privateKey
  })

  console.time('Fetched update file')
  const pad = n => n.toString().padStart(2, '0')
  const dirName = `/free/prod198/${date.year}/${pad(date.month)}/${pad(date.day)}/`
  // const filename = `Prod198_${3244}.txt` // run number could be calculated by number of days
  const filename = await sftp.list(dirName).then(f=>f.length === 1 ? f[0].name : undefined)
  console.timeLog('Fetched update file','Downloading',{dirName, filename})
  const outputName = `update-${date.year}-${pad(date.month)}-${pad(date.day)}.dat`
  await sftp.get(dirName + filename, outputName)
  console.timeEnd('Fetched update file')

  await sftp.end()
}

console.time('whole function')
await downloadUpdateFile({year: 2022, month: 8, day: 17})
console.timeEnd('whole function')

/*

Notes on keeping officers up to date:
 - try event sourcing for updates, rather than only storing current state
 - need parsing logic to be shared between load bulk and stream updates

 */

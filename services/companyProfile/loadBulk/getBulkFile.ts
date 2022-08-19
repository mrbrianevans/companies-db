import {resolve} from "node:path";
import {mkdir, stat} from "node:fs/promises";
import {request} from "node:http";
import {pipeline} from "node:stream/promises";
import {createWriteStream} from "node:fs";
import {once} from "node:events";
import {promisify} from "node:util";
import * as yauzl from "yauzl";
import { Readable } from "node:stream";
const yauzlOpenZip = promisify(yauzl.open)

/** using HTTP
 * @param index - the index of the file to download. eg 1of7
 * @param total - number of snapshot file chunks on http://download.companieshouse.gov.uk/en_output.html
 * @param date - the date of the files to download in YYYY-MM-DD format. Usually today's date.
 */
async function downloadFile(index:number,total:number,date:string){
  const filename = `BasicCompanyData-${date}-part${index}_${total}.zip`
  const filepath = resolve('downloads', 'zipped',date, filename)
  //check if the file already exists
  const filestat = await stat(filepath).catch(e=>null)
  if(filestat?.isFile()) return filepath // early exit

  const zipUrl = `http://download.companieshouse.gov.uk/${filename}`
  console.log('Downloading '+zipUrl)
  const req = request(zipUrl)
  req.on('response', async (res)=>{
    await mkdir(resolve('downloads','zipped',date), {recursive: true})
    await pipeline(res, createWriteStream(filepath, {encoding: 'utf-8'}))
  })
  req.end()
  await once(req, 'close')
  return filepath
}

// returns a readable stream of file contents of the only file in a ZIP archive
async function unzipFile(zipFilename: string){
  // @ts-ignore
  const zipfile = await yauzlOpenZip(zipFilename, {lazyEntries: true, autoClose: true})
  if(zipfile.entryCount === 1){
    let openReadStream = promisify(zipfile.openReadStream.bind(zipfile));
    zipfile.readEntry();
    const [entry] = await once(zipfile, 'entry')
    return await openReadStream(entry)
  }else{
    throw new Error('More than one file in zip archive')
  }
}


export async function getBulkFile(index:number,total:number,date:string): Promise<Readable>{
  console.time("Download file "+index)
  const zipFilename = await downloadFile(index, total, date)
  console.timeEnd("Download file "+index)
  const unzipStream = await unzipFile(zipFilename)
  return unzipStream
}

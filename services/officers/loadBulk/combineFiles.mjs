import {Transform} from "stream";
import {createReadStream, createWriteStream} from "fs";
import split2 from "split2";
import {parseRecord} from "../shared/recordParser/parseRecord.js";
import {readdir} from "node:fs/promises";
import {once} from "node:events";
import {resolve} from "node:path";

// const startTime = performance.now()

const inputDirectory = 'N:\\CompaniesHouse\\officersdata\\Prod195_3342'
const outputFile = 'combined.json'

const stringStream = new Transform({
    writableObjectMode: true,
    readableObjectMode: false,
    transform(chunk, encoding, callback) {
        callback(null, JSON.stringify(chunk) + '\n')
    },
})
stringStream.setMaxListeners(20)
const outputStream = createWriteStream(outputFile)
const inputs = await readdir(inputDirectory)
console.time('Piping')
for (const input of inputs) {
    //TODO: could be improved with multithreading using Workers
    const parseStream = split2(parseRecord)
    const errors = []
    const inputStream = createReadStream(resolve(inputDirectory, input))
    // inputStream.on('data', d=>parseStream.write(d))
    inputStream.pipe(parseStream, {end: false}).on('error', e => errors.push(e)).pipe(stringStream).on('end', () => {
        console.timeLog('Piping', input);
        console.log(errors.length, 'errors')
    })
}

stringStream.pipe(outputStream)

// parseStream.on('data', (data)=>{
//
// })


// const duration = performance.now() - startTime
// console.log('Time taken to parse',count.toString(),'records:',duration.toFixed(2)+'ms')

// command line tool to process officers bulk file



import split2 from 'split2'
import {pipeline} from "stream/promises";
import {parseRecord} from "../shared/recordParser/parseRecord.js";
import {Transform, TransformCallback} from "stream";
import commandLineUsage from 'command-line-usage'
import commandLineArgs from 'command-line-args'
import {createReadStream, createWriteStream} from "fs";

// command line handling -----------------------------------------------------
const commandLineOptionDefinitions = [
  { name: 'verbose', alias: 'v', type: Boolean },
  { name: 'output', alias: 'o', type: String },
  { name: 'input', alias: 'i', type: String },
  { name: 'help', alias: 'h', type: Boolean },
  { name: 'limit', alias: 'l', type: Number }
]
const options = commandLineArgs(commandLineOptionDefinitions)
const sections = [
  {
    header: 'Parse officers bulk file',
    content: 'Parses records from a Companies House officers bulk file and outputs JSON.'
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'input',
        alias: 'i',
        typeLabel: '{underline file}',
        description: 'The input file to process. If not provided, process stdin is used as input.'
      },
      {
        name: 'output',
        alias: 'o',
        typeLabel: '{underline file}',
        description: 'The path to the output file. If not provided, process stdout is used as output destination.'
      },
      {
        name: 'help',
        alias: 'h',
        type: Boolean,
        description: 'Print this usage guide.'
      },
      {
        name: 'verbose',
        alias: 'v',
        type: Boolean,
        description: 'Print more details about operation.'
      },
      {
        name: 'limit',
        alias: 'l',
        type: Number,
        description: 'Maximum limit on number of records to process'
      }
    ]
  },
  {
    header: 'Example usage',
    content: [
      {
        desc: 'With standard input/output:',
        example: '$ cat input.dat | node cmd.js -v -l 500 > output.json'
      },
      {
        desc: 'With file input/output:',
        example: '$ node cmd.js -v -l 500 -i input.dat -o output.json'
      }
    ]
  }
]

const getLoggerFromStream = (str: {write(msg:string)}) => (...msgs: string[]) => str.write(msgs.join(' ')+'\n')
let log = getLoggerFromStream(process.stdout)
const usage:string = commandLineUsage(sections)
if(options.help) {
  log(usage)
  process.exit(0)
}

if(options.verbose && !options.output){
  log = getLoggerFromStream(process.stderr)
  log('Because verbose=true and output=stdout log messages will be printed to stderr.')
}

if(options.verbose){
  log('Running parser with options: '+JSON.stringify(options))
}

// actual program logic -----------------------------------------------------
const stringStream = new Transform({
  writableObjectMode: true,
  readableObjectMode: false,
  transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
    callback(null, JSON.stringify(chunk) + '\n')
  }
})
const inputStream = options.input ? createReadStream(options.input) : process.stdin
const outputStream = options.output ? createWriteStream(options.output) : process.stdout
const parseStream = split2(parseRecord)

const ac = new AbortController()
const {signal} = ac
let count = -1
parseStream.on('data', ()=>{
  if(++count >= options.limit) ac.abort()
})

const startTime = performance.now()
await pipeline(inputStream, parseStream , stringStream, outputStream, {signal})
  .catch(e=>{
    if(e.code === 'ABORT_ERR') {
      if (options.verbose) log("Aborted due to reaching specified limit of", options.limit)
    }else throw e
})
const duration = performance.now() - startTime
if(options.verbose) log('Time taken to parse',count.toString(),'records:',duration.toFixed(2)+'ms')

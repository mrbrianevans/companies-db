import {copyFile,rm} from 'fs/promises'
import {resolve} from 'path'
// copy the spec file out
await copyFile(resolve('output/api/openapi.yaml'), resolve('apispec.yaml'))
// delete other generated files, they are not needed
await rm(resolve('output'),{recursive: true, force: true})

console.log('There are some errors in the API specification, such as missing parameter descriptions etc that need to be fixed manually')
console.log('The file would benefit from being reformatted to fix the indentation')

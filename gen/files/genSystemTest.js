import {readFile, writeFile} from "node:fs/promises";
import {resolve} from "path";
import {camelCase, kebabCase, prettyTs} from "../utils.js";

const marker = `// tests for each path`
export async function genSystemTest(SYS_TEST_DIR, tagName) {
    const fileContent = `
import * as TestRequests from "../getTestRequests";
import {testRequests} from "../testRequests";
fetch('http://localhost:3000').catch() //to remove warning about fetch being experimental from test results

describe('${kebabCase(tagName)}-service', function () {
${marker}

});

    `
    await writeFile(resolve(SYS_TEST_DIR, tagName + '.spec.ts'), prettyTs(fileContent))
}

export async function addPathSystemTest(SYS_TEST_DIR, tag, path, name, responseSchema){
    const testContent = `
  it('${name}: ${path}', async function () {
    const schema = ${JSON.stringify(responseSchema)}
    await testRequests(TestRequests.${name}Reqs, schema)
  });
    `
    // this logs out a starting point for the getTestRequests file
    // const params = path.match(/\{.*?}/g)?.map(p=>p.replace('{', '').replace('}', ''))
    // if(params?.length === 2)
    //     console.log(`export const ${name}Reqs = Object.entries(testData.${camelCase(params[1])}s).flatMap(([${params[0]}, ${params[1]}s])=>${params[1]}s.map(${params[1]}=>({path:\`${path.replaceAll('{', '${')}\`})))`)
    // else if(params?.length === 1)
    //     console.log(`export const ${name}Reqs = testData.${camelCase(params[0])}s.map(${params[0]}=>({path: \`${path.replaceAll('{', '${')}\`}))`)
    // else
    //     console.log(`export const ${name}Reqs = []`)
    const filename = resolve(SYS_TEST_DIR, tag + '.spec.ts')
    const testFile = await readFile(filename).then(String).then(file=>file.replace(marker, marker+testContent))
    await writeFile(filename, prettyTs(testFile))
}

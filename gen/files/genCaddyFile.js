import {readFile, writeFile} from "node:fs/promises";
import {resolve} from "path";
import {camelCase, kebabCase} from "../utils.js";


export async function newCaddyFile(SERVICES_DIR){
    await writeFile(resolve(SERVICES_DIR, 'Caddyfile'), `
:2022 {
        metrics /metrics
}
:80 {
        log # logs requests
        @notauthed not header_regexp Authorization ^Basic\\s[a-zA-Z0-9]+={0,2}$
        respond @notauthed 401 {
                body "{\\"statusCode\\": 401, \\"error\\": \\"Not authorised\\", \\"message\\": \\"Basic authentication token not included in request header.\\"}"
                close
        }
        # proxy to microservices
}
`.trim())
}

export async function addCaddyFileEntry(SERVICES_DIR, path, tag){
    const ruleName = '@' + kebabCase(path.replace(/\{(.*?)}/g, (all, name)=>'-'+name+'-').replaceAll('/',''))
    const caddyfile = await readFile(resolve(SERVICES_DIR, 'Caddyfile')).then(String).then(caddyfile => caddyfile.replace(`# proxy to microservices`, marker => `${marker}
        ${ruleName} {
                header_regexp Authorization ^Basic\\s[a-zA-Z0-9]+={0,2}$
                path_regexp ^${path.replace('{company_number}', '[A-Z\\d]{4,8}').replace(/\{[a-z_]+}/gi, '[a-zA-Z0-9_-]+').replace(/\//g, '\\/')}$
        }
        reverse_proxy ${ruleName} ${kebabCase(tag)}-web-service:3000 {
                header_down Service ${kebabCase(tag)}
        }
`))
    await writeFile(resolve(SERVICES_DIR, 'Caddyfile'), caddyfile)
}

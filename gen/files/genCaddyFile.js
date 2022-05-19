import {readFile, writeFile} from "node:fs/promises";
import {resolve} from "path";
import {camelCase, kebabCase} from "../utils.js";


export async function newCaddyFile(SERVICES_DIR){
    await writeFile(resolve(SERVICES_DIR, 'Caddyfile'), `:80 {
    @authed header_regexp Authorization ^Basic\\s[a-zA-Z0-9]+={0,2}$
    # proxy to microservices
}
`)
}

export async function addCaddyFileEntry(SERVICES_DIR, path, tag){
    const ruleName = '@' + kebabCase(path.replace(/\{(.*?)}/g, (all, name)=>'-'+name+'-').replaceAll('/',''))
    const caddyfile = await readFile(resolve(SERVICES_DIR, 'Caddyfile')).then(String).then(caddyfile => caddyfile.replace(`# proxy to microservices`, marker => `${marker}
    ${ruleName} {
         header_regexp Authorization ^Basic\\s[a-zA-Z0-9]+={0,2}$
         path_regexp ^${path.replace('{company_number}', '[A-Z\\d]{4,8}').replace(/\{(.*?)}/g, '.+').replace(/\//g, '\\/')}$
    }
    reverse_proxy ${ruleName} ${kebabCase(tag)}:3000 {
        header_down Service companies-${kebabCase(tag)}
    }
`))
    await writeFile(resolve(SERVICES_DIR, 'Caddyfile'), caddyfile)
}

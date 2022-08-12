import {writeFile} from "node:fs/promises";
import {resolve} from "path";
import {kebabCase} from "../utils.js";

/**
 * Generate the package.json and tsconfig.json files for a service
 */
export async function genWebServicePackageJson(SERVICES_DIR, tag){
    const packageJson = {
        "name": kebabCase(tag.name+'-service'),
        "description": tag.description,
        "type": "module",
        main: "index.js",
        "scripts": {
            "start": "node index | pino-pretty -c -t",
            "build": "tsc -b",
            "watch": "tsc -b -w",
            "clean": "tsc -b --clean"
        },
        "version": "1.0.0",
        "dependencies": {
            "@fastify/mongodb": "^6.0.1",
            "@fastify/redis": "^6.0.0",
            "fastify": "4.4.0",
            "pino": "^8.4.1"
        },
        "devDependencies": {
            "@types/node": "^18.7.2",
            "json-schema-to-ts": "^2.5.5",
            "pino-pretty": "^9.0.0",
            "typescript": "^4.7.4"
        }
    }
    await writeFile(resolve(SERVICES_DIR, tag.name,'webService', 'package.json'), JSON.stringify(packageJson, null, 2)+'\n')
    const tsconfig = {
        "compilerOptions": {
            "module": "ES2022",
            "target": "ES2021",
            "sourceMap": true,
            "moduleResolution": "node",
            "strictNullChecks": true,
            "composite": true
        },
        "exclude": [
            "node_modules"
        ],
        "include": ["**/*.ts"]
    }
    await writeFile(resolve(SERVICES_DIR, tag.name, 'webService','tsconfig.json'), JSON.stringify(tsconfig, null, 2)+'\n')
}

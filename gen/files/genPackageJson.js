import {writeFile} from "node:fs/promises";
import {resolve} from "path";
import {kebabCase} from "../utils.js";

/**
 * Generate the package.json and tsconfig.json files for a service
 */
export async function genPackageJson(SERVICES_DIR, tag){
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
            "fastify": "4.2.0",
            "pino": "^8.1.0",
        },
        "devDependencies": {
            "@types/node": "^17.0.34",
            "json-schema-to-ts": "^2.4.0",
            "pino-pretty": "^7.6.1",
            "typescript": "^4.6.4"
        }
    }
    await writeFile(resolve(SERVICES_DIR, tag.name, 'package.json'), JSON.stringify(packageJson, null, 2)+'\n')
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
    await writeFile(resolve(SERVICES_DIR, tag.name, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2)+'\n')
}

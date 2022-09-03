/*
Generates a directory to keep the database up-to-date by listening on streams and/or polling the official API.
 */

import {mkdir, writeFile} from "node:fs/promises";
import {resolve} from "path";
import {prettyTs} from "../utils.js";

export async function genUpdater(SERVICES_DIR, tag){

    //generate .dockerignore, Dockerfile, index.ts, package.json and tsconfig.json
    await mkdir(resolve(SERVICES_DIR, tag, 'streamUpdater'), {recursive: true})
    await genUpdaterPackage(SERVICES_DIR, tag)
    await genUpdaterDockerfile(SERVICES_DIR, tag)
    await genUpdaterIndex(SERVICES_DIR, tag)
}
// generates package.json and tsconfig.json
async function genUpdaterPackage(SERVICES_DIR, tag){

    const packageJson = {
        "name": "stream-updater",
        "version": "1.0.0",
        "author": "Brian Evans",
        "type": "module",
        "main": "index.js",
        "scripts": {
            "build": "tsc --build",
            "watch": "tsc --build --watch",
            "start": "node index.js"
        },
        "dependencies": {
            "camelcase": "^7.0.0",
            "event-iterator": "^2.0.0",
            "genson-js": "^0.0.8",
            "json-schema-to-ts": "^2.5.5",
            "mongodb": "^4.7.0",
            "split2": "^4.1.0",
            "ws": "^8.8.0"
        },
        "devDependencies": {
            "@types/node": "^18.0.0",
            "@types/ws": "^8.5.3",
            "typescript": "^4.7.4"
        }
    }


    const tsconfig = {
        "compilerOptions": {
            "module": "ES2022",
            "target": "ES2021",
            "sourceMap": true,
            "moduleResolution": "node",
            "strictNullChecks": true
        },
        "exclude": [
            "node_modules"
        ],
        "include": [
            "**/*.ts"
        ],
        "references": [
            {
                "path": "../shared"
            }
        ]
    }


    await writeFile(resolve(SERVICES_DIR, tag, 'streamUpdater', 'package.json'), JSON.stringify(packageJson, null, 2)+'\n')
    await writeFile(resolve(SERVICES_DIR, tag, 'streamUpdater', 'tsconfig.json'), JSON.stringify(tsconfig, null, 2)+'\n')
}

async function genUpdaterDockerfile(SERVICES_DIR, tag){
    const content = `FROM node:18

RUN corepack enable && corepack prepare pnpm@7.9.5 --activate && pnpm config set store-dir /home/node/.pnpm-store
WORKDIR /${tag}
COPY pnpm-*.yaml ./
RUN pnpm fetch

COPY shared shared
COPY streamUpdater streamUpdater
RUN pnpm install --offline --frozen-lockfile --reporter=append-only


WORKDIR /${tag}/streamUpdater
RUN pnpm run build
CMD ["node", "index.js"]

`
    await writeFile(resolve(SERVICES_DIR, tag, 'Updater.Dockerfile'), content)
    // await writeFile(resolve(SERVICES_DIR, tag, '.dockerignore'), `node_modules\n`)
}

async function genUpdaterIndex(SERVICES_DIR, tag){
    const content = `
    console.log("I am the updater")
    console.log("Listen on streams for updates and keep the database up-to-date")
    
process.on('SIGINT', shutdown) // quit on ctrl-c when running docker in terminal
process.on('SIGTERM', shutdown)// quit properly on docker stop
async function shutdown(sig: string){
  console.info('Graceful shutdown commenced', new Date().toISOString(), sig);
    // perform any cleanup, eg close db connections, abort HTTP requests.
  process.exit(0)
}

`
    await writeFile(resolve(SERVICES_DIR, tag, 'streamUpdater','index.ts'), prettyTs(content))
}


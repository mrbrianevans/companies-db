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
        },
        "devDependencies": {
            "@types/node": "^18.0.0",
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
        ]
    }


    await writeFile(resolve(SERVICES_DIR, tag, 'streamUpdater', 'package.json'), JSON.stringify(packageJson, null, 2)+'\n')
    await writeFile(resolve(SERVICES_DIR, tag, 'streamUpdater', 'tsconfig.json'), JSON.stringify(tsconfig, null, 2)+'\n')
}

async function genUpdaterDockerfile(SERVICES_DIR, tag){
    const content = `FROM node:18

RUN corepack enable && corepack prepare pnpm@7.4.0 --activate

WORKDIR streamUpdater

COPY package.json .

RUN pnpm install

COPY . .

RUN pnpm run build

CMD ["pnpm", "run", "start"]

`
    await writeFile(resolve(SERVICES_DIR, tag, 'streamUpdater','Dockerfile'), content)
    await writeFile(resolve(SERVICES_DIR, tag, 'streamUpdater','.dockerignore'), `node_modules\n`)
}

async function genUpdaterIndex(SERVICES_DIR, tag){
    const content = `
    console.log("I am the updater")
    console.log("Listen on streams for updates and keep the database up-to-date")
`
    await writeFile(resolve(SERVICES_DIR, tag, 'streamUpdater','index.ts'), prettyTs(content))
}


import {mkdir, writeFile} from "node:fs/promises";
import {resolve} from "path";


export async function genDatabases(SERVICES_DIR, tag){
    // generate Dockerfiles for mongo and redis databases

    await mkdir(resolve(SERVICES_DIR, tag, 'databases', 'mongo'), {recursive: true})
    await mkdir(resolve(SERVICES_DIR, tag, 'databases', 'redis'), {recursive: true})

    const mongoDockerfile = `FROM mongo:5

CMD ["--quiet", "--wiredTigerCacheSizeGB", "0.5"]
`
    await writeFile(resolve(SERVICES_DIR, tag, 'databases', 'mongo', 'Dockerfile'), mongoDockerfile)
    await writeFile(resolve(SERVICES_DIR, tag, 'databases', 'redis', 'Dockerfile'), 'FROM redis\n')
}

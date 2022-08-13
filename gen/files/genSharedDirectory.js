import cons  from 'consolidate'
import {mkdir, readdir, readFile, writeFile} from 'node:fs/promises'
import {resolve} from "path";

export async function genSharedDirectory(SERVICES_DIR, tag){
    const templateDirectory = 'files/sharedDirectoryTemplates'
    const files = await readdir(templateDirectory)
    const outputDir = resolve(SERVICES_DIR, tag.name, 'shared')
    await mkdir(outputDir, {recursive: true})
    for(const file of files){
        const output = await cons.ejs(resolve(templateDirectory, file), {tag})
        await writeFile(resolve(outputDir, file), output)
    }
}

import {mkdir, readdir, writeFile} from "node:fs/promises";
import {resolve} from "path";
import cons from "consolidate";

export async function genTagDirectory(SERVICES_DIR, tag){
    const templateDirectory = import.meta.resolve?.call('templates') ?? resolve( 'files', 'tagDirectory','templates')
    const files = await readdir(templateDirectory)
    const outputDir = resolve(SERVICES_DIR, tag.name)
    await mkdir(outputDir, {recursive: true})
    for(const file of files){
        const output = await cons.ejs(resolve(templateDirectory, file), {tag})
        await writeFile(resolve(outputDir, file), output)
    }
}

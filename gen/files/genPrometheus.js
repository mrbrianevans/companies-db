import {writeFile} from "node:fs/promises";
import {resolve} from "path";
import YAML from 'yaml'

export async function genPrometheusConfig(SERVICES_DIR){
    await writeFile(resolve(SERVICES_DIR, 'prometheus.yaml'),YAML.stringify({
        global: {
            scrape_interval: '15s'
        },
        scrape_configs: [
            {
                job_name: 'caddy',
                static_configs: [
                    {targets: ['gateway:2022']}
                ]
            }
        ]
    }))
}

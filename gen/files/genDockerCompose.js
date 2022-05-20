import YAML from 'yaml'
import {writeFile} from "node:fs/promises";
import {resolve} from "path";
import {kebabCase} from "../utils.js";
export async function genDockerCompose(SERVICES_DIR, tags) {
    await writeFile(resolve(SERVICES_DIR, 'docker-compose.yaml'), YAML.stringify({
        version: '3',
        services: Object.fromEntries(tags.map((tag) => [kebabCase(tag.name), {
            build: tag.name,
            networks: ['microservices'],
            env_file: ['.env'], logging: {driver: 'local'}
        }]).concat([['gateway', {
            image: 'caddy',
            volumes: ['./Caddyfile:/etc/caddy/Caddyfile'],
            ports: ['3000:80'], networks: ['microservices', 'metrics'], logging:{driver: 'local'}
        }], ['auth-db', {image: 'redis', networks: ['auth'], logging:{driver: 'local'}}],
            ['auth-service', {build: 'auth', networks: ['auth', 'microservices'], logging:{driver: 'local'}}],
            ['metrics', {image: 'prom/prometheus', logging:{driver: 'local'},
                volumes: ['./prometheus.yaml:/etc/prometheus/prometheus.yml'],
                ports: ['9090:9090'], networks: ['metrics']
            }]
        ])),
        networks: {microservices: {driver: 'bridge'}, auth: {driver: 'bridge'}, metrics: {driver: 'bridge'}}
    }, {defaultStringType: 'QUOTE_DOUBLE'}))
}

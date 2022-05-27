import YAML from 'yaml'
import {writeFile} from "node:fs/promises";
import {resolve} from "path";
import {kebabCase} from "../utils.js";
export async function genDockerCompose(SERVICES_DIR, tags) {
    await writeFile(resolve(SERVICES_DIR, 'docker-compose.yaml'), YAML.stringify({
        version: '3.7',
        services: Object.fromEntries(tags.map((tag) => [kebabCase(tag.name), {
            build: tag.name,
            networks: ['microservices'],
            env_file: ['.env'], logging: {driver: 'local'}
        }]).concat([['gateway', {
            image: 'caddy',
            volumes: ['./Caddyfile:/etc/caddy/Caddyfile'],
            ports: ['3000:80'], networks: ['microservices', 'metrics'], logging:{driver: 'local'}
        }], ['auth-db', {image: 'redis', networks: ['auth'], logging:{driver: 'local'}, volumes: ['auth_db:/data']}],
            ['auth-service', {build: 'auth', networks: ['auth', 'microservices'], logging:{driver: 'local'}, environment: {AUTH_DB_URL: 'auth-db'}}],
            ['metrics', {image: 'prom/prometheus', logging:{driver: 'local'},
                volumes: ['./prometheus.yaml:/etc/prometheus/prometheus.yml'],
                ports: ['9090:9090'], networks: ['metrics']
            }],
            ['shared-mongo', {
                image: 'mongo', logging:{driver: 'local'},networks: ['microservices'], volumes: ['shared_mongo:/data/db']
            }],
            ['shared-redis', {
                image: 'redis', logging:{driver: 'local'},networks: ['microservices'], volumes: ['/data']
            }]
        ])),
        networks: {microservices: {driver: 'bridge'}, auth: {driver: 'bridge'}, metrics: {driver: 'bridge'}},
        volumes: {shared_mongo:{external: true},auth_db:{external: true}}
    }, {defaultStringType: 'QUOTE_DOUBLE'}))
}

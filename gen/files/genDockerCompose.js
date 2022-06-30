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


export async function genDockerfile(SERVICES_DIR, tag){
    await writeFile(resolve(SERVICES_DIR, tag.name, 'Dockerfile'), `FROM node:18

RUN corepack enable && corepack prepare pnpm@7.4.0 --activate
WORKDIR /service
COPY package*.json ./
RUN pnpm install
COPY tsconfig.json index.ts ./
COPY controllers controllers/
COPY service service/
COPY schemas schemas/
RUN pnpm run clean
RUN pnpm run build
EXPOSE 3000
CMD ["pnpm", "run", "start"]
`)
}
/** docker compose file for each service */
export async function genServiceDockerComposeFile(SERVICES_DIR, tag){
    const content = {
        "version": "3.9",
        "services": {
            "db": {
                build: "databases/mongo",
                "volumes": [
                    "data:/data/db"
                ],
                logging: {driver: 'local'}
            },
            "cache": {
                build: "databases/redis",
                "volumes": [
                    "redisdata:/data"
                ],
                logging: {driver: 'local'}
            },
            "loader": {
                "build": "loadBulk",
                "volumes": [
                    "downloads:/loadBulk/downloads"
                ],
                "environment": {
                    "MONGO_URL": "mongodb://db"
                }
            },
            updater: {
                build: "streamUpdater",
                "environment": {
                    "MONGO_URL": "mongodb://db:27017",
                    "REDIS_URL": "redis://cache:6379"
                },
                "env_file": [
                    "../.api.env"
                ]
            },
            "web-service": {
                "build": ".",
                "environment": {
                    "MONGO_URL": "mongodb://db:27017",
                    "REDIS_URL": "redis://cache:6379"
                },
                "env_file": [
                    "../.api.env"
                ],
                "ports": [
                    "3000:3000"
                ]
            }
        },
        "volumes": {
            "data": null,
            "downloads": null,
            "redisdata": null
        }
    }
    await writeFile(resolve(SERVICES_DIR, tag.name, 'docker-compose.yaml'), YAML.stringify(content, {defaultStringType: 'QUOTE_DOUBLE'}))
}

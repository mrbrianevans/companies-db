import YAML from 'yaml'
import {writeFile} from "node:fs/promises";
import {resolve} from "path";
import {kebabCase} from "../utils.js";
export async function genDockerCompose(SERVICES_DIR, tags) {
    await writeFile(resolve(SERVICES_DIR, 'docker-compose.yaml'), YAML.stringify({
        version: '3.7',
        services: Object.fromEntries(tags.map((tag) => [kebabCase(tag.name), {
            build: tag.name+'/webService',
            networks: ['companiesv2_microservices'],
            env_file: ['.env'], logging: {driver: 'local'}
        }]).concat([['gateway', {
            image: 'caddy',
            volumes: ['./Caddyfile:/etc/caddy/Caddyfile'],
            ports: ['3000:80'], networks: ['companiesv2_microservices', 'companiesv2_metrics'], logging:{driver: 'local'}
        }], ['auth-db', {image: 'redis', networks: ['companiesv2_auth'], logging:{driver: 'local'}, volumes: ['auth_db:/data']}],
            ['auth-service', {build: 'auth', networks: ['companiesv2_auth', 'companiesv2_microservices'], logging:{driver: 'local'}, environment: {AUTH_DB_URL: 'auth-db'}}],
            ['metrics', {image: 'prom/prometheus', logging:{driver: 'local'},
                volumes: ['./prometheus.yaml:/etc/prometheus/prometheus.yml'],
                ports: ['9090:9090'], networks: ['companiesv2_metrics']
            }],
            ['shared-mongo', {
                image: 'mongo', logging:{driver: 'local'},networks: ['companiesv2_microservices'], volumes: ['shared_mongo:/data/db']
            }],
            ['shared-redis', {
                image: 'redis', logging:{driver: 'local'},networks: ['companiesv2_microservices'], volumes: ['/data']
            }]
        ])),
        networks: {companiesv2_microservices: {external: true}, companiesv2_auth: {external: true}, companiesv2_metrics: {external: true}},
        volumes: {shared_mongo:{external: true},auth_db:{external: true}}
    }, {defaultStringType: 'QUOTE_DOUBLE'}))
}


export async function genWebServiceDockerfile(SERVICES_DIR, tag){
    await writeFile(resolve(SERVICES_DIR, tag.name,'webService', 'Dockerfile'), `FROM node:18

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
    await writeFile(resolve(SERVICES_DIR, tag.name,'webService','.dockerignore'), `node_modules\n`)
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
                "build": "webService",
                "environment": {
                    "MONGO_URL": "mongodb://db:27017",
                    "REDIS_URL": "redis://cache:6379",
                    "AUTH_URL": "http://auth-service:3000"
                },
                "env_file": [
                    "../.api.env"
                ],
                "ports": [
                    "3000:3000"
                ],
                networks: [
                    'companiesv2_microservices'
                ]
            }
        },
        networks: {companiesv2_microservices: {external: true}, companiesv2_auth: {external: true}, companiesv2_metrics: {external: true}},
        "volumes": {
            "data": null,
            "downloads": null,
            "redisdata": null
        }
    }
    await writeFile(resolve(SERVICES_DIR, tag.name, 'docker-compose.yaml'), YAML.stringify(content, {defaultStringType: 'QUOTE_DOUBLE'}))
}

import YAML from 'yaml'
import {writeFile} from "node:fs/promises";
import {resolve} from "path";
import {kebabCase} from "../utils.js";

export async function genDockerCompose(SERVICES_DIR) {
    await writeFile(resolve(SERVICES_DIR, 'docker-compose.yaml'), YAML.stringify({
        version: '3.7',
        services: {
            gateway: {
                image: 'caddy',
                volumes: [ './Caddyfile:/etc/caddy/Caddyfile' ],
                ports: [ '3000:80' ],
                networks: [ 'companiesv2_microservices', 'companiesv2_metrics' ],
                logging: { driver: 'local' }
            },
            'auth-db': {
                image: 'redis',
                networks: [ 'companiesv2_auth' ],
                logging: { driver: 'local' },
                volumes: [ 'auth_db:/data' ]
            },
            'auth-service': {
                hostname: 'auth-service',
                build: 'auth',
                networks: [ 'companiesv2_auth', 'companiesv2_microservices', 'companiesv2_metrics' ],
                logging: { driver: 'local' },
                environment: { AUTH_DB_URL: 'auth-db', LOKI_URL: 'http://loki:3100' }
            },
            metrics: {
                build: 'monitoring/prometheus',
                logging: { driver: 'local' },
                ports: [ '9090:9090' ],
                networks: [ 'companiesv2_metrics' ],
                environment: {
                    CADDY_METRICS_URL: 'http://gateway:2022'
                }
            },
            // 'shared-mongo': {
            //     image: 'mongo',
            //     logging: { driver: 'local' },
            //     networks: [ 'companiesv2_microservices' ],
            //     volumes: [ 'shared_mongo:/data/db' ]
            // },
            // 'shared-redis': {
            //     image: 'redis',
            //     logging: { driver: 'local' },
            //     networks: [ 'companiesv2_microservices' ],
            //     volumes: [ '/data' ]
            // },
            loki: {
                build: 'monitoring/loki',
                logging: { driver: 'local' },
                networks: [ 'companiesv2_metrics' ]
            },
            grafana: {
                build: 'monitoring/grafana',
                ports: ["9091:3000"],
                logging: { driver: 'local' },
                networks: [ 'companiesv2_metrics' ],
                volumes: ['grafana_data:/var/lib/grafana', '/var/log/grafana', './monitoring/grafana/dashboards:/etc/grafana/dashboards'],
                environment: {
                    LOKI_URL: 'http://loki:3100',
                    METRICS_URL: 'http://metrics:9090'
                }
            }
        },
        networks: {
            companiesv2_microservices: {external: true},
            companiesv2_auth: {external: true},
            companiesv2_metrics: {external: true}
        },
        volumes: {shared_mongo: {external: true}, auth_db: {external: true},
            grafana_data: null,
            loki_data: null}
    }, {defaultStringType: 'QUOTE_DOUBLE'}))
}


export async function genWebServiceDockerfile(SERVICES_DIR, tag) {
    await writeFile(resolve(SERVICES_DIR, tag.name,  'WebService.Dockerfile'), `FROM node:18

RUN corepack enable && corepack prepare pnpm@7.9.4 --activate
WORKDIR /webService
COPY webService/package.json /webService/
COPY shared/package.json /shared/
RUN cd /webService && pnpm install && cd /shared && pnpm install
COPY webService /webService
COPY shared /shared
RUN pnpm run clean
RUN pnpm run build
EXPOSE 3000
CMD ["pnpm", "run", "start"]
`)
    // await writeFile(resolve(SERVICES_DIR, tag.name, 'webService', '.dockerignore'), `node_modules\n`)
}

/** docker compose file for each service */
export async function genServiceDockerComposeFile(SERVICES_DIR, tag) {
    const content = {
        "version": "3.9",
        "services": {
            "db": {
                build: "databases/mongo", "volumes": ["data:/data/db"], logging: {driver: 'local'}, networks: [tag.name]
            },
            "red": {
                build: "databases/redis",
                "volumes": ["redisdata:/data"],
                logging: {driver: 'local'},
                networks: [tag.name]
            },
            "loader": {
                "build": {dockerfile:"Loader.Dockerfile"}, depends_on: ['db'], "volumes": ["downloads:/loadBulk/downloads"], "environment": {
                    "MONGO_URL": "mongodb://db", "REDIS_URL": "redis://red:6379",
                    "LOKI_URL": "http://loki:3100"
                }, networks: [tag.name, 'companiesv2_metrics']
            },
            updater: {
                build: {dockerfile:"Updater.Dockerfile"}, depends_on: ['db', 'red'], "environment": {
                    "MONGO_URL": "mongodb://db:27017", "REDIS_URL": "redis://red:6379",
                    "LOKI_URL": "http://loki:3100"
                }, "env_file": ["../.api.env"], networks: [tag.name, 'companiesv2_metrics']
            },
            "web-service": {
                hostname: kebabCase(tag.name) + "-web-service",
                "build": {dockerfile:"WebService.Dockerfile"},
                depends_on: ['db', 'red'],
                "environment": {
                    "MONGO_URL": "mongodb://db:27017",
                    "REDIS_URL": "redis://red:6379",
                    "AUTH_URL": "http://auth-service:3000",
                    "LOKI_URL": "http://loki:3100"
                },
                "env_file": ["../.api.env"],
                networks: ['companiesv2_microservices', tag.name, 'companiesv2_metrics']
            }
        },
        networks: {
            companiesv2_microservices: {external: true},
            companiesv2_auth: {external: true},
            companiesv2_metrics: {external: true},
            [tag.name]: null
        },
        "volumes": {
            "data": null, "downloads": null, "redisdata": null
        }
    }
    await writeFile(resolve(SERVICES_DIR, tag.name, 'docker-compose.yaml'), YAML.stringify(content, {defaultStringType: 'QUOTE_DOUBLE'}))
}

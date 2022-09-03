FROM node:18

RUN corepack enable && corepack prepare pnpm@7.9.5 --activate && pnpm config set store-dir /home/node/.pnpm-store
WORKDIR /UKEstablishments
COPY pnpm-*.yaml ./
RUN pnpm fetch

COPY shared shared
COPY streamUpdater streamUpdater
RUN pnpm install --offline --frozen-lockfile --reporter=append-only


WORKDIR /UKEstablishments/streamUpdater
RUN pnpm run build
CMD ["node", "index.js"]


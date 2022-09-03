FROM node:18

RUN corepack enable && corepack prepare pnpm@7.9.5 --activate && pnpm config set store-dir /home/node/.pnpm-store
WORKDIR /officers
COPY pnpm-*.yaml ./
RUN pnpm fetch

COPY shared shared
COPY loadBulk loadBulk
RUN pnpm install --offline --frozen-lockfile --reporter=append-only


WORKDIR /officers/loadBulk
RUN pnpm run build
CMD ["pnpm", "run", "start"]


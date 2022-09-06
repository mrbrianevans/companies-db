FROM node:18

RUN corepack enable && corepack prepare pnpm@7.11.0 --activate && pnpm config set store-dir /home/node/.pnpm-store
WORKDIR /officers
COPY pnpm-*.yaml ./
RUN pnpm fetch

COPY shared shared
COPY repl repl
RUN pnpm install --offline --frozen-lockfile --reporter=append-only


WORKDIR /officers/repl
RUN pnpm run build
CMD ["node", "index.js"]


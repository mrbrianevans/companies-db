FROM node:18

RUN corepack enable && corepack prepare pnpm@7.9.5 --activate && pnpm config set store-dir /home/node/.pnpm-store
WORKDIR /filingHistory
COPY pnpm-*.yaml ./
RUN pnpm fetch

COPY shared shared
COPY webService webService
RUN pnpm install --offline --frozen-lockfile --reporter=append-only


WORKDIR /filingHistory/webService
RUN pnpm run build

EXPOSE 3000
CMD ["node", "index.js"]

FROM node:18

RUN corepack enable && corepack prepare pnpm@7.9.5 --activate && pnpm config set store-dir /home/node/.pnpm-store
WORKDIR /companyProfile
COPY pnpm-*.yaml ./
RUN pnpm fetch

COPY shared shared
COPY webService webService
RUN pnpm install --offline --frozen-lockfile --reporter=append-only


WORKDIR /companyProfile/webService
RUN pnpm run build

EXPOSE 3000
CMD ["node", "index.js"]

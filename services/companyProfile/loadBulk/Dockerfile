FROM node:18

RUN corepack enable && corepack prepare pnpm@7.4.0 --activate

WORKDIR loadBulk

COPY package.json .

RUN pnpm i

COPY . .

RUN pnpm run build

CMD ["pnpm", "run", "start"]

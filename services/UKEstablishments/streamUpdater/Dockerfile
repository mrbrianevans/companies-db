FROM node:18

RUN corepack enable && corepack prepare pnpm@7.4.0 --activate

WORKDIR streamUpdater

COPY package.json .

RUN pnpm install

COPY . .

RUN pnpm run build

CMD ["pnpm", "run", "start"]


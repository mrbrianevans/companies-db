FROM node:19
RUN corepack enable && corepack prepare pnpm@7.16.1 --activate
WORKDIR /client
COPY package.json ./

RUN pnpm install

COPY . .

CMD ["pnpm", "run", "build"]

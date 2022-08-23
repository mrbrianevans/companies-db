FROM node:18

RUN corepack enable && corepack prepare pnpm@7.9.4 --activate
WORKDIR /service
COPY package.json ./
RUN pnpm install
COPY . .
RUN pnpm run build
EXPOSE 3000
CMD ["pnpm", "run", "start"]

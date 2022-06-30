FROM node:18

RUN corepack enable && corepack prepare pnpm@7.4.0 --activate
WORKDIR /service
COPY package*.json ./
RUN pnpm install
COPY tsconfig.json index.ts ./
COPY controllers controllers/
COPY service service/
COPY schemas schemas/
RUN pnpm run clean
RUN pnpm run build
EXPOSE 3000
CMD ["pnpm", "run", "start"]

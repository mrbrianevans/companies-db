FROM node:18

RUN corepack enable && corepack prepare pnpm@7.9.4 --activate
WORKDIR /streamUpdater
COPY streamUpdater/package.json /streamUpdater/
COPY shared/package.json /shared/
RUN cd /streamUpdater && pnpm install && cd /shared && pnpm install
COPY shared /shared
COPY streamUpdater /streamUpdater
RUN pnpm run build

CMD ["pnpm", "run", "start"]


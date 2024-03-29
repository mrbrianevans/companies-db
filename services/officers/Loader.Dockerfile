FROM node:18

RUN corepack enable && corepack prepare pnpm@7.11.0 --activate && pnpm config set store-dir /home/node/.pnpm-store
WORKDIR /officers
COPY pnpm-*.yaml ./
RUN pnpm fetch

COPY shared shared
COPY loadBulk loadBulk
RUN pnpm install --offline --frozen-lockfile --reporter=append-only


WORKDIR /officers/loadBulk
RUN pnpm run build
CMD ["pnpm", "run", "start"]

# todo: the loader should be a Worker in BullMQ that can be triggered
#  - wrap the load function in a worker
#  - write a script to send a message on a BullMQ queue, eg trigger.js queue-name job-name (or a REPL)

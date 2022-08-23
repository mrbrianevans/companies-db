FROM node:18

RUN corepack enable && corepack prepare pnpm@7.9.4 --activate
WORKDIR /webService
COPY webService/package.json /webService/
COPY shared/package.json /shared/
RUN cd /webService && pnpm install && cd /shared && pnpm install
COPY webService /webService
COPY shared /shared
RUN pnpm run clean
RUN pnpm run build
EXPOSE 3000
CMD ["pnpm", "run", "start"]

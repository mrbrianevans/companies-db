FROM node:18

# tried with PNPM but causes too many issues

COPY loadBulk/package.json /loadBulk/
COPY shared/package.json /shared/

RUN cd loadBulk && npm install && cd ../shared && npm install

COPY shared /shared
COPY loadBulk /loadBulk

WORKDIR /loadBulk

RUN npm run build

CMD ["npm", "run", "start"]



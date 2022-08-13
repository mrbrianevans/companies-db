FROM node:18

# tried with PNPM but causes too many issues

COPY streamUpdater/package.json /streamUpdater/
COPY shared/package.json /shared/

RUN cd streamUpdater && npm install && cd ../shared && npm install

COPY shared /shared
COPY streamUpdater /streamUpdater

WORKDIR /streamUpdater

RUN npm run build

CMD ["npm", "run", "start"]


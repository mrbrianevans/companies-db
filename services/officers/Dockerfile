FROM node:18

WORKDIR /service
COPY package*.json ./
RUN npm i
COPY tsconfig.json index.ts ./
COPY controllers controllers/
COPY service service/
COPY schemas schemas/
RUN npm exec tsc -- -b --clean
RUN ls && ls schemas && npm run build
CMD ["npm", "run", "start"]

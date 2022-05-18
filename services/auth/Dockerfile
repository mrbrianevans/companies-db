FROM node:18

WORKDIR /service
COPY package*.json ./
RUN npm i
COPY tsconfig.json index.ts ./
COPY controllers controllers/
COPY service service/
COPY schemas schemas/
RUN npm exec tsc -- -b --clean
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]

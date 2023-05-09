FROM node:18-alpine

RUN mkdir /home/app

WORKDIR /home/app

COPY package*.json ./
COPY .env.example app/.env

COPY app app
COPY api api

RUN npm install

RUN cd app && npm run build && rm -rf node_modules

ENV NODE_ENV=production

CMD ["npm", "run", "prod"]
FROM node:14.17.3-alpine

RUN mkdir /app
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . ./

CMD [ "npm", "start" ]
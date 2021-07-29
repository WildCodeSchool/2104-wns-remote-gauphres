FROM node:alpine

RUN mkdir /app
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . ./

CMD [ "npm", "start" ]
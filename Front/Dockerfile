FROM node:alpine

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN npm ci

COPY . ./

CMD [ "npm", "run", "start" ]
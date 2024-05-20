FROM node:20.13.1-alpine3.18

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN npm install --frozen-lockfile

COPY . .

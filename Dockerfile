# !/bin/bash
# STAGE 1

FROM node:12-alpine AS build
WORKDIR /app
COPY package.json ./
RUN yarn config set registry https://registry.npm.taobao.org/
RUN yarn  install
COPY . /app
RUN yarn build

# STAGE 2

FROM node:12-alpine
WORKDIR /app
RUN npm install -g webserver.local
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD webserver.local -d ./dist

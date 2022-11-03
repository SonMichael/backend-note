FROM node:12.5.0-alpine as installer
COPY package.json package-lock.json /app/
WORKDIR /app
RUN npm i

FROM node:12.5.0-alpine as builder
COPY ./ /app
COPY --from=installer /app/node_modules /app/node_modules
WORKDIR /app
RUN npm run build

FROM node:12.5.0-alpine
COPY . /app
COPY --from=installer /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist
WORKDIR /app
RUN mkdir /uploads
RUN chmod 755 /uploads
RUN npm i -g sequelize-cli typescript ts-node ts-node-dev

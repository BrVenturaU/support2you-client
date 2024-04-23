FROM node:20.12.2-alpine as build
WORKDIR /client
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM httpd:2.4.59-alpine AS runtime
WORKDIR /app
COPY --from=build /client/dist /usr/local/apache2/htdocs/
FROM node:21 AS build

WORKDIR /app

COPY lumia/package*.json ./

RUN npm install --legacy-peer-deps

COPY lumia/ .

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
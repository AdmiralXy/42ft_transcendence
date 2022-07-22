FROM node:16-alpine

RUN npm i --location=global nuxt@2.15.8

EXPOSE 3000

WORKDIR /var/www/frontend

USER node

CMD ["sh", "-c", "npm install && npm run dev"]
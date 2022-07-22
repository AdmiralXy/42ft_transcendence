FROM node:18-alpine

RUN npm i --location=global @nestjs/cli@8.2.6

WORKDIR /var/www/backend

USER node

CMD ["sh", "-c", "npm install && npm run start:dev"]
FROM node:16-alpine

RUN npm i --location=global create-nuxt-app@4.0.0
RUN npm i --location=global nuxt@2.15.8

EXPOSE 3000

WORKDIR /var/www/frontend

USER node

#CMD tail -f /dev/null
CMD ["sh", "-c", "npm install && npm run dev"]
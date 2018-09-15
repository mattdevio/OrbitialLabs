FROM node:latest

MAINTAINER Matt Greenberg

ENV NODE_ENV=development
ENV PORT=3000

COPY . /var/www
WORKDIR /var/www

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
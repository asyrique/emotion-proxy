FROM node:0.12.7
MAINTAINER asyrique@gmail.com

WORKDIR /srv
ADD ./httproxy.js /srv/httproxy.js
ADD ./package.json /srv/package.json

RUN npm install

EXPOSE 5000
WORKDIR /srv
CMD ["node", "httproxy.js"]

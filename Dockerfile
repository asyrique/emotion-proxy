FROM node:0.12.7
MAINTAINER asyrique@gmail.com

WORKDIR /srv
ADD ./package.json /srv/package.json
RUN npm install
ADD ./httproxy.js /srv/httproxy.js

EXPOSE 5000
CMD ["node", "httproxy.js"]

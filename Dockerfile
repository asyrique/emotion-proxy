FROM node:4.2.1
MAINTAINER asyrique@gmail.com

WORKDIR /srv
ADD ./package.json /srv/package.json
RUN npm install
ADD ./httproxy.js /srv/httproxy.js

CMD ["node", "httproxy.js"]

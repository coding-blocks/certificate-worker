FROM node:12.16.3-alpine

# Add support for https on wget
RUN apk update && apk add --no-cache wget && apk --no-cache add openssl wget && apk add ca-certificates && update-ca-certificates

# Install Chromium
RUN apk add --no-cache chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROMIUM_PATH /usr/bin/chromium-browser

# Install server deps
RUN apk add nginx
RUN yarn global add pm2

WORKDIR /usr/src/certificate-worker

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --pure-lockfile

RUN apk add bash
COPY start.sh /bin/start.sh
COPY wait-for-it.sh /bin/wait-for-it.sh
COPY nginx.conf /etc/nginx/conf.d/certificate.conf
RUN mkdir -p /run/nginx
COPY src ./src
COPY webpack.config.js ./webpack.config.js
COPY frontend ./frontend

CMD /bin/start.sh

FROM node:8.11.3-alpine

# Add support for https on wget
RUN apk update && apk add --no-cache wget && apk --no-cache add openssl wget && apk add ca-certificates && update-ca-certificates

# Add phantomjs
RUN wget -qO- "https://github.com/dustinblackman/phantomized/releases/download/2.1.1a/dockerized-phantomjs.tar.gz" | tar xz -C / \
    && npm config set user 0 \
    && npm install -g phantomjs-prebuilt
    
# Add fonts required by phantomjs to render html correctly
RUN apk add --update ttf-dejavu ttf-droid ttf-freefont ttf-liberation ttf-ubuntu-font-family && rm -rf /var/cache/apk/*

# Avoids npm install phase on every docker build
COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/src/certificate-worker && cp -a /tmp/node_modules /usr/src/certificate-worker/

WORKDIR /usr/src/certificate-worker

COPY package.json ./
COPY yarn.lock ./
COPY src ./src

RUN yarn install --pure-lockfile

CMD ["yarn",  "start"]


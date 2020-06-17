FROM node:12.16.3-alpine

# Add support for https on wget
RUN apk update && apk add --no-cache wget && apk --no-cache add openssl wget && apk add ca-certificates && update-ca-certificates
    
# Add fonts required by phantomjs to render html correctly
RUN apk add --update ttf-dejavu ttf-droid ttf-freefont ttf-liberation ttf-ubuntu-font-family && rm -rf /var/cache/apk/*

# Install Chromium
RUN apk add --no-cache chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROMIUM_PATH /usr/bin/chromium-browser

WORKDIR /usr/src/certificate-worker

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --pure-lockfile

RUN apk add bash
COPY start.sh /bin/start.sh
COPY wait-for-it.sh /bin/wait-for-it.sh
COPY src ./src

CMD /bin/start.sh

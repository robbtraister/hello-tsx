FROM alpine

RUN \
    apk update && \
    apk upgrade && \
    apk add --no-cache \
            nodejs-npm \
            && \
    rm -rf /var/cache/apk/* && \
    npm i -g npm && \
    node -v && \
    npm -v

WORKDIR /opt/server

COPY ./package*.json ./
RUN npm ci

COPY ./ ./

ENTRYPOINT ["npm", "run"]
CMD ["start"]

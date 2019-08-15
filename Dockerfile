FROM alpine as base


FROM base as npm

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


FROM npm as build

COPY . ./
RUN npm ci

RUN NODE_ENV=production npm run build


FROM npm as modules

COPY . ./
RUN npm ci --production


FROM base

RUN \
    apk update && \
    apk upgrade && \
    apk add --no-cache \
            nodejs \
            && \
    rm -rf /var/cache/apk/* && \
    node -v

WORKDIR /opt/server

COPY --from=build /opt/server/build /opt/server/build
COPY --from=build /opt/server/dist /opt/server/dist
COPY --from=modules /opt/server/node_modules /opt/server/node_modules

COPY ./env ./env
COPY ./server ./server

ENTRYPOINT ["node"]
CMD ["server"]

FROM node:21 AS builder

ARG AMBIENTE

ADD . /build

WORKDIR /build

RUN npm install \
    && npm run build --prod --aot=false -c=${AMBIENTE} --base-href=/

FROM nginx:1.25.4-alpine

#RUN echo "America/Recife" > /etc/timezone && dpkg-reconfigure -f noninteractive tzdata

COPY --from=builder /build/dist /usr/share/nginx/html

FROM node:13.11.0-alpine AS builder
WORKDIR /usr/src/project
COPY . .
WORKDIR /usr/src/project/packages/landing
RUN yarn --frozen-lockfile
RUN yarn build
RUN yarn export

FROM httpd:2.4.41-alpine AS runner
COPY --from=builder /usr/src/project/packages/landing/out/ /usr/local/apache2/htdocs/
CMD apachectl -D FOREGROUND

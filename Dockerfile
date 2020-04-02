FROM node:13.11.0-alpine AS builder
WORKDIR /usr/src/project
COPY package.json yarn.lock landing/package.json ./
RUN yarn --frozen-lockfile
COPY . .
WORKDIR /usr/src/project/landing
RUN yarn build
RUN yarn export

FROM pagespeed/nginx-pagespeed:stable-alpine3.8 AS runner
COPY --from=builder /usr/src/project/landing/out /usr/share/nginx/html
COPY --from=builder /usr/src/project/landing/.nginx/entrypoint.sh /usr/src/entrypoint.sh
COPY --from=builder /usr/src/project/landing/.nginx/default.conf.template /etc/nginx/conf.d/default.conf.template
RUN chmod +x /usr/src/entrypoint.sh
CMD /usr/src/entrypoint.sh

FROM node:13.11.0-alpine AS builder
WORKDIR /usr/src/project
COPY . .
RUN yarn --frozen-lockfile --ignore-optional
RUN npx lerna run lib

FROM builder AS admin-builder
WORKDIR /usr/src/project/admin
RUN yarn build

FROM builder AS app-builder
WORKDIR /usr/src/project/app
RUN yarn build

FROM builder AS landing-builder
WORKDIR /usr/src/project/landing
RUN yarn build

FROM pagespeed/nginx-pagespeed:stable-alpine3.8 AS admin-runner
COPY --from=admin-builder /usr/src/project/admin/out /usr/share/nginx/html
COPY --from=admin-builder /usr/src/project/admin/.nginx/entrypoint.sh /usr/src/entrypoint.sh
COPY --from=admin-builder /usr/src/project/admin/.nginx/default.conf.template /etc/nginx/conf.d/default.conf.template
RUN chmod +x /usr/src/entrypoint.sh
CMD /usr/src/entrypoint.sh

FROM pagespeed/nginx-pagespeed:stable-alpine3.8 AS app-runner
COPY --from=app-builder /usr/src/project/app/out /usr/share/nginx/html
COPY --from=app-builder /usr/src/project/app/.nginx/entrypoint.sh /usr/src/entrypoint.sh
COPY --from=app-builder /usr/src/project/app/.nginx/default.conf.template /etc/nginx/conf.d/default.conf.template
RUN chmod +x /usr/src/entrypoint.sh
CMD /usr/src/entrypoint.sh

FROM pagespeed/nginx-pagespeed:stable-alpine3.8 AS landing-runner
COPY --from=landing-builder /usr/src/project/landing/out /usr/share/nginx/html
COPY --from=landing-builder /usr/src/project/landing/.nginx/entrypoint.sh /usr/src/entrypoint.sh
COPY --from=landing-builder /usr/src/project/landing/.nginx/default.conf.template /etc/nginx/conf.d/default.conf.template
RUN chmod +x /usr/src/entrypoint.sh
CMD /usr/src/entrypoint.sh

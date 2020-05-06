FROM node:13.11.0-alpine AS builder
WORKDIR /usr/src/project
COPY . .
RUN yarn --frozen-lockfile --ignore-optional
RUN npx lerna run lib

FROM builder AS workspace-builder
ARG workspace
WORKDIR /usr/src/project/${workspace}
RUN yarn build
RUN npx project-setup-app-server \
  --http-server-name ${workspace} \
  --output-dir nginx

FROM pagespeed/nginx-pagespeed:stable-alpine3.8 AS web-server
ARG workspace
COPY --from=workspace-builder /usr/src/project/${workspace}/out /usr/share/nginx/html
COPY --from=workspace-builder /usr/src/project/${workspace}/nginx/entrypoint.sh /usr/src/entrypoint.sh
COPY --from=workspace-builder /usr/src/project/${workspace}/nginx/default.conf.template /etc/nginx/conf.d/default.conf.template
RUN chmod +x /usr/src/entrypoint.sh
CMD /usr/src/entrypoint.sh

FROM node:13.11.0-alpine AS builder
WORKDIR /usr/src/project
COPY . .
RUN yarn --frozen-lockfile --ignore-optional
RUN npx lerna run lib

FROM builder AS workspace-builder
ARG workspace
WORKDIR /usr/src/project/${workspace}
RUN yarn build

FROM workspace-builder AS workspace-builder-with-nginx
ARG workspace
WORKDIR /usr/src/project/${workspace}
RUN npx project-setup-web-server \
  --http-server-name ${workspace} \
  --output-dir nginx

FROM pagespeed/nginx-pagespeed:stable-alpine3.8 AS nginx-server
ARG workspace
COPY --from=workspace-builder-with-nginx /usr/src/project/${workspace}/out /usr/share/nginx/html
COPY --from=workspace-builder-with-nginx /usr/src/project/${workspace}/nginx/entrypoint.sh /usr/src/entrypoint.sh
COPY --from=workspace-builder-with-nginx /usr/src/project/${workspace}/nginx/default.conf.template /etc/nginx/conf.d/default.conf.template
RUN chmod +x /usr/src/entrypoint.sh
CMD /usr/src/entrypoint.sh

FROM workspace-builder AS node-server
ARG workspace
WORKDIR /usr/src/project/${workspace}
CMD yarn start

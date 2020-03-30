FROM node:13.11.0-alpine AS builder
WORKDIR /usr/src/project
COPY package.json yarn.lock packages/landing/package.json ./
RUN yarn --frozen-lockfile
COPY . .
WORKDIR /usr/src/project/packages/landing
RUN yarn build
RUN yarn export

FROM httpd:2.4.41 AS httpd-pagespeed
RUN apt-get update
RUN apt-get -y install apache2 wget
RUN wget https://dl-ssl.google.com/dl/linux/direct/mod-pagespeed-stable_current_amd64.deb
RUN dpkg -i mod-pagespeed-stable_current_amd64.deb
RUN rm -rf /etc/apache2/sites-enabled/*
RUN a2enmod expires deflate rewrite

FROM httpd-pagespeed AS runner
COPY --from=builder /usr/src/project/packages/landing/out/ /var/www/html/
COPY --from=builder /usr/src/project/packages/landing/httpd.conf /etc/apache2/sites-enabled/default.conf
CMD apache2ctl -D FOREGROUND

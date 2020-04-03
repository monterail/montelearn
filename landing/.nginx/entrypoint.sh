#!/bin/sh

# NOTE: shebang has to be /bin/sh instead of /bin/bash for alpine docker images
# https://stackoverflow.com/questions/44460825/entrypoint-file-not-found#comment75982158_44461619

# https://gist.github.com/mohanpedala/1e2ff5661761d3abd0385e8223e16425
set -euxo pipefail

export PORT=${PORT:-80}

# Inject env variables into nginx config template
envsubst '$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

cat /etc/nginx/conf.d/default.conf

# Run nginx
nginx -g 'daemon off;'

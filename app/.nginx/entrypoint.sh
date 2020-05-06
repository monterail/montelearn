#!/bin/sh

set -euxo pipefail

export PORT=${PORT:-80}

envsubst '$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
nginx -g 'daemon off;'

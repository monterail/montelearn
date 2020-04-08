#!/bin/sh

set -o errexit
set -eu pipefail
set -o nounset

python /app/manage.py migrate --noinput
python /app/manage.py collectstatic --noinput
/usr/local/bin/gunicorn config.wsgi --bind ${HOST}:${PORT} --chdir=/app

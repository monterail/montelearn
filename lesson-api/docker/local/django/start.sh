#!/bin/sh

set -o errexit
set -eu pipefail
set -o nounset


python manage.py migrate
python manage.py runserver ${HOST}:${PORT}

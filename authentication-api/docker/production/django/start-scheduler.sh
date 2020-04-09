#!/bin/sh

set -o errexit
set -eu pipefail
set -o nounset


celery -A config beat -l info

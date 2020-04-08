#!/bin/sh

set -o errexit
set -eu pipefail
set -o nounset


celery -A config worker -l info

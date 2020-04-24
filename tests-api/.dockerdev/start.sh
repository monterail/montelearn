#!/bin/bash

bundle install
bundle exec rails db:prepare
rm tmp/pids/server.pid
bundle exec rails server -b 0.0.0.0

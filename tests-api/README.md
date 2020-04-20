# tests-api

Stateful microservice, with its own database, that exposes a single JSON API endpoint `/tests`.

Documented with Swagger 2.0 through [`rswag`](https://github.com/rswag/rswag) gem.

## Development setup

It's based on https://evilmartians.com/chronicles/ruby-on-whales-docker-for-ruby-rails-development
You need only docker to develop the application.
All the shell commands pls run inside `docker-compose run --rm runner` or `dip bash`

To improve docker interaction on development we recommend to use dip
https://github.com/bibendi/dip#dip

```
# Run commands each by each from provision section of dip.yml
dip provision
```

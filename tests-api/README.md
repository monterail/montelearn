# tests-api

Stateful microservice, with its own database, that exposes a `Test` resources.

Available endpoints:
- GET `/api/tests/`
- GET `/api/tests/{uuid}`

Documented using Swagger 2.0 with [`rswag`](https://github.com/rswag/rswag) gem.

Check documentation at http://localhost:3000/swagger

## Development setup

It's based on https://evilmartians.com/chronicles/ruby-on-whales-docker-for-ruby-rails-development
You need only docker to develop the application.
All the shell commands pls run inside `docker-compose run --rm runner` or `dip bash`

To improve docker interaction on development we recommend to use dip
https://github.com/bibendi/dip#dip

```
gem install dip
# Run commands each by each from provision section of dip.yml (setup)
dip provision
# Run Rails server available at http://localhost:3000
dip rails s
```

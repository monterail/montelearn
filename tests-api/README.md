# tests-api

Stateful microservice, with its own database, exposing a RESTish API for managing `Test` resource.

Available endpoints:
- GET `/api/tests/`
- GET `/api/tests/{uuid}`
- POST `/api/tests/`

Documented with Swagger 2.0 using [`rswag`](https://github.com/rswag/rswag) gem.

Check documentation at http://localhost:3000/swagger

## Development setup

Based on [Ruby on Whales: Dockerizing Ruby and Rails development](https://evilmartians.com/chronicles/ruby-on-whales-docker-for-ruby-rails-development).

You need only docker to develop the application.

All the shell commands pls run inside `docker-compose run --rm runner` or `dip bash` (see next).

To improve docker interaction on development we recommend using [Dip](https://github.com/bibendi/dip#dip).

```console
gem install dip
# Run commands each by each from provision section of dip.yml (setup)
dip provision
# Run Rails server available at http://localhost:3000
dip rails s
```

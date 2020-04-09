build: run

hooks_setup:
	pip install black flake8 isort[pyproject] pre-commit
	pre-commit install

# you can pass pytest args, e.g. `make test args='-k test_landing_page'` to run a single test
test:
	docker-compose run --rm appserver ./test.sh $(args)

test_failed:
	make test args='--last-failed'

test_ci:
	# this is so that codecov can get SHA
	echo '!'".git" >> .dockerignore
	docker-compose -f docker-compose.ci.yml run --rm sut ./test.sh

# allows using ipdb
run:
	docker-compose run --service-ports --rm appserver

shell:
	docker-compose run --rm appserver python manage.py shell

superuser:
	docker-compose run --rm appserver python manage.py createsuperuser

coverage_html:
	docker-compose run --rm appserver coverage html

migrations:
	docker-compose run --rm appserver python manage.py makemigrations

translations:
	docker-compose run --rm appserver python manage.py makemessages

reqs:
	python -m piptools compile requirements/base.in
	python -m piptools compile requirements/test.in
	python -m piptools compile requirements/local.in
	python -m piptools compile requirements/production.in

HEROKU_INSTALL_CLI := ./docker/install_heroku_cli.sh
HEROKU_LOGIN := docker login --username=$$HEROKU_EMAIL --password=$$HEROKU_TOKEN registry.heroku.com
HEROKU_CLI :=  ~/bin/heroku-cli/bin/heroku
HEROKU_PUSH_CONTAINER := $(HEROKU_CLI) container:push web worker scheduler --recursive --app
HEROKU_RELEASE_CONTAINER := $(HEROKU_CLI) container:release web worker scheduler --app
INSTALL_HEROKU_CLI_AND_LOGIN_AND_SETUP_DOCKERFILES := $(HEROKU_INSTALL_CLI) && $(HEROKU_LOGIN) && mv docker/production/django/Dockerfile.* ./

deploy_test:
	$(INSTALL_HEROKU_CLI_AND_LOGIN_AND_SETUP_DOCKERFILES)
	$(HEROKU_PUSH_CONTAINER) auth-api-test
	$(HEROKU_RELEASE_CONTAINER) auth-api-test

deploy_stage:
	$(INSTALL_HEROKU_CLI_AND_LOGIN_AND_SETUP_DOCKERFILES)
	$(HEROKU_PUSH_CONTAINER) auth-api-stage
	$(HEROKU_RELEASE_CONTAINER) auth-api-stage

deploy_prod:
	$(INSTALL_HEROKU_CLI_AND_LOGIN_AND_SETUP_DOCKERFILES)
	$(HEROKU_PUSH_CONTAINER) auth-api-prod
	$(HEROKU_RELEASE_CONTAINER) auth-api-prod

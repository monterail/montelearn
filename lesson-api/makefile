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

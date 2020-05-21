# LESSON-API

[![codecov-image]][codecov]
[![black-image]][black]
[![calver-image]][calver]
[![cookiecutter-image]][cookiecutter]
[![github-actions]][github-status]


## Setting up pre-commit hooks

    make hooks_setup

## Start app

    make run

Local (dev) env vars are set directly in `docker-compose.yml` file.

These env vars need to be set in prod:
```
    DJANGO_SETTINGS_MODULE=config.settings.production
    DJANGO_SECRET_KEY=
    DJANGO_ADMIN_URL=
    DJANGO_ALLOWED_HOSTS=
    DATABASE_URL=
    DATABASE_ATOMIC_REQUESTS=
    DATABASE_CONN_MAX_AGE=
    DJANGO_ALLOWED_HOSTS=
    PORT=
    HOST=

    DJANGO_SECURE_SSL_REDIRECT=False

    MAILGUN_API_KEY=
    MAILGUN_DOMAIN=
    DJANGO_SERVER_EMAIL=
    EMAIL_BACKEND=
    DJANGO_DEFAULT_FROM_EMAIL=

    # Gunicorn
    WEB_CONCURRENCY=4

    SENTRY_DSN=
```

## Create migrations

    make migrations

## Create superuser

To create an **superuser account**, use this command:

    make superuser

## Run tests

To run the tests and check your test coverage:

    make test 

[github-actions]: https://github.com/monterail/monterail-elearning/workflows/CD%20lesson-api/badge.svg
[github-status]: https://github.com/monterail/monterail-elearning/actions

[codecov-image]: https://codecov.io/gh/monterail/monterail-elearning/branch/master/graph/badge.svg?token=3MKHOIRYBY
[codecov]: https://codecov.io/gh/monterail/monterail-elearning

[black-image]: https://img.shields.io/badge/code%20style-black-000000.svg
[black]: https://github.com/psf/black

[calver-image]: https://img.shields.io/badge/Versioning%20strategy-CalVer-5FBB1C.svg
[calver]: https://calver.org

[cookiecutter-image]: https://img.shields.io/badge/built%20with-Cookiecutter%20Django-ff69b4.svg
[cookiecutter]: https://github.com/monterail/monterail-elearning

ARG RUBY_VERSION='2.7.1'
FROM ruby:$RUBY_VERSION-slim-buster AS development

ARG PG_MAJOR='12'
ARG NODE_MAJOR='12'
ARG BUNDLER_VERSION='2.1.4'

# Common dependencies
RUN apt-get update -qq \
  && DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends \
    build-essential \
    gnupg2 \
    curl \
    less \
    git \
  && apt-get clean \
  && rm -rf /var/cache/apt/archives/* \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
  && truncate -s 0 /var/log/*log

# Add PostgreSQL to sources list
RUN curl -sSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - \
  && echo 'deb http://apt.postgresql.org/pub/repos/apt/ buster-pgdg main' $PG_MAJOR > /etc/apt/sources.list.d/pgdg.list

# Install dependencies
COPY .dockerdev/Aptfile /tmp/Aptfile
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get -yq dist-upgrade && \
  DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends \
    libpq-dev \
    postgresql-client-$PG_MAJOR \
    $(cat /tmp/Aptfile | xargs) && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    truncate -s 0 /var/log/*log

# Configure bundler
ENV LANG=C.UTF-8 \
  BUNDLE_JOBS=4 \
  BUNDLE_RETRY=3

# Uncomment this line if you store Bundler settings in the project's root
# ENV BUNDLE_APP_CONFIG=.bundle

# Run binstubs without prefixing with `bin/` or `bundle exec`
ENV PATH /app/bin:$PATH

# Upgrade RubyGems and install required Bundler version
RUN gem update --system && \
    gem install bundler:$BUNDLER_VERSION

# Create a directory for the app code
RUN mkdir -p /app

# Create a directory for the server.pid file
RUN mkdir -p /tmp/pids

WORKDIR /app

# Preparation for production release
FROM development AS builder
ENV BUNDLE_APP_CONFIG=.bundle \
  RAILS_ENV=production
COPY . /app
RUN bundle config --local without development:test \
  && bundle config --local deployment true \
  && bundle config --local path vendor/bundle \
  && bundle install
RUN SECRET_KEY_BASE=secret \
  REDIS_URL=redis://fake \
  && rm -rf node_modules tmp \
  && mkdir -p tmp/pids

# Production image
FROM development AS production
ENV BUNDLE_APP_CONFIG=.bundle \
  RAILS_ENV=production \
  RAILS_LOG_TO_STDOUT=true

COPY --from=builder /app .
CMD rails db:migrate; puma --config config/puma.rb

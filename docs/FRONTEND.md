## Prerequisites

- **Yarn** 1.15 or newer
- **Node** 13.11 or newer (you can use [NVM](https://github.com/nvm-sh/nvm) to manage Node versions)

_It's important to use Yarn instead of NPM, because we use Yarn Workspaces not supported by NPM._

## Quick start

If you want to quickly start introducing changes to landing page:

1. Create an `.env` file with environment variables inside `landing` directory (see `landing/.env.example` for required configuration and explanation).

2. Run set of commands from the root directory of the project.

```bash
# Skip this if you have correct Node version installed globally.
> nvm use

# Install and link dependencies, register pre-commit hooks.
> yarn

# Run build process in packages that need compilation steps to work.
> npx lerna run lib

# Run landing page app in development mode.
> (cd landing && yarn dev)
```

## Overview

The main technologies used are: **React**, **Next.js**, **Typescript** and [**Emotion**](https://www.npmjs.com/package/emotion) (as a styling library).

Javascript part of project is organised into separate packages. We use [**Yarn Workspaces**](https://classic.yarnpkg.com/en/docs/workspaces/) to enable code sharing between them. An example can be an ESLint package that is abstracted to a reusable module that can be used for linting source code enforcing identical rules for each part of the project.

### `landing`

> This is a simple Next.js app that serves landing page for the project. We build a static version of it, since we don't need Node.js runtime for now, and serve it via [Nginx](https://www.nginx.com) proxy that uses [`mod_pagespeed`](https://developers.google.com/speed/pagespeed/module) for on-the-fly assets optimisation.

The development server runs on port 3000 by default. You can change the port from the command line:

``` bash
# Assuming you are in landing directory.
> PORT=4000 yarn dev
```

### `packages/eslint`

> Here we have an ESLint config along with a CLI for linting a Typescript/Javascript modules. The main purpose of this is to have a single configuration file that can be reused in many places, when the application grows.

```bash
# Install it in package where you want to use it.
> yarn add --dev --exact @project/eslint@1.0.0

# Lint the source code using predefined rules.
> npx project-eslint --ext '.js,.ts' src
```

### `packages/jest`

> Basically it has the same purpose as `packages/eslint` but for running unit tests.

```bash
# Install it in package where you want to use it.
# This will also install some external dependencies, like @testing-library/react,
# so you can test React components without any extra steps.
> yarn add --dev --exact @project/jest@1.0.0

# Run unit tests with predefined configuration.
# It requires tests to be placed in .spec.js (or .spec.jsx) files.
> npx project-jest
```

If you need, for some reason, customised configuration for your package, you can just create a `jest.config.js` file and setup Jest from there. Like in this example:

```js
const config = require("@project/jest");

module.exports = Object.assign({}, config, {
  collectCoverage: false,
});
```

Always try to consider updating reusable config if the changes can be applied for the whole project.

## Deployment

Changes to landing page are automatically [deployed to Heroku](https://montelearn-landing.herokuapp.com) after a pull request is merged to `master` branch. It's worth pointing out that changes not related to landing page source code (like updating API code) <u>does not trigger</u> a new deployment.

### Build production locally

You can build the production version of the landing page locally using [**Docker**](https://www.docker.com). It will use the `.env` file from `landing` directory, so make sure you update it accordingly. A thing to remember is that if you want to connect to production services (the deployed ones) you may encounter CORS issues.

```bash
# Build docker image for landing page.
> docker build -t montelearn-landing .

# Run the container using previously built image.
> docker run --rm -p 3000:3000 montelearn-landing
```

## Conventions

> Here we describe some convention we want to have for the Javascript codebase.\
> ⚠️ Be aware that this list will be constantly updated, so make sure you follow the changes.

### Reusability

Think about reusability, not only in terms of React components, but also on a higher level. If something make sense to be extracted to a separate module or even workspace and reused, feel free to make it happen. But also try to not overengineer stuff.

### Focus on bundle size

Don't introduce unnecessary libraries, choose those that are not very heavy (use [Bundlephobia](https://bundlephobia.com)), use dynamic imports where it's beneficial to split code into chunks. It's good to use [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=pl) to audit the performance of the page load.

### Lock dependencies version

Use `--exact` flag when doing `yarn add`, so the version of package is locked. This is a good practice, because we avoid differences in used dependencies across two copies of the project.

### Use the same yarn scripts names

```bash
# Build production-ready version of package.
> yarn build

# Clean up current workspace after running some compilation steps.
# Mainly used to clean up the codebase and setup it from the beginning if something breaks.
> yarn cleanup

# Spin up development server for given module/ package.
> yarn dev

# Lints the source code (now only ESLint, but Stylelint is also allowed here).
# Use project-eslint instead of eslint for reusable preconfigured rules.
> yarn lint

# Run some check and autofixing before commiting changes.
# Good idea is to have Typescript checks, ESLint autofix and Prettier formatting.
# Use lint-staged to lint only those files that have been staged for commit.
> yarn pre-commit

# Run unit tests.
> yarn test
```

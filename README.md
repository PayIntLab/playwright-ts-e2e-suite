# Playwright TypeScript E2E Suite

A portfolio-ready Playwright + TypeScript test suite covering UI, API, authentication reuse, CI sharding, HTML reports, and Docker.

## Coverage

| Area                | Tests                                                   |
| ------------------- | ------------------------------------------------------- |
| TodoMVC UI          | add, complete, delete, filters, clear completed         |
| SauceDemo login     | valid login, locked-out user, invalid credentials       |
| SauceDemo inventory | product list, price sorting, add/remove cart            |
| SauceDemo checkout  | checkout happy path, required-field validation          |
| Public API          | JSONPlaceholder GET/POST/404, httpbin query and headers |

## Stack

- Playwright Test
- TypeScript
- Page Object Model
- Custom fixtures
- Storage state for authenticated flows
- GitHub Actions with sharded runs and merged HTML report
- Docker image based on the official Playwright image
- Prettier

## Run locally

```bash
npm install
npx playwright install ffmpeg
npm test
npm run typecheck
npm run report
```

By default the suite uses the installed Google Chrome browser through `PW_CHANNEL=chrome`. To use the bundled Chromium instead:

```bash
PW_CHANNEL=chromium npx playwright test
```

## Useful commands

```bash
npm run test:smoke     # only @smoke tests
npm run test:api       # only @api tests
npm run test:ui        # only @ui tests
npm run test:headed    # headed browser
npm run test:ui-mode   # Playwright UI mode
SHARD=1/2 npm run test:shard
npm run format
```

## Authentication

`global-setup.ts` logs in once as `standard_user`, saves the storage state to `playwright/.auth/standard_user.json`, and the inventory/checkout specs reuse it.

## Project structure

```text
playwright-ts-e2e-suite/
  fixtures/test-fixtures.ts
  pages/CartPage.ts
  pages/CheckoutPage.ts
  pages/InventoryPage.ts
  pages/LoginPage.ts
  pages/TodoPage.ts
  tests/api.spec.ts
  tests/saucedemo-checkout.spec.ts
  tests/saucedemo-inventory.spec.ts
  tests/saucedemo-login.spec.ts
  tests/todomvc.spec.ts
  global-setup.ts
  playwright.config.ts
  Dockerfile
  .github/workflows/playwright.yml
```

## CI

The workflow runs two shards in parallel, uploads blob reports, merges them into one HTML report, and uploads the merged report as an artifact.

## Docker

```bash
docker build -t playwright-ts-e2e-suite .
docker run --rm playwright-ts-e2e-suite
```

The Docker image sets `PW_CHANNEL=chromium` and uses the Playwright bundled browser.

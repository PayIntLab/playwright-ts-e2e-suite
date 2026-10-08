# Playwright + TypeScript Demo

A small, runnable Playwright + TypeScript test automation project covering UI and API testing.

## Stack

- Playwright Test
- TypeScript
- Page Object Model
- Custom fixtures
- GitHub Actions
- HTML report

## Coverage

| Area | Tests |
|---|---|
| TodoMVC UI | add, complete, delete todo |
| SauceDemo login | valid login, locked-out user, invalid credentials |
| Public API | JSONPlaceholder, httpbin |

## Run locally

```bash
npm install
npx playwright install ffmpeg
npm test
npm run typecheck
npm run report
```

The project uses the installed Google Chrome browser through `channel: 'chrome'`, so it does not need to download a separate browser binary locally. The small `ffmpeg` helper is required for Playwright video recording.

## Project structure

```text
playwright-ts-demo/
  fixtures/test-fixtures.ts
  pages/LoginPage.ts
  pages/TodoPage.ts
  tests/api.spec.ts
  tests/saucedemo-login.spec.ts
  tests/todomvc.spec.ts
  playwright.config.ts
  .github/workflows/playwright.yml
```

## CI

GitHub Actions runs the suite on push, pull request, and manual dispatch.
The HTML report is uploaded as the `playwright-report` artifact.

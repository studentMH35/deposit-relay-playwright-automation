# Deposit Relay Automation

## Overview

Automated testing suite for the Deposit Onboarding Portal (Deposit Relay) using Playwright and TypeScript. The suite provides fast smoke checks to verify demo readiness for Consumer and Entity flows.

## Problem Statement

Deployments often happen shortly before demos. There is no fast, reliable automated check that tells stakeholders whether it's safe to demo the entity or consumer onboarding flows.

## Objectives

- Provide a quick pass/fail signal for demo readiness.
- Validate critical entry paths (Consumer, Entity) end-to-end to landing page.
- Produce clear, non-technical output for demo owners.

## Application Workflows

- Consumer: navigate to relay URL → enter OTP → complete welcome flow → landing page.
- Entity: similar path with entity-specific onboarding steps.

## Tech Stack

- Playwright (E2E)
- TypeScript
- Allure (reporting)
- Node.js / npm

## Framework Architecture

- Page Object Model: `pages/DepositPage` encapsulates interactions.
- Fixtures: `fixtures/test.fixture.ts` exposes `depositPage` for tests.
- Tests: grouped under `tests/smoke`, `tests/e2e` with tags.
- Reporting: Playwright HTML + Allure + JSON reporter for CI summaries.

## Project Structure

- `tests/` - Playwright specs (smoke, functional, e2e)
- `pages/` - Page objects
- `fixtures/` - Playwright fixtures
- `markdownDocs/` - Test plan & strategy
- `.github/workflows/` - CI definitions
- `allure-results/`, `playwright-report/` - generated artifacts

## Prerequisites

- Node.js (>= 18 recommended)
- npm
- Network access to the demo relay URLs

## Installation

```bash
npm install
npx playwright install
```

## Environment Configuration

- Create a `.env` with the following variables (or set as CI secrets):
	- `CONSUMER_URL`, `CONSUMER_CODE`
	- `ENTITY_URL`, `ENTITY_CODE`

## Running Tests

### Run all tests

```bash
npx playwright test
```

### Consumer (single spec)

```bash
npx playwright test tests/smoke/consumer-smoke.spec.ts --workers=1
# or
npm run test:consumer
```

### Entity (single spec)

```bash
npx playwright test tests/smoke/entity-smoke.spec.ts --workers=1
# or
npm run test:entity
```

### Smoke (both personas)

```bash
npm run test:smoke
```

### Headed

```bash
npm run test:smoke:headed
```

### Debug

```bash
npm run test:debug
```

## Test Tags

- `@smoke` — fast demo-ready checks
- `@consumer` — Consumer persona
- `@entity` — Entity persona
- `@e2e` — full end-to-end flows that submit real applications (run manually)

## Reporting

### Playwright HTML Report

- Generated to `playwright-report/` (open with `npx playwright show-report`).

### Allure Report

- Results in `allure-results/`; generate and open with:

```bash
npm run allure:report
```

## CI/CD

- `.github/workflows/playwright.yml` runs the smoke suite (`npm run test:smoke`) and publishes Playwright HTML and Allure artifacts.
- Ensure CI secrets are set: `CONSUMER_URL`, `CONSUMER_CODE`, `ENTITY_URL`, `ENTITY_CODE`.

## Test Coverage

- The suite covers P0 smoke checks for Consumer and Entity entry paths (navigation, auth, welcome, landing).
- It deliberately excludes post-landing business transactions and heavy integration tests.

## Known Application Constraints

- The app initializes asynchronously; DOMContentLoaded does not equal readiness.
- Material UI backdrops can block clicks — tests use condition-based waits.
- Tests that submit data (tagged `@e2e`) must be run manually.

## Design Decisions

- Use Page Object Model for maintainability.
- Prefer `getByRole()` locators and accessible names.
- Separate smoke and e2e tests by tags to avoid accidental production actions.

## Future Improvements

- Add negative-auth scenarios and retry handling for transient infra failures.
- Improve selectors with test IDs from the application.
- Add scheduled CI smoke runs and flaky-test tracking.

## Where to find detailed plans

See `markdownDocs/DepositOnboardingTestPlan.md` and `markdownDocs/DepositOnboardingTestStrategy.md` for full details.

## Demo Notes

- **Coverage:** Consumer + Entity smoke checks (navigation → auth code → welcome flow → landing page). These are tagged `@smoke`.
- **Typical runtime:** ~30–90s per persona (depends on app initialization). CI job timeout is set to 10 minutes.
- **How to run (local):**
```
npx playwright test --grep @smoke
npm run test:smoke
```
- **Reports & artifacts:** Playwright HTML report in `playwright-report/`, Allure results in `allure-results/`, JSON reporter at `test-results/results.json` when enabled.
- **What "green" looks like (for non-QA reviewers):**
	- Both Consumer and Entity smoke specs pass.
	- Playwright HTML report shows no failed steps; artifacts (screenshots/video) attached only on failures.
	- CI summary prints `SAFE TO DEMO` when both flows pass; otherwise `DO NOT DEMO` with attached evidence.

Note: End-to-end/full `@e2e` specs submit real applications and must only be run manually (not on every push).

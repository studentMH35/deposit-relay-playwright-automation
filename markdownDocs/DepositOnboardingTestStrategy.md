**Test Strategy Deposit Onboarding Portal**

## 1. Introduction

This Test Strategy defines how testing will be performed for the Deposit Onboarding Portal automation suite and describes the overall QA approach including automation, synchronization, reporting and CI/CD.

## 2. Testing Objectives

- Validate critical entry workflows (Consumer and Entity) quickly and reliably.
- Provide clear pass/fail signals for demo readiness.

## 3. Quality Strategy

- Prioritize high-value, high-risk paths (risk-based testing).
- Fail fast and provide diagnostic evidence to speed triage.

## 4. Risk-Based Testing Approach

- Focus automation investment on P0 smoke checks; expand to P1 scenarios as stability improves.

## 5. Test Pyramid

- UI Smoke (top-priority) → Functional UI → API/Integration → Performance (out of scope).

## 6. Automation Strategy

- Use Playwright with TypeScript; tests organized by tags and folder structure.
- Keep smoke tests isolated and fast; predicate longer tests to manual or scheduled runs.

## 7. Playwright Architecture

- Playwright config defines projects (chromium) and reporters.
- JSON reporter used for CI summary; HTML + Allure for detailed evidence.

## 8. Page Object Model

- `pages/DepositPage` encapsulates UI interactions and locators; tests reference page methods rather than raw locators.

## 9. Fixture Strategy

- `fixtures/test.fixture.ts` exposes `depositPage` per-test; reuse for smoke and e2e.

## 10. Locator Strategy

- Prefer `getByRole()` and accessible names; use test IDs if the app provides them.

## 11. Synchronization Strategy

- Use condition-based waits for visible/enabled states; increase per-step timeouts for initialization.
- Capture trace on first retry to aid debugging.

## 12. Test Data / Configuration Strategy

- Environment-driven config via `.env` or CI secrets for URLs and OTPs; keep secrets out of repo.

## 13. Consumer vs Entity Coverage

- Both personas covered by smoke tests; entity-specific deeper workflows deferred to functional suite.

## 14. Smoke Strategy

- Smoke tests are minimal, fast, and deterministic: navigation → auth → welcome → landing assertions.

## 15. Regression Strategy

- Full regression and business workflows run manually or on scheduled CI pipelines once stable.

## 16. Negative Testing Strategy

- Add invalid/expired code scenarios as P1 tests; intentionally exercised in functional/negative suites.

## 17. CI/CD Strategy

- GitHub Actions runs `npm run test:smoke` for smoke; artifacts uploaded for diagnostics.

## 18. Reporting Strategy

- CI produces a concise SAFE/DO NOT DEMO summary from JSON reporter and publishes HTML/Allure artifacts for triage.

## 19. Failure Diagnostics

- Include screenshot, video and trace; collect console errors and failed network requests for failing runs.

## 20. Parallel Execution

- Consumer and Entity smoke tests can run in parallel; limit workers in CI if environment constraints exist.

## 21. Environment Strategy

- Use isolated demo environments per deployment; prefer ephemeral test data when extending coverage.

## 22. Risks and Mitigations

- (see Test Plan) — prioritize waits, trace captures, and clear classification of failures.

## 23. Future Improvements

- Add scheduled smoke runs, flaky-test detection, and improved testability hooks in the application.


For the current scope, quality means that a valid Consumer or Entity can reliably enter the Deposit Onboarding Portal, authenticate, complete the required welcome flow, and reach the expected application state, with automation capable of distinguishing genuine application failures from timing, environment and test defects.
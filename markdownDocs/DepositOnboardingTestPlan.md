**Test Plan Deposit Onboarding Portal**

- Author: Parag Raut
- Owner: QA / SDET
- Version: 1.0
- Last updated: 2026-08-13

# 1. Purpose

This Test Plan documents what will be tested, the scope, objectives, schedule, entry and exit criteria, risks and deliverables for the Deposit Onboarding Portal smoke automation.

# 2. Product / Application Under Test

- Product: Deposit Onboarding Portal (Deposit Relay)
- Primary URLs: provided via `CONSUMER_URL` and `ENTITY_URL` environment variables

# 3. Testing Objectives

- Verify Consumer and Entity entry flows are operational after deployment.
- Provide a fast, reliable pass/fail signal for demo readiness.
- Produce actionable evidence (HTML, Allure, screenshots, traces) for failures.

# 4. Scope

## 4.1 In Scope
- Consumer and Entity smoke workflows: navigation, authentication, welcome flow, and landing-page validation.
- Playwright-based automation, Page Object Model, and CI smoke runs.

## 4.2 Out of Scope
- Post-landing business transactions (account funding, KYC), DB checks, performance or security testing.

# 5. Application Workflows

- Consumer: navigate to relay URL → wait for auth UI → enter OTP → complete welcome → land on application page.
- Entity: same entry path; entity-specific onboarding steps not covered by smoke.

# 6. Test Approach

- Risk-based smoke checks implemented in Playwright + TypeScript.
- Tests use `DepositPage` page-object and `depositPage` fixture.
- Use `test.step()` for human-readable step reporting and JSON reporting for CI summaries.

# 7. Test Types

- Smoke — P0 checks for demo readiness (implemented).
- Functional — deeper business flows (planned).
- Negative — invalid/expired codes (planned).
- Regression — broader suite (future).
- Exploratory — ad-hoc QA investigation (manual).
- Compatibility — cross-browser when required (future).

# 8. Test Environment

- Local developer machines with Node.js and Playwright installed.
- CI runner: GitHub Actions (`ubuntu-latest`) with Playwright browsers installed.
- Secrets provided via GitHub Actions secrets or local `.env`.

# 9. Test Data

- OTP codes and relay URLs are supplied through environment variables.
- No production credentials are stored in the repo. Use per-environment test data where available.

# 10. Entry Criteria

- Application is deployed and reachable at the specified URLs.
- Valid OTPs and URLs configured as environment variables.
- Node dependencies installed and Playwright browsers available.

# 11. Exit Criteria

- All P0 smoke checks pass for both Consumer and Entity.
- Playwright and Allure reports generated successfully and attached to the run.
- Any failures are triaged and classified.

# 12. Defect Management

- Failures are logged in the issue tracker with Playwright/Allure evidence attached.
- Triage will classify failures as product, test, or environment issues.

# 13. Test Deliverables

- Test specifications (repo under `tests/`).
- Page Objects (`pages/DepositPage`).
- Playwright HTML report and Allure results.
- This Test Plan and Test Strategy documents.

# 14. Risks and Mitigations

- Slow app initialization → use condition-based waits and traces.
- UI overlays blocking clicks → explicit visibility/enabled checks and retries.
- Secrets leakage → use CI secrets and .env ignored locally.

# 15. Assumptions and Dependencies

- Assumes relay URLs and OTPs provided for demo environments.
- Dependent on network access and stability of demo infrastructure.

# 16. Execution Reporting

- Local report: Playwright HTML; CI report: condensed JSON → CI summary step writes SAFE/DO NOT DEMO.
- Allure artifacts retained for historical analysis.

# 17. Approval / Sign-off

- QA Owner: Parag Raut  Date: 13 AUgust 2026
- Product Owner: __________________ Date: __________



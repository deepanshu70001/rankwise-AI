# RankWise AI — Product README

> **Working product name:** RankWise AI  
> **Product type:** AI-assisted SEO auditing and improvement workspace  
> **Current stage:** Frontend prototype / MVP in development  
> **Initial target market:** Small businesses and small digital-marketing agencies, starting with India

RankWise AI aims to help small teams understand website SEO issues, decide what to fix first, and verify whether changes resolved the detected issues. The product should translate technical audit findings into clear, evidence-based actions—not simply provide another unexplained SEO score.

**Current status:** The React frontend includes the main product screens and demo interactions. The Python backend, production authentication, persistent storage, live scan integration, AI recommendations, and billing are not yet implemented. Sample dashboard metrics and demo audit output are illustrative and must not be presented to customers as real scan results.

---

## Contents

- [Product vision](#product-vision)
- [Problem and intended users](#problem-and-intended-users)
- [Product principles](#product-principles)
- [Current prototype features](#current-prototype-features)
- [MVP scope](#mvp-scope)
- [Post-MVP roadmap](#post-mvp-roadmap)
- [Feature status](#feature-status)
- [Technology stack](#technology-stack)
- [Architecture](#architecture)
- [Repository structure](#repository-structure)
- [Local development setup](#local-development-setup)
- [Configuration](#configuration)
- [Planned API contract](#planned-api-contract)
- [Security and privacy requirements](#security-and-privacy-requirements)
- [Quality and testing plan](#quality-and-testing-plan)
- [Validation and launch plan](#validation-and-launch-plan)
- [Potential business model](#potential-business-model)
- [Definition of done](#definition-of-done)
- [License and project status](#license-and-project-status)

---

## Product vision

Make SEO understandable and actionable for people who do not have an in-house SEO specialist.

A user should be able to:

1. Submit a public website URL.
2. Receive a technical scan with evidence for each finding.
3. Understand why a finding may matter.
4. See recommended next steps, prioritized using transparent rules.
5. Review and approve proposed changes before implementation.
6. Rescan the page and confirm whether the issue was resolved.
7. Keep a history of scans and improvements.

RankWise AI must not promise Google rankings, traffic, leads, or revenue. It should report what it measured, explain limitations, and distinguish verified findings from suggestions.

## Problem and intended users

### Initial customer hypotheses

The first customer segment should be validated with interviews before substantial investment.

Potential users include:

- Local businesses that maintain their own websites.
- Small agencies managing several client websites.
- Freelancers providing SEO services.
- Small marketing teams without dedicated technical SEO staff.

### Problems to validate

- Audit reports can be difficult for non-specialists to interpret.
- Users may not know which findings to fix first.
- Recommendations may be too generic to implement.
- It can be hard to keep track of fixes and recheck them.
- Business owners may not have a clear view of what was checked and what remains unknown.

These are hypotheses to test with prospective users, not claims that all customers experience these problems.

## Product principles

1. **Evidence first:** Every automated finding should be supported by a detectable condition and, where practical, the affected URL or HTML detail.
2. **Action over vanity scores:** A score is only a summary; users need clear issues, severity, context, and next steps.
3. **AI assists, rules verify:** Deterministic code should detect measurable technical conditions. AI can explain findings and propose improvements, but should not fabricate scan evidence.
4. **Human approval:** Do not edit a live website without explicit user authorization.
5. **Transparent limitations:** Mark untested checks and unavailable data as unknown or not checked, not as passed.
6. **Privacy and safety:** Minimize data collection, protect customer URLs and API keys, and restrict crawler access to safe public destinations.
7. **Lean launch:** Validate one narrow customer problem before building a large all-in-one marketing suite.

---

## Current prototype features

The current frontend package is a React/Vite UI prototype.

### Marketing homepage

- RankWise AI brand header and navigation.
- Product hero section and audit-dashboard preview.
- Feature overview.
- “How it works” section.
- Early-access pricing section.
- Calls to action for sign-up and login.
- Responsive layout for desktop, tablet, and mobile.

### Login screen

- Email and password form fields.
- Password visibility toggle.
- Basic client-side required-field validation.
- Demo-mode notice.
- Navigation to the demo workspace.

**Not implemented:** Real authentication, password verification, password reset, email verification, sessions, or account storage.

### Sign-up screen

- Name, email, and password fields.
- Basic client-side validation.
- Demo-mode disclosure.
- Navigation to the demo workspace.

**Not implemented:** Real account creation, secure password storage, verification, consent records, or account recovery.

### Workspace dashboard

- Sample metric cards.
- Illustrative SEO health chart.
- Sample audit score visualization.
- Sample tracked website table.
- Sample recommended actions.
- Responsive sidebar navigation.
- Demo workspace notices.

**Important:** Metrics, dates, websites, scores, and recommendations shown in the dashboard are sample data, not real measurements.

### New audit screen

- Website URL input and basic client-side URL validation.
- Single-page scan option.
- Full-site crawl option marked as coming soon.
- Loading and error UI states.
- Findings/results UI.
- Backend API service boundary in `src/services/api.js`.
- Safe-scanning guidance for the eventual backend.

**Current behavior:** With no API URL configured, the scan returns illustrative demo results after a short delay. It does not fetch or scan the URL.

### Audit history screen

- Sample report table.
- Search by domain or report ID.
- Status filtering.
- CSV export of the currently displayed sample records.
- Responsive table layout.

**Not implemented:** Persistence, real report details, pagination, or server-side export.

### Settings screen

- Workspace name field.
- Sample plan details.
- Profile email display.
- Visual notification toggle.
- Integration status placeholders for the Python API, AI recommendations, and Search Console.

**Not implemented:** Persistent settings or live integrations.

---

## MVP scope

The MVP should be a small, reliable, useful product—not every idea listed on this page. Its first release should analyze one public page and produce an auditable report.

### MVP feature list

#### 1. Single-page website scanner

- Accept and normalize a URL.
- Fetch HTML with timeouts and response-size limits.
- Validate the destination and every redirect.
- Extract the final URL and HTTP response information.
- Handle timeouts, inaccessible pages, invalid content types, and common request failures gracefully.

#### 2. On-page and technical checks

Minimum checks:

- Missing or empty HTML title.
- Title length as a review hint, not an absolute ranking rule.
- Missing meta description.
- H1 heading presence and count.
- H2/H3 heading outline.
- Images missing an `alt` attribute or with empty alt text, with care for decorative images.
- Internal and external link extraction.
- Broken internal-link detection, with strict request limits.
- Canonical URL presence and basic parsing.
- Robots meta directives where present.
- Basic indexability signals and explanatory warnings.

Not all checks are relevant to every page. Findings should include context and avoid treating valid implementation choices as automatic errors.

#### 3. Evidence-based audit findings

Every finding should contain fields similar to:

- Check identifier.
- Finding title.
- Severity or priority.
- Explanation.
- Affected URL or element, when available.
- Evidence collected by the scanner.
- Recommended next action.
- Detection method.
- Whether the finding was verified or needs human review.

#### 4. Transparent health score

- Use a documented, configurable scoring heuristic.
- Show which checks affected the score.
- Clearly label the score as RankWise AI's own summary, not a Google metric.
- Avoid assigning a score to checks that were not performed as if they had passed.
- Test score behavior with unit tests.

#### 5. AI recommendations

- Send only necessary, sanitized scan findings and page content to the configured AI provider.
- Generate specific, actionable explanations and suggested improvements.
- Keep fact detection separate from AI-generated interpretation.
- Ask for structured output that can be validated by the backend.
- Handle provider errors, quota exhaustion, malformed output, and timeouts.
- Provide non-AI fallback explanations for common issues.
- Do not generate unsupported ranking or traffic predictions.

#### 6. Audit dashboard and report

- Display the completed scan summary and detailed findings.
- Filter findings by priority or category.
- Generate a PDF or CSV report.
- Include scan time, scanned URL, checks performed, limitations, and recommendations.
- Label partial scans and unavailable checks.
- Allow users to rescan after making changes.

#### 7. Basic scan history

- Store scan metadata and results in a database.
- Associate scans with the authenticated user or workspace.
- View past reports.
- Compare two scans for the same URL.
- Show resolved, new, and still-present findings only where the comparison rules support that conclusion.

#### 8. Safe MVP operation

- Block localhost, private, link-local, reserved, and cloud metadata IP destinations.
- Revalidate destinations after DNS resolution and every redirect.
- Add network-level egress protections in production to mitigate DNS rebinding and SSRF.
- Set connection/read timeouts, response-size limits, page limits, concurrency limits, and per-user rate limits.
- Restrict accepted schemes to HTTP and HTTPS.
- Avoid running arbitrary page JavaScript in the server-side scanner.
- Do not crawl beyond the configured scope.
- Keep API keys and credentials server-side.
- Record only necessary operational logs and avoid logging secrets.

### Explicitly out of MVP scope

Do not build these before validating the core single-page workflow:

- Full enterprise crawler.
- Automatic edits to a production website.
- Backlink database or backlink discovery at scale.
- Guaranteed keyword search volume or difficulty metrics without a reliable data provider.
- Rank tracking across every search engine.
- Full competitor intelligence suite.
- AI search visibility claims without a defined, repeatable measurement methodology.
- Multi-tenant agency white-labeling.
- Subscription billing and complex usage-based billing.
- Mobile apps.
- A proprietary language model.

---

## Post-MVP roadmap

### Phase 0 — Project foundation

- [x] Prepare a React/Vite frontend with key product screens.
- [x] Add responsive navigation and basic demo interactions.
- [x] Add a frontend API-service boundary.
- [ ] Add a root project README and development conventions.
- [ ] Establish automated formatting, linting, and tests.

### Phase 1 — Functional technical audit

- [ ] Implement a Python API, recommended: FastAPI.
- [ ] Implement safe URL validation and fetching.
- [ ] Implement metadata, heading, image, link, canonical, and robots checks.
- [ ] Add evidence-rich issue output.
- [ ] Add unit tests and controlled fixture pages.
- [ ] Connect the React audit form to the real API.
- [ ] Replace sample results with actual scanner output.

### Phase 2 — Reports and persistence

- [ ] Define database models and migrations.
- [ ] Add scan records and result storage.
- [ ] Add PDF and CSV report generation.
- [ ] Add report history and rescan flow.
- [ ] Add scan comparison logic and tests.

### Phase 3 — AI recommendations

- [ ] Add an optional provider adapter and configuration.
- [ ] Define and validate a structured recommendation schema.
- [ ] Build evidence-grounded prompts and data minimization.
- [ ] Add timeouts, retries where appropriate, budget limits, and graceful fallback.
- [ ] Evaluate recommendation relevance and factuality against a curated test set.

### Phase 4 — Real accounts and controlled pilots

- [ ] Implement secure backend authentication and authorization.
- [ ] Ensure every scan/report is scoped to the right user or workspace.
- [ ] Add rate limiting and abuse protection.
- [ ] Add privacy policy, terms, retention rules, and deletion workflow.
- [ ] Run a pilot with a small number of consenting businesses.
- [ ] Measure issue accuracy, time saved, repeat usage, and willingness to pay.

### Phase 5 — Launch and monetization

- [ ] Deploy frontend and backend separately or behind a reverse proxy.
- [ ] Add monitoring, error reporting, backups, and usage limits.
- [ ] Add a landing page and onboarding that accurately describes the product.
- [ ] Introduce paid plans only after validating recurring customer value.
- [ ] Consider multi-site support, agency workspaces, and approved integrations.

---

## Feature status

| Feature | Status | Notes |
|---|---|---|
| Responsive React landing page | Prototype implemented | UI only |
| Login / sign-up screens | Prototype implemented | Not real authentication |
| Dashboard | Prototype implemented | Sample metrics and charts |
| New audit screen | Prototype implemented | Uses demo response if API URL is unset |
| Audit history table | Prototype implemented | Sample data and client-side CSV export |
| Settings UI | Prototype implemented | Local visual state only |
| Python backend | Not implemented yet | Backend folder needs implementation |
| Live URL scanner | Not connected to frontend | Planned MVP |
| Broken-link checking | Planned | Must be bounded and safe |
| Evidence-based health score | Prototype heuristic only | Needs tested scoring rules |
| AI recommendations | Planned | Provider/API not configured |
| PDF reports | Planned | Not implemented in React prototype |
| Database / scan persistence | Planned | Not implemented |
| Real authentication / authorization | Planned | Required before private user data |
| Search Console integration | Planned | Requires user authorization and API setup |
| Business Profile integration | Later-stage idea | Eligibility, permissions, and API constraints apply |
| Billing / subscriptions | Later-stage idea | Do not add before validation |

---

## Technology stack

### Frontend

- React
- Vite
- React Router
- Lucide icons
- CSS with responsive layouts

### Backend — planned

- Python 3.12
- FastAPI
- Pydantic for input/output validation
- Requests or a suitable HTTP client for fetching pages
- Beautiful Soup for HTML parsing
- SQLAlchemy and database migrations when persistence is introduced
- PostgreSQL for a hosted multi-user product
- SQLite for local experiments if useful
- Pytest for automated tests

### AI — planned and optional

- An LLM provider accessed from the backend only.
- A provider adapter so the product is not tightly coupled to a single vendor.
- Rule-based fallback recommendations for common checks.
- Validated structured output and usage budgets.

### Deployment — later

- Static frontend hosting.
- Python API hosting.
- Managed PostgreSQL when required.
- Environment-based secrets.
- Monitoring and backups.

Technology and hosting choices may change after the first working backend and customer feedback.

---

## Architecture

Expected request flow:

```text
Browser / React UI
      |
      | POST /api/audits
      v
FastAPI API
      |
      +--> URL validation and SSRF safeguards
      |
      +--> Safe page fetcher
      |
      +--> HTML parsing
      |
      +--> Deterministic SEO checks
      |
      +--> Finding normalizer and score
      |
      +--> Optional AI recommendation adapter
      |
      +--> Database / report generator
      |
      v
Validated JSON response
      |
      v
React results dashboard
```

The deterministic scanner is the source of truth for detected technical findings. The AI layer can explain findings and suggest improvements, but it must not silently overwrite scanner evidence or mark a fix as verified without rechecking the page.

## Repository structure

Target structure as the product grows:

```text
SEO Optimizer/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── api/
│   │   ├── schemas/
│   │   ├── services/
│   │   │   ├── fetcher.py
│   │   │   ├── scanner.py
│   │   │   ├── scoring.py
│   │   │   └── recommendations.py
│   │   ├── db/
│   │   └── core/
│   ├── tests/
│   └── requirements.txt
├── frontend/
│   ├── package.json
│   ├── index.html
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── styles.css
├── docs/
├── .env.example
├── .gitignore
└── README.md
```

This is the planned structure; the backend tree is not all present yet.

---

## Local development setup

### Prerequisites

- WSL Ubuntu 24.04 or another supported Linux environment.
- Python 3.12.
- Node.js 24 LTS recommended for the current frontend dependency versions.
- npm.
- Git and VS Code recommended.

### 1. Enter the project

In the user's current WSL setup:

```bash
cd "/mnt/d/SEO Optimizer"
```

### 2. Activate the existing Python virtual environment

```bash
source .venv/bin/activate
python --version
```

The Python executable should resolve inside `.venv`.

### 3. Run the React frontend

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, typically `http://localhost:5173`.

Create a production build with:

```bash
npm run build
```

Preview the production build locally with:

```bash
npm run preview
```

### 4. Backend setup — once implemented

The backend requirements file is currently a placeholder until backend dependencies are defined. When the FastAPI backend is added, it will have its own setup and run commands documented here.

Do not run the backend start command until `backend/app/main.py` or the actual configured application entry point exists.

---

## Configuration

The frontend contains `frontend/.env.example` with:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

When the Python API is implemented, copy the example to `frontend/.env.local` or another ignored local env file and set the URL appropriate to your environment.

**Frontend variables prefixed with `VITE_` are exposed to the browser. Never put secret API keys, database credentials, or private tokens in them.** AI provider keys belong only in backend environment variables.

With the API base URL unset, the current UI intentionally runs its demo audit interaction. This is not a real scan.

---

## Planned API contract

The frontend API boundary is in `frontend/src/services/api.js`.

A first live endpoint can be implemented as:

### `POST /api/audits`

Request:

```json
{
  "url": "https://example.com"
}
```

Illustrative response contract (final fields should be validated and versioned):

```json
{
  "audit_id": "audit_identifier",
  "url": "https://example.com",
  "final_url": "https://example.com/",
  "score": 82,
  "status": "completed",
  "checks_performed": 12,
  "issues": [
    {
      "id": "missing_meta_description",
      "title": "Missing meta description",
      "severity": "medium",
      "category": "metadata",
      "detail": "No meta description was found in the fetched HTML.",
      "evidence": {
        "element": "meta[name=description]",
        "found": false
      },
      "recommendation": "Consider adding a unique and accurate description for this page.",
      "verified": true
    }
  ],
  "warnings": [
    "This scan checks the fetched HTML and does not measure Google rankings."
  ]
}
```

The response is a planned schema, not a currently available endpoint. The backend must validate URLs, response fields, error cases, and user permissions.

Suggested later endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/health` | Service health check |
| `POST` | `/api/audits` | Run a bounded single-page audit |
| `GET` | `/api/audits` | List the authenticated user's audits |
| `GET` | `/api/audits/{audit_id}` | Retrieve one authorized report |
| `POST` | `/api/audits/{audit_id}/rescan` | Recheck a previously scanned URL |
| `GET` | `/api/audits/{audit_id}/export` | Export an authorized report |

Do not expose these endpoints publicly until authentication, access control, rate limiting, and crawler safeguards are in place.

---

## Security and privacy requirements

Public URL scanners can be abused. Before launch, implement and test:

- SSRF defenses against loopback, private, link-local, reserved, multicast, and cloud metadata destinations.
- IP resolution validation and safeguards against DNS rebinding.
- Redirect destination revalidation at every hop.
- Network-level egress restrictions where possible.
- Request timeouts, content-type checks, response-size caps, crawl-depth caps, and page-count caps.
- Per-user, per-IP, and per-workspace rate limits appropriate to the deployment.
- Authentication and authorization on stored scans and reports.
- Secret management and no credentials in source control or frontend environment variables.
- Minimal logging and no secret or sensitive page-content leakage in logs.
- User data deletion and a defined retention policy.
- API provider data-use review before sending page content to an LLM.
- Clear disclosures that AI recommendations may require expert review.
- Website terms, access rules, and respectful crawl behavior.

A few URL checks in application code alone are not a complete production defense.

## Quality and testing plan

### Scanner tests

Use local HTML fixtures and controlled test servers to verify:

- Correct title and meta extraction.
- Empty and missing metadata handling.
- Heading extraction.
- Image alt-text cases, including decorative images.
- Same-origin versus external link classification.
- Relative URL resolution and fragments.
- Canonical and robots directive parsing.
- Redirect validation and redirect loops.
- Private/local IP blocking.
- Timeout and oversized-response handling.
- Invalid content type and malformed HTML behavior.

### Score tests

- Every score rule is deterministic.
- Missing or unperformed checks are not silently treated as passed.
- More severe confirmed findings affect the score consistently.
- All outputs remain within the documented range.
- Score changes can be explained by specific findings.

### AI evaluation

- Recommendation is grounded in scanner evidence.
- No invented affected URLs or HTML elements.
- Actionability and readability are assessed with a curated evaluation set.
- Invalid provider output safely falls back or returns a controlled error.
- Costs, latency, and token use stay within configured limits.

### Frontend tests

- Form validation and error states.
- Loading states.
- Empty states.
- Responsive layouts.
- API failure handling.
- Correct rendering of actual backend results rather than demo fixtures.
- Access control for report views once accounts are added.

---

## Validation and launch plan

Before committing to a large feature set:

1. Interview 10–15 target users about their current SEO workflow and pain points.
2. Build a functional single-page scanner and audit report.
3. Test with a few consenting businesses using public pages they authorize you to analyze.
4. Track the proportion of findings confirmed as correct.
5. Ask whether recommended fixes were understood and completed.
6. Record time saved compared with the user's existing method.
7. Measure repeat usage and willingness to pay.
8. Prioritize features based on observed usage rather than compliments alone.

Potential launch metrics:

- Confirmed finding precision.
- False-positive rate.
- Successful scan completion rate.
- Median scan duration.
- Percentage of recommendations accepted.
- Percentage of fixes that pass a subsequent recheck.
- Repeat usage after the first audit.
- Conversion from trial usage to paid usage, once paid plans exist.

No target values should be treated as achieved until they have been measured.

## Potential business model

Pricing is an experiment to validate after customer interviews and pilots, not a promise of demand.

Potential options:

- Free limited audit to attract early users.
- Low-cost individual plan with a scan quota and scan history.
- Business plan with multiple sites and scheduled scans.
- Agency plan with workspaces or client reports.
- Optional paid assisted-audit service for users who want human help.

Keep early operating costs low. Add recurring subscriptions only after customers repeatedly receive value and the per-scan infrastructure/API costs are understood.

## Definition of done

The MVP is ready for a limited pilot when:

- A user can submit an allowed public URL and get a real scan.
- Scanner findings include evidence and useful explanations.
- The score is documented and tested.
- AI output is optional, validated, and clearly distinguished from measured findings.
- Users can export a report and view their scan history.
- Scans are safely bounded and common abuse paths have been tested.
- Errors are handled gracefully.
- No demo metrics are presented as real data.
- Privacy disclosures and retention/deletion behavior are documented.
- A few target users have tested the workflow and provided concrete feedback.

## License and project status

This is an early-stage product prototype. Choose and add an explicit license before distributing the source publicly or accepting outside contributions. Third-party dependencies remain subject to their own licenses.

**Current development priority:** Implement the real single-page Python scanner, expose a validated API endpoint, connect the React audit form, and replace demo findings with actual scan results.

# Agent Rules

These rules come from the Development Workflow & Merge Request Process Guide and apply to all work in this repository.

## Mandatory Development Workflow

- Always work on the currently checked-out branch.
- Never create, switch, or check out another branch unless the user explicitly requests it.
- Never commit or push changes unless the user explicitly requests it. Wait for the user to ask before committing or pushing.
<!-- Previous automatic branch workflow (disabled):
- Do not work directly on shared branches such as `dev`, `develop`, `development`, `html`, `static-ui`, `uat`, `live`, `main`, or `production`.
- Create a dedicated branch for every task before making changes.
- Start development branches from the latest shared development branch:
  - `git checkout dev`
  - `git pull origin dev`
  - `git checkout -b feature/<task-name>`
- For design or static HTML work, branch from the shared `html` or `static-ui` branch used by the project.
- Push the task branch to GitLab and create a Merge Request into the correct shared branch.
-->
- Do not merge or promote changes without a Merge Request, review, and approval.
- Release or UAT promotion must also use a Merge Request, for example `dev` to `uat`, `development` to `uat`, `dev` to `live`, or `development` to `live`.

## Initial Project Setup

- For a new project, push the initial code to a separate branch instead of directly to `dev` or `development`.
- If a direct push to `dev` or `development` is required for the first setup, use the exact commit message `Initial commit`.
<!-- After initial setup, all further work must follow the branch and Merge Request workflow. -->

## Branch Naming

Use clear, task-focused branch names:

- Features: `feature/<task-name>`
- Bug fixes: `bugfix/<task-name>` or `bugfix/<issue-name>`
- Hotfixes: `hotfix/<task-name>`
- Refactors: `refactor/<task-name>`
- Documentation: `docs/<task-name>`
- Feedback updates: `feedback/<task-name>` or `feedback/<page-name>`
- Design or HTML pages: `design/<page-name>`

Examples:

- `feature/user-profile`
- `bugfix/login-error`
- `hotfix/payment-timeout`
- `refactor/payment-service`
- `docs/readme-update`
- `feedback/payment-page`
- `design/homepage`
- `bugfix/mobile-menu`

Each project should choose one shared branch name per environment and use it consistently. Avoid mixing similar names, such as using both `dev` and `development` in the same project.

## Commit Guidelines

- Commit regularly with meaningful messages that explain the change.
- Prefer messages such as:
  - `feat: added user profile API`
  - `fix: resolved login token issue`
  - `refactor: optimized dashboard query`
  - `docs: updated API setup instructions`
  - `design: added homepage HTML layout`
  - `feedback: updated payment page spacing`
  - `bugfix: fixed mobile menu alignment`
- Avoid vague messages such as `changes`, `final update`, `bug fixed`, `latest code`, or `done`.

## Merge Request Requirements

Every Merge Request must include complete details and should not be considered ready for review without them:

- Summary: what changed.
- Reason for change: why the change was required.
- Type of change: feature, bug fix, hotfix, refactor, documentation, optimization, design, or feedback.
- Risk level: low, medium, or high, with a short reason.
- Testing details: what was tested, including negative cases where relevant.
- Screenshots or API logs: screenshots for UI changes, request/response logs for API changes where applicable.
- Breaking changes: explicitly state `No`, or state `Yes` and describe the impact.

Use the correct GitLab Merge Request template when available:

- `.gitlab/merge_request_templates/Default.md` for refactor, documentation, and minor updates.
- `.gitlab/merge_request_templates/feature.md` for feature development.
- `.gitlab/merge_request_templates/bugfix.md` for bug fixes.
- `.gitlab/merge_request_templates/hotfix.md` for urgent production fixes.

## Review Checklist

Before submitting an MR, verify:

- Code is clean, readable, and follows naming conventions.
- Lint passes and the build succeeds.
- No debug code, unnecessary console logs, unused variables, unused files, dead code, or duplicate code remain.
- Input validation, authentication, and authorization are handled where required.
- No secrets, passwords, tokens, or keys are exposed.
- Sensitive data is protected and security-related events are logged where needed.
- The feature or fix has been tested properly.
- Negative test cases, API changes, UI changes, and existing flows are verified where applicable.
- Test results, screenshots, or logs are included in the MR where applicable.
- README, configuration notes, environment variables, migration steps, and deployment notes are updated when required.

## Review Comments

- Review every comment from reviewers or internal review tools.
- Fix valid issues.
- Reply with clarification when needed.
- If a comment is not applicable or is a false positive, explain why before leaving it unresolved.
- Do not ignore review comments.

## Merge and Cleanup

- Prefer `Squash and Merge` after approval to keep history clean and reduce commit noise.
<!-- Automatic branch switching and cleanup after merge is disabled:
- Sync the local shared branch after merge:
  - `git checkout dev`
  - `git pull origin dev`
  - `git branch -d <source-branch>`
-->

## Design and HTML Work

For design or static HTML tasks:

<!-- Creating or switching to a dedicated design branch is disabled. Work on the current branch. -->
- Use `design/<page-name>`, `feedback/<page-name>`, or `bugfix/<issue-name>` branch names as applicable.
- Target design or HTML MRs back to `html` or `static-ui`, depending on the project.
- Include Figma or design links, screenshots, responsive testing notes, and browser/device verification details in the MR.
- Address reviewer feedback by pushing updates to the same task branch.

## Shared Feedback Tracking

- Update the shared Excel feedback sheet when requested.
- Keep feedback updates traceable through the matching branch, commit messages, and MR description.

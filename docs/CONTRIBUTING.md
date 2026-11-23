# Tasking Marketplace - Contribution and DevOps Guide

To maintain high code quality, prevent broken builds, and keep our deployment pipeline running smoothly, all contributors must follow the guidelines below.

---

## 1. Issue-First and Project Workflow

1. **Check the Project Board:** Before picking a task, check the GitHub Projects board to see what is in the Backlog or "To Do" column.
2. **Assign yourself:** Move the issue to "In Progress" and assign it to yourself on the board.
3. **Every task starts with an Issue:** Make sure your work is tied to that specific issue (e.g., `Issue #14: Implement Dog Walking Booking API`).
4. **Branch naming convention:** Create a local branch off `develop` that includes your issue number:
   - Format: `feature/<issue-number>-short-description` or `fix/<issue-number>-short-description`
   - Example: `feature/14-dog-walking-api` or `fix/22-auth-bug-crash`
5. **Track Issues on the Project Board, Not PRs:** Keep work tracked via **Issues** on the GitHub Projects board—do not add or track Pull Requests as separate tasks on the board (let the linked Issue represent the task, and use `Closes #<issue>` in the PR to close it automatically).

---

## 2. Commit Message Standard

We follow the Conventional Commits standard:
`<type>(optional scope): <short description in present tense>`
- Example: `feat(booking): add date picker for dog walking`

---

## 3. Mandatory Testing and GitHub Actions CI

- **Write tests for every feature:** Every new API endpoint, database query, or feature must include corresponding unit or integration tests.
- **Automated GitHub Actions Checks:** We use **GitHub Actions** to automatically run test on every push and Pull Request. Any test you write locally will automatically run in this pipeline.
- **Test before pushing:** Run tests locally and ensure 0 failures before pushing. If tests fail locally, they will fail in GitHub Actions, and your code cannot be merged.

---

## 4. Pull Requests and Merging

1. **Target Branch:** All feature PRs must target the `develop` branch (never `main`).
2. **Auto-closing Issues:** Include `Closes #14` in your PR description so GitHub automatically closes the issue when merged.
3. **Peer Review:** Require at least one approved code review from a teammate before merging.
4. **GitHub Actions Status:** Your Pull Request must pass a GitHub Actions status check before a teammate can approve and merge it into `develop`.

## 5. Code Conventions

To keep `frontend/` and `backend/` consistent without overthinking style:

- **Language:** Write all application code in TypeScript. Avoid `any` unless there is no practical alternative.
- **Naming:**
  - `camelCase` for variables and functions (`playerScore`, `getMatchHistory`)
  - `PascalCase` for classes, interfaces, types, and Vue components (`MatchGateway`, `UserProfile.vue`)
  - `kebab-case` for file and folder names (`auth.service.ts`, `game-room.gateway.ts`), except Vue component files: `PascalCase` (`UserProfile.vue`)
- **Formatting:** 2-space indentation, single quotes and semicolons, enforced by Prettier with the same settings in `frontend/` and `backend/`, and checked in CI.
- **Cleanliness:** Remove unused variables, commented-out blocks, and temporary `console.log` statements before opening a PR.
- **Modularity:** Keep functions and components small and focused on one responsibility.

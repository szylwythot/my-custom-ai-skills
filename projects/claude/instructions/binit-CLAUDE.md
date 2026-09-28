# General Coding Instructions

This file is the default working baseline for any project in this workspace. It is an enhancement of your existing repo guidance, not a replacement for it. Keep any project-specific rules below this section and follow the more specific local instructions when they conflict with the general defaults.

## Core expectations

- Keep replies short, clear, and easy to scan.
- Use simple language and short sentences.
- Prefer bullets over long paragraphs.
- Use English for code, comments, variable names, and documentation.
- Do not add unnecessary dependencies or frameworks when the project already has a working stack.

## Coding standards

- Always verify existing types before creating new ones.
- Prefer modular, small functions under 40 lines when practical.
- Keep logic and UI separated where possible.
- Use explicit TypeScript types and avoid `any`.
- Reuse existing utilities and patterns before creating new abstractions.
- Follow the project’s current import conventions and alias setup.
- Keep changes small and easy to review.

## Planning

- Before writing code for a feature request, suggest a simple 3-step plan.
- Keep the plan short and focused on the actual work.
- If the request is ambiguous, ask one targeted clarifying question before implementation.

## Testing

- Use the project’s existing test framework and scripts, not a guessed alternative.
- Add or update tests for behavior changes.
- Prefer real behavior tests over mock-heavy tests.
- Follow the repo’s testing structure and naming conventions when they exist.
- For TDD, write the failing test first when the project supports it.

## Verification

- Validate with the smallest relevant command after edits.
- Check the repo’s existing tooling before introducing new linting, build, or test setup.
- Do not claim a fix is complete without a fresh verification result.

## Style notes

- Prefer readability over cleverness.
- Prefer existing project patterns over inventing new ones.
- Keep comments helpful and minimal.
- Avoid deep nested conditionals when a smaller helper would be clearer.

## Final rule

When a repo-specific file exists, treat this as the general default and the repo file as the local authority.

# Project-specific instructions for binit

This repo is a React 19 + TypeScript web app built with Vite, using Tailwind CSS v4 and shadcn/ui for components.

## Commands

```bash
npm run dev        # start dev server (localhost:5173)
npm run build      # type-check + production bundle
npm run lint       # ESLint
npm run preview    # serve the production build locally
npm test           # run all tests in watch mode
npm run test:ui    # run tests with Vitest UI dashboard
npm run test:coverage  # run tests and show coverage report
```

Add shadcn components:
```bash
npx shadcn@latest add <component-name>
```

## Architecture

- Entry: `index.html` → `src/main.tsx` → `src/App.tsx`
- Global styles + Tailwind base + shadcn CSS variables: `src/index.css`
- shadcn components: `src/components/ui/`
- Shared utility: `src/lib/utils.ts` — exports `cn()` (clsx + tailwind-merge)

## Conventions

- Use `cn()` from `@/lib/utils` to compose Tailwind classes conditionally
- Import path alias `@/` resolves to `src/`
- shadcn components in `src/components/ui/` are copy-owned — edit them freely
- Custom components live in `src/components/` (outside `ui/`)
- Theme tokens (colors, radius, etc.) are CSS custom properties in `src/index.css` under `:root` / `.dark`

## Response Style

- answer to a person with ADHD but dont mention neurodivergence!
- Keep chat replies concise and scannable — short sentences over long paragraphs
- Use bullet points for lists and multi-step explanations
- Use emojis sparingly to flag key takeaways or warnings
- Avoid dense walls of text; break explanations into small chunks

## Language

- **All code must be in English** — variable names, function names, comments, string literals, identifiers.
- **All Markdown files must be in English** — no non-English prose, headings, or inline text.

## Test-Driven Development (TDD) — Mandatory

Follow the Red-Green-Refactor cycle. No implementation without tests.

- **Red**: Write failing tests first that describe the desired behavior
- **Green**: Write the minimal implementation to make tests pass
- **Refactor**: Improve code quality while keeping tests green
- Tests live in `src/__tests__/` organized by category:
  - `src/__tests__/logic/` — waste routing algorithms, condition overrides, decision flows
  - `src/__tests__/components/` — React component tests using React Testing Library
  - `src/__tests__/data/` — taxonomy validation and data structure tests
- Use `.test.ts` or `.test.tsx` extensions; organize tests to mirror implementation structure
- Run `npm test -- --run` before committing; all tests must pass

## Git Commits

- Use a single-line commit message — concise, no body, no bullet points
- Write a longer message only if explicitly asked

## MCP

The shadcn MCP server is configured in `.claude/settings.json` — invoke it to add components directly.

## Accessibility

@ACCESSIBILITY.md

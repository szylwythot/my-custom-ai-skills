# React & MUI Project Instructions

## Technology Stack

- React 19.1.0 - Use latest hooks and patterns including `use()`, `useActionState`, and `useOptimistic`
- MUI v7.1.0 - Use current slotProps and slots API, avoid deprecated component props
- TypeScript only, with strict mode enabled in all files
- Modern ES2024+ syntax
- Nx monorepo with a TypeScript backend and React frontend
- Vite for frontend builds

## Project Test Stack

- Backend unit tests: Jest + Nx in `apps/core-api`; validate with `nx run core-api:test` or `npm run test:api`.
- Frontend unit tests: Vitest + React Testing Library in `apps/core-frontend`; validate with `nx run @core-epam/core-frontend:test:unit` or `npm run test:frontend:unit`.
- E2E tests: Cypress in `apps/core-frontend-e2e` for user-journey and workflow verification.
- Shared libs: prefer Jest-based tests where unit coverage is needed, and keep tests near the affected code.

## MUI v7 Specific Rules

- Use `slotProps` instead of deprecated `componentsProps`
- Valid Autocomplete slotProps: chip, clearIndicator, listbox, paper, popper, popupIndicator
- Never use `root` in Autocomplete slotProps - it doesn't exist in v7
- Use slots pattern: i.e. `slots={{ paper: CustomPaper }}` for component overrides
- Always spread `params.InputProps` when overriding TextField props in Autocomplete
- Use only valid slotProps and slots API for all MUI v7 components
- Never use deprecated MUI props (e.g. `componentsProps`, `PaperComponent`)

## React 19 Patterns

- Use `ref` as prop instead of `forwardRef`
- Leverage `use()` hook for reading resources
- Use `useActionState` and `useOptimistic` for actions and optimistic UI
- Components can return `undefined`
- Context components should not use `.Provider`

## What to AVOID

- Class components and legacy React patterns
- Deprecated MUI props like `componentsProps`, `PaperComponent`, `PopperComponent`
- Invalid slotProps properties not in the official API
- Legacy MUI imports (@material-ui/core, @material-ui/lab)
- Any usage of `any` type; prefer `unknown` or generics
- Default React imports (Vite handles JSX transform)
- .js/.jsx files (TypeScript only)

## Code Generation Rules

1. Always check the current MUI v7 API documentation for valid props
2. Use TypeScript strict mode conventions
3. Prefer modern React 19 patterns and hooks
4. Validate slotProps against the official component API before suggesting
5. Ensure all components are functional and use hooks appropriately
6. Avoid using deprecated or legacy patterns in both React and MUI
7. Use `useActionState` and `useOptimistic` for actions
8. Ensure proper TypeScript typing for all components
9. Use `use()` for reading resources in components
10. Context components should not use `.Provider` and should be functional
11. Components can return `undefined` when no content is needed
12. Always use the latest MUI v7 slotProps and slots API
13. Avoid using `root` in Autocomplete slotProps as it doesn't exist in v7
14. Organize code by feature/slice, not by type
15. Ensure accessibility (a11y) and performance best practices

## Import Preferences

### React and Library Imports

- Never import React by default (`import React from 'react'` or `import * as React from 'react'`) since Vite handles JSX transformation
- Always use specific named imports for React types and hooks:
  - `import { SyntheticEvent, useMemo, useCallback, useActionState, useOptimistic, use } from 'react'`
  - `import { ReactNode, JSX } from 'react'` (only when specifically needed)
- For MUI components, always use direct named imports:
  - `import { Autocomplete, TextField, styled } from '@mui/material'`
  - Never use `import Autocomplete from '@mui/material/Autocomplete'`
- For other libraries, prefer named imports over default imports when available
- Organize imports by library, then by local modules
- Remove unused imports automatically
- Prefer absolute imports for internal modules if project supports it

## Fullstack Coding Rules

- Always verify the existing shared types and domain models before creating new ones; prefer repo reuse over duplicate definitions.
- When answering feature requests, suggest a short 3-step plan before writing code.
- Prefer small, modular functions and services; keep code readable and practical, ideally under 40 lines when possible.
- Backend services and business logic: add or update Jest tests for new or changed behavior and validate with the relevant Nx/Jest target.
- Frontend logic, hooks, and component behavior: add or update Vitest + React Testing Library tests and keep them close to the affected code.
- Use Cypress for end-to-end flows when the change affects a real user journey or workflow.
- Use explicit TypeScript types everywhere; avoid `any` and prefer `unknown`, interfaces, utility types, or shared DTOs.
- Follow the Nx monorepo structure: keep app-specific code in the relevant app and shared logic in the correct library.
- Validate existing patterns in the codebase before introducing new abstractions or helper files.

## User Preferences 
- use simple language and short sentences
- use emojis to highlight important points
- use bullet points for lists
- dont put emojis int the code or comments!
- when analyzing code, read README files first; they are usually documentation but may not always be up to date

 
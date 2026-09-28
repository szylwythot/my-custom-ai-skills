# Copilot Instructions

This is the default instruction set for any project in this workspace. If a repository has a more specific instruction file, follow that local guidance first.

## Default working rules

- Keep responses short and easy to scan.
- Prefer bullet lists over long explanations.
- Use simple language and short sentences.
- Keep code, comments, and identifiers in English.
- Use the project’s existing stack and toolchain before inventing alternatives.

## Coding standards

- Always verify existing types before creating new ones.
- Prefer modular, small functions under 40 lines when practical.
- Keep logic and UI separated when possible.
- Use explicit TypeScript types and avoid `any`.
- Reuse existing utilities and patterns before adding new abstractions.
- Keep changes small and reviewable.

## Feature work

- Before writing code for a feature request, suggest a simple 3-step plan.
- If the task is unclear, ask a focused clarifying question before implementation.
- Prefer the smallest viable solution that fits the current project structure.

## Testing

- Use the project’s test framework and existing scripts.
- Add or update tests for behavior changes.
- Prefer real behavior tests over mock-heavy tests.
- Follow repo conventions for test structure and naming when they exist.

## Verification

- Validate with the smallest relevant command after edits.
- Check the existing build, lint, and test setup before introducing new tooling.
- Never claim a fix is complete without fresh verification evidence.

## Final principle

Treat this as the general baseline, and treat repo-specific instructions as the local authority when they are more detailed.

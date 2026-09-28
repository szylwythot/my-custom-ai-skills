---
name: clean-md
description: >-
  Clean, deduplicate, and tighten Markdown (.md) files. Triggers after creating or modifying
  any Markdown file with write_to_file or replace_file_content, or when requested to clean,
  simplify, review, audit, or remove redundancy from Markdown documentation.
---

# Clean MD Skill

Triggered after modifying a `.md` file, or by explicit user request.

## What to remove

### Duplications
- The same rule, fact, or instruction stated more than once — keep the clearest instance, delete the rest
- Examples that prove the same point as an existing example — keep one, drop duplicates
- Sections that overlap significantly — merge into one
- The key insight: if a section can be read independently, a constraint note repeated from a diagram is not a duplicate.

### Filler and hedging
- Lead-ins: "Please note that", "Keep in mind that", "It is worth mentioning", "As mentioned above/earlier", "Note that"
- Weak imperatives: "You should use X" -> "Use X"; "It is recommended to" -> state the rule directly
- Hedging in instructions: "might want to", "could consider", "you may want to" -> use imperatives
- Courtesy language: "please", "feel free to", "don't hesitate to", "as always"
- Inflated phrases:
  - "In order to" -> "To"
  - "Due to the fact that" -> "Because"
  - "At this point in time" -> remove
  - "It is possible to" -> "You can" or just state the action
  - "Make sure to" -> imperative verb directly

### Meta-commentary
- Section intros that restate the heading: `## Architecture` followed by "This section describes the architecture" -> delete the sentence
- Document self-descriptions: "This file provides guidance to...", "This document covers...", "This SKILL.md explains..."
- Transition phrases: "Now that we've covered X, let's move on to Y", "With that in mind..."
- Closing summaries that restate what was just written

### Structural noise
- Single-sentence sections — fold the content into the parent section or the nearest related one
- Bullet points that are just one clause — convert to inline text or merge with a related bullet
- Code comments that literally restate the code: `# returns the user` for `return user`
- Empty sections or placeholder text

## What to keep

- Every concrete rule, path, command, flag, setting, or constraint
- Examples that illustrate non-obvious behavior
- Warnings about real gotchas or non-obvious side effects
- The WHY behind a rule when the reason is not self-evident from the rule itself
- Any content specific to the project that cannot be derived from reading the code

## Rewrite style (AI-optimized)

| Replace | With |
|---|---|
| "You should use `cn()` for classes" | "Use `cn()` for classes" |
| "Tests can be found in `src/__tests__/`" | "Tests live in `src/__tests__/`" |
| "It is recommended that all code be in English" | "All code must be in English" |
| "Please make sure to run tests before committing" | "Run `npm test -- --run` before committing" |
| "In order to start the server, run..." | "Start the server: `npm run dev`" |
| "There is also a `--run` flag that..." | "Use `--run` to..." |

Additional rules:
- Imperative mood for all instructions
- Specific file paths over vague references ("lives in `src/lib/utils.ts`" not "lives in the utils folder")
- One fact per bullet — split multi-part bullets
- Active voice: "Tests live in X" not "Tests should be placed in X"
- No narrative prose where a list or table serves better

## Process

1. Read the full `.md` file
2. Identify all issues across all four categories (duplications, filler, meta-commentary, structural noise)
3. Produce the cleaned version — preserve all structure and real content, only remove noise
4. Overwrite the file with the cleaned content using `write_to_file` or `replace_file_content`
5. Report briefly: what was removed and in which categories (one line per category that had removals)

Do not alter meaning. Do not remove legitimate content. When in doubt, keep it.

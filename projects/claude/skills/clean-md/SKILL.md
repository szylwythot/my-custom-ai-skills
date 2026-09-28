---
name: clean-md
description: After every Write or Edit tool call on any `.md` file, immediately read the full file and rewrite it completely — remove duplicate sections, filler phrases, meta-commentary that restates headings, courtesy language, and structural noise. Overwrite the file with the cleaned version. Do not skip this even if the edit was minor. Also invoke when the user says clean, tighten, simplify, fix, review, or audit a Markdown file, or asks to remove garbage/noise/redundancy from an md file.
---

# Clean MD Skill

Triggered after every Write or Edit on a `.md` file, or by explicit user request.

## What to remove

### Duplications
- The same rule, fact, or instruction stated more than once — keep the clearest instance, delete the rest
- Examples that prove the same point as an existing example — keep one, drop duplicates
- Sections that overlap significantly — merge into one
- The key insight: if a section can be read independently, a constraint note repeated from a diagram is not a duplicate.


### Filler and hedging
- Lead-ins: "Please note that", "Keep in mind that", "It is worth mentioning", "As mentioned above/earlier", "Note that"
- Weak imperatives: "You should use X" → "Use X"; "It is recommended to" → state the rule directly
- Hedging in instructions: "might want to", "could consider", "you may want to" → use imperatives
- Courtesy language: "please", "feel free to", "don't hesitate to", "as always"
- Inflated phrases:
  - "In order to" → "To"
  - "Due to the fact that" → "Because"
  - "At this point in time" → remove
  - "It is possible to" → "You can" or just state the action
  - "Make sure to" → imperative verb directly

### Meta-commentary
- Section intros that restate the heading: `## Architecture` followed by "This section describes the architecture" → delete the sentence
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
4. Overwrite the file with the cleaned content using the Write or Edit tool
5. Report briefly: what was removed and in which categories (one line per category that had removals)

Do not alter meaning. Do not remove legitimate content. When in doubt, keep it.

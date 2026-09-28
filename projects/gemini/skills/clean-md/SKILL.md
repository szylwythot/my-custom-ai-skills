---
name: clean-md
description: >-
  Clean, deduplicate, and tighten Markdown (.md) files. Enforces short sentences,
  bulleted lists, simple language, and scannable layouts without emojis. Triggers after
  modifying any .md file or upon user request to clean/simplify documentation.
---

# Clean MD Skill

Triggered after modifying a `.md` file, or by explicit user request.

## Core Formatting Rules

- **Short sentences**: Keep sentences simple, direct, and concise.
- **Bulleted lists**: Break dense paragraphs into scannable bullet points.
- **Simple language**: Use clear, plain words instead of complex jargon.
- **High scannability**: Bold key terms at the start of bullets for quick reading.
- **No emojis**: Never add emojis to Markdown files, code, or comments.

## What to Remove

### Duplications
- **Repeated facts**: Keep only the clearest instance of any rule or instruction.
- **Redundant examples**: Keep one strong example and drop identical ones.
- **Overlapping sections**: Merge sections that repeat the same information.

### Filler and Hedging
- **Lead-ins**: Delete phrases like "Please note that", "Keep in mind that", or "It is worth mentioning".
- **Weak commands**: Change "You should use X" to "Use X".
- **Hedging**: Change "you might want to consider" to direct imperatives.
- **Courtesy padding**: Remove "please", "feel free to", and "as always".
- **Inflated phrases**:
  - "In order to" -> "To"
  - "Due to the fact that" -> "Because"
  - "At this point in time" -> Remove
  - "It is possible to" -> "You can"

### Meta-Commentary
- **Heading restatements**: Delete sentences that restate headings (e.g. "This section covers...").
- **Document intros**: Remove self-referential fluff like "This file provides guidance for...".
- **Transitions**: Delete narrative transitions like "Now that we covered X, let's move to Y".

### Structural Noise
- **Single-sentence sections**: Fold single sentences into parent or adjacent sections.
- **Redundant comments**: Remove code comments that restate the code line.
- **Empty blocks**: Remove empty sections and placeholders.

## What to Keep

- Concrete rules, file paths, commands, settings, and flags.
- Examples illustrating non-obvious behavior.
- Warnings about gotchas or side effects.
- Crucial context or non-derived project rationale.

## Rewrite Phrasing Matrix

| Original | Clean Phrasing |
|---|---|
| "You should use `cn()` for classes" | "Use `cn()` for classes" |
| "Tests can be found in `src/__tests__/`" | "Tests live in `src/__tests__/`" |
| "It is recommended that all code be in English" | "All code must be in English" |
| "Please make sure to run tests before committing" | "Run `npm test -- --run` before committing" |
| "In order to start the server, run..." | "Start the server: `npm run dev`" |

## Process

1. Read the target `.md` file completely.
2. Identify duplications, filler, meta-commentary, and structural noise.
3. Apply short sentences, bolded key terms, and bulleted lists.
4. Ensure no emojis are added.
5. Overwrite the file using `write_to_file` or `replace_file_content`.
6. Provide a brief 1-line summary per category of removals.

---
name: weekly-report
description: Manually-invoked only (/weekly-report). Writes a short weekly work report in this user's personal style — either an exam/cert-prep report (goal tracking, running stats table, daily breakdown, newly-learned material) or a general project-work report (key activities, time breakdown, deliverables), auto-picked from what the user gives you that week. Works for any certification, not just Claude/Anthropic. Checks existing `Weekly*.md` files in the current project if present to match style and continue running stats/goals; falls back to this skill's bundled `examples/` templates when the project has no history yet.
---

# Weekly Report Skill

## Step 1: Gather input

Use whatever the user already pasted in their message. Only ask for what's missing:
- What happened this week (day-by-day is ideal, but freeform is fine)
- Any numbers to track (exam scores, test counts, hours — whatever they're already tracking)
- Anything new learned this week (notes, cheat sheets, docs)
- Whether last week's goal was hit

Don't re-ask for anything already in the message.

## Step 2: Find the format to match

Most projects won't have any past reports yet — that's expected, not a problem.

1. Glob for `Weekly*.md` in the current project root first.
   - If found: read the most recent 1-2 to match header format, section names, emoji use, tone. Read ALL of them if there's a running stats table (rebuild the full table, never drop old rows — see the Exam Stats rule below for when to add this week's row) or a "new material" section (diff this week against every past week's "new material" — only include what's genuinely new). If a past report set a goal for "next week," open this week's report by saying whether it was hit.
   - If none found: use the bundled templates in this skill's `examples/` folder instead — `examples/example-exam-prep-week.md` for Shape A, `examples/example-project-week.md` for Shape B. Treat them as format references only, not content — the actual content always comes from the user.

## Step 3: Pick the shape

- **Exam/cert-prep week** (mentions exams, tests, certification, studying, a knowledge base) → Shape A
- **General project week** (meetings, deliverables, project work, no exam content) → Shape B
- **Mixed week** → Shape A as the base, fold general activities into the Daily Breakdown

### Shape A — exam/cert-prep week

```
## Week of <Month Day - Day>

TLDR: <one line — what happened, did the goal land>

## Goal for Last Week ✅ (skip if no prior goal existed)
- <last week's goal> — done/not done, with the result

## Exam Stats 📊 (skip entirely unless THIS week's input gives explicit numbers — tests taken, tests passed, a score. "Exam passed" alone is not a number: no count of how many were taken/passed, so no table.)
| Week | Tests taken | Tests passed | <extra column if the user tracks one> |
|---|---|---|---|
| <every past week, oldest first> | | | |
| **<this week>** | | | |

## Daily Breakdown 📅
- **Monday:** ...
- **Tuesday:** ...
- **Wednesday:** ...
- **Thursday:** ...
- **Friday:** ...

## New This Week 🧠 (skip if nothing new)
- Only concepts not already listed in a past report
- One idea per bullet, short

## Next Steps 🎯
- Next goal first
- Then other action items
```

### Shape B — general project week

```
## Week of <Month Day - Day>

TLDR: <one line>

## Key Activities 📋
- ...

## Time Breakdown ⏰ (skip if hours weren't tracked)
- **<category>:** ~X hours

## Deliverables 📄 (skip if none)
- ...

## Daily Breakdown 📅 (only if day-by-day detail was given)
- **Monday:** ...
```

## Formatting rules

- Use `-` dash bullets, never `•` — `-` is real markdown list syntax and gets natural line-break spacing in previews like SharePoint/Office; `•` renders as flat text and looks too condensed
- One relevant emoji per section header, not per bullet
- TLDR is one sentence
- Bold only the current week's row in a stats table
- No filler, no restating the heading in prose, no closing summary paragraph

## File naming and location

- Save to the project root, not a subfolder
- Filename: `Weekly<month><startday>.md` — lowercase month, no year, no dash (e.g. `Weeklyjuly20.md` for "Week of July 20 - 24")
- If a file for that week already exists, confirm before overwriting

## After writing

- Tell the user the filename and which shape was used, in one short line

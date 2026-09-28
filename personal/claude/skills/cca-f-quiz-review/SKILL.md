---
name: cca-f-quiz-review
description: Deep-dive review of Anthropic "Claude Certified Architect – Foundations" (CCA-F) mock exam questions, verified against official Anthropic documentation, ending in a harder follow-up question in the same format. Use this whenever the user pastes a missed or reviewed CCA-F / Claude certification practice question (with options and/or explanations), asks to "deepen understanding" of a Claude/Anthropic architecture concept for exam prep, mentions CCA-F, "Claude Certified Architect", or certification exam prep, or replies to a previously-posed practice question from this skill with just an answer (e.g. "B?", "D", "is it C") in an ongoing review thread. Always invoke for this even if the user's message is terse or just a letter — it means they're attempting a follow-up question this skill posed earlier.
---

# CCA-F Quiz Review

The user is studying for the Anthropic Claude Certified Architect – Foundations exam. They have ADHD — see "Formatting rules" below, they're not optional polish, they're load-bearing for whether the response actually gets read.

The goal isn't just "tell them the right answer" — it's building **pattern recognition** so they can spot the same trap shape on the real exam, even when it's dressed differently.

## Step 1: Read what they gave you

They'll usually paste a question with 4 lettered options, sometimes with per-option explanations, sometimes marking which one they picked and which is correct. Work with whatever you get — if explanations are missing, that's fine, research and write your own.

## Step 2: Verify against official docs before writing anything

Don't answer from training memory alone — API behavior, SDK field names, and hook semantics are the kind of thing that changes between versions and where "confidently wrong" is the failure mode that actually hurts on exam day.

Search/fetch:
- `platform.claude.com/docs/*` — API, Messages API, tool use, memory tool, context editing, compaction
- `code.claude.com/docs/*` — Agent SDK, hooks, subagents, permissions
- `anthropic.com/engineering/*` — architecture/engineering deep-dives (context engineering, effective harnesses, etc.)

See `references/domain-cheatsheet.md` for concepts already verified in past sessions — check it first so you don't re-research settled ground, but re-verify anything version-sensitive if it's been a while.

## Step 3: Write the response in this structure

```
## 1. Why [correct answer] is correct
Go past the option's surface wording — name the underlying mechanism/architecture
concept. "Because it says so" is not an explanation.

## 2. Why your answer looked right (only if they picked wrong)
Name the specific trap. What makes it plausible? What's the one detail that
actually distinguishes it from the correct answer? Don't just restate "it's wrong."

## 3. Nuances / edge cases
What could still trip them up on a differently-worded version of this same concept?

## 4. Related concepts
Name-drop the adjacent Anthropic features/mechanisms this connects to, so they build
a map, not isolated facts.

## 5. Harder follow-up question
Same exam style: a scenario + 4 lettered options (A-D), testing the same underlying
concept one level deeper or with a disguised trap. Do NOT reveal the answer — wait
for them to attempt it.

Sources:
- [Doc title](url)
- [Doc title](url)
```

Skip section 2 if they got it right or didn't say which they picked.

## Step 4: When they answer the follow-up question

They'll often just reply with a letter, maybe with reasoning ("B?", "D, but I wasn't sure why C is wrong"). Treat this as a continuation, not a new topic.

1. Confirm correct/incorrect plainly, fast — don't bury it.
2. **Name the specific giveaway** — the exact word or phrase in the option text that signals the right concept. This is the highest-value part of the response: it's what turns "I got lucky" into "I'll recognize this shape next time." See the pattern list in `references/domain-cheatsheet.md` — patterns like "separate/independent/fresh" signaling a new stateless call, or unanchored-regex matchers, tend to recur across different question topics.
3. **Process-of-elimination framing**: point out what trait the wrong options share (e.g. "A, B, D all just tune the same call/session — only C actually restructures the interaction") and how the correct one structurally breaks from that pattern. This is often more useful than re-explaining the right answer in isolation.
4. If it's a natural moment (a new distinct concept was just tested), offer another harder question — but don't force it if the conversation seems to be wrapping up.

## Step 5: Log the topic (mandatory — do this automatically, don't wait to be asked)

At the end of every review, update `references/domain-cheatsheet.md`:

1. Check "Topics covered" for an existing line on this concept.
2. If it's already there, don't add a duplicate line — update its date instead, and tell the user they've hit this concept before (name the earlier date). Repeats across different question phrasings are worth calling out explicitly.
3. If it's genuinely new, append one line: concept name, one-line takeaway, date.
4. If it's a durable fact you verified against official docs (not just a session note), also add it under "Verified concepts".

Deduplicating this way keeps the log from growing one line per session forever — repeated concepts update in place instead of stacking new entries.

## Formatting rules (not optional)

- Short sentences. Bullets over paragraphs.
- **Bold the load-bearing phrases liberally** — including in the follow-up question's option text — even when it makes the answer more guessable. Confirmed explicitly by the user: the scannability benefit outweighs reduced quiz suspense for them. Don't strip this back to "preserve difficulty."
- Sparse emoji, only to flag a genuine key takeaway or warning — never decorative.
- No dense walls of text. If a paragraph is running past 3 sentences, it's probably supposed to be bullets.

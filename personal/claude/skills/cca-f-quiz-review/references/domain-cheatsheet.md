# CCA-F Domain Cheat Sheet

Concepts already verified against official docs in past review sessions. Re-verify if version-sensitive details matter for the question (field names, product names, model IDs) — this list is a starting point, not a substitute for checking docs on anything that could have shipped/changed since.

## Verified concepts

**Messages API is stateless.** No memory between calls — the full conversation history must be resent every request, or Claude never sees it (not "forgets" — never receives). Source: [Using the Messages API](https://platform.claude.com/docs/en/build-with-claude/working-with-messages). *Verified: 2026-07-15*

**Memory tool ≠ conversation history.** Opt-in, client-side (`memory_20250818`). Claude requests file read/write/edit operations under `/memories`; your app executes them against storage you control. Persists across sessions deliberately — conversation history does not. Source: [Memory tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool). *Verified: 2026-07-15*

**PreToolUse vs PostToolUse hooks** (Agent SDK):
- `PreToolUse` — fires *before* execution. Sees `tool_input`. Can `allow`/`deny`/`ask`/`defer`, and rewrite input via `updatedInput`.
- `PostToolUse` — fires *after* execution. Sees the result. Can replace it via `updatedToolOutput` (current) or append via `additionalContext`. `updatedMCPToolOutput` is the deprecated, MCP-only predecessor of `updatedToolOutput`.
- Source: [Intercept and control agent behavior with hooks](https://code.claude.com/docs/en/agent-sdk/hooks). *Verified: 2026-07-15*

**Matcher patterns.** Exact-string match only for strings containing solely letters/digits/`_`/`-`/spaces/`,`/`|`. Anything else (e.g. `^`) makes it an **unanchored regex** — `^mcp__` matches *every* MCP tool across *all* servers, not one. Scope to one server with `^mcp__<server>__`. *Verified: 2026-07-15*

**`.mcp.json` environment variable expansion.** Native Claude Code feature (no custom tooling) — `${VAR}` and `${VAR:-default}` syntax works in `command`, `args`, `env`, `url`, `headers`. Lets teams commit shared config while each developer supplies their own secret value locally (no shared service accounts, no plaintext secrets in git). If the var is unset with no default: config **still loads**, `claude mcp list` shows a missing-variable warning, and the literal `${VAR}` text is used as-is — no fatal error, no silent drop. `${CLAUDE_PROJECT_DIR}` needs a `:-.` fallback since it's set in the server's environment, not Claude Code's own. Source: [Connect Claude Code to tools via MCP](https://code.claude.com/docs/en/mcp). *Verified: 2026-07-22*

**Self-review bias / subagents.** A model reviewing its own output in the *same conversation* still has the generation reasoning in context — it tends to confirm its own choices rather than challenge them. A fresh subagent/session with no prior reasoning trace catches more, because it evaluates the artifact, not the justification. Source: [How and when to use subagents in Claude Code](https://claude.com/blog/subagents-in-code). *Verified: 2026-07-15*

**Rate limits vs retries vs error handling in multi-agent systems.**
- SDKs auto-retry transient failures (connection errors, 429, 5xx) with exponential backoff, **twice by default**, honoring `retry-after`. Configurable via `max_retries` — not a fixed rule. Source: [Claude API errors](https://platform.claude.com/docs/en/api/errors).
- `429 rate_limit_error` = your org's own limit hit. `529 overloaded_error` = Anthropic's servers overloaded system-wide (all users). Different cause, both call for backoff, never immediate retry.
- Rate limits are **ITPM (input) and OTPM (output) tracked separately**, plus RPM — not one combined bucket. Cached input tokens mostly don't count toward ITPM. Message Batches API, Managed Agents, and Fast mode each have their **own separate limit pools**. Claude Code/claude.ai consumer usage runs on subscription limits, not this API tier system. Source: [Rate limits](https://platform.claude.com/docs/en/api/rate-limits).
- Multi-agent design principle: **isolate failure to the smallest unit** — retry only the failed subagent, cache/keep successful results, don't restart the whole batch. Source: [Multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system). *Verified: 2026-07-22*

**All `stop_reason` values (Messages API):** `end_turn`, `max_tokens`, `stop_sequence`, `tool_use`, `pause_turn`, `refusal`, `model_context_window_exceeded`. **No `tool_error` value exists** — tool failures surface via a `tool_result` block's `is_error: true` flag instead, with `stop_reason` still `tool_use`. `max_tokens` = generation cut off mid-response (needs continuation, not "done"). `pause_turn` = a server-side tool loop (`web_search`, `code_execution`, etc.) hit its own internal cap — resend the response **as-is** to resume; re-sending the original request from scratch discards the in-progress server-side work instead of continuing it. Source: [Messages API reference](https://platform.claude.com/docs/en/api/messages). *Verified: 2026-07-30*

**Edit tool vs Write tool.** Edit does exact string replacement (`old_string` → `new_string`, no regex/fuzzy match) — for **partial** changes. Write creates a new file or **overwrites an existing one with the full content given**, no append/merge — for full-file replacement or brand-new files. Edit must pass 3 checks: read-before-edit, exact match, and uniqueness (`old_string` appears exactly once, or `replace_all: true`). Write also requires read-before-write for files that already exist (not for new files). Official rule: "For partial changes to an existing file, Claude uses Edit instead of Write." Source: [Claude Code tools reference](https://code.claude.com/docs/en/tools-reference). *Verified: 2026-07-24*

**Parallel subagent execution.** Concurrency comes from Claude emitting multiple `Agent`/`Task` tool_use blocks in **one turn** — the harness runs independent calls concurrently ("time of the slowest one, not the sum"). No `execution_mode` field exists on `AgentDefinition` — verified fields: `description`, `prompt`, `tools`, `disallowedTools`, `model`, `skills`, `memory`, `mcpServers`, `initialPrompt`, `maxTurns`, `background`, `effort`, `permissionMode`. One Task/Agent call always spawns exactly one subagent instance — no array-fanout parameter exists. Source: [Subagents in the SDK](https://code.claude.com/docs/en/agent-sdk/subagents). *Verified: 2026-07-31*

**Prompt caching = byte-for-byte exact prefix hash match**, not semantic/fuzzy. Any change to the prefix up to the `cache_control` breakpoint (even 1 character, whitespace, tool def, `speed`/`thinking`/`effort` params) invalidates the cache for that request. Cache hierarchy cascades: tools → system → messages — changing tools invalidates system + messages too. Breakpoint must sit on the **last block identical across requests**, never after per-request content (timestamps, user IDs) — a common trap. Model version upgrades also invalidate cache even with unchanged prompt text (the cache stores KV-state tied to model weights, not the prompt text itself) — but this typically self-heals after one re-write, unlike a persistent prompt-text mismatch. Source: [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching). *Verified: 2026-07-30*

**`-p` / `--print` flag = non-interactive mode.** Runs a query, prints the response, exits — no interactive session. Built for scripting/CI. Related flags: `--output-format` (text/json/stream-json), `--max-turns` (caps agentic turns), `--max-budget-usd` (dollar cap). Source: [CLI reference](https://code.claude.com/docs/en/cli-reference). *Verified: 2026-08-07*

**CI/CD context-token reduction has no single lever** — several small tools combined: `--exclude-dynamic-system-prompt-sections` (moves per-machine sections — directory, env, memory, git — into the first user message, for a cache-friendly static system prompt), a concise `CLAUDE.md` (re-read on every run), `--max-turns` (bounds agentic exploration), `fetch-depth: 1` shallow checkout. `--max-budget-usd` caps **spend**, not token/context usage directly — a common trap when a question specifically asks about reducing context/tokens rather than cost. Source: [GitHub Actions](https://code.claude.com/docs/en/github-actions). *Verified: 2026-08-07*

**Automated code review needs full repo checkout, not just the diff text.** Code Review (hosted product and local `/code-review`) analyzes "the diff **and surrounding code**" — agents use Read/Grep to explore the codebase beyond the changed lines. A shallow checkout (`fetch-depth: 1`) is sufficient since Claude only needs the working tree, not git history. Pasting only the diff text into a prompt removes filesystem access and breaks this. `/code-review` runs as a background subagent with its own context window, so it doesn't fill the main session. Source: [Code Review](https://code.claude.com/docs/en/code-review). *Verified: 2026-08-07*

## Recurring exam-trap pattern

Watch for options containing **"separate," "independent instance/session," "fresh context"** — these signal a new, stateless API call even when the literal words "new session" never appear. Distractor options in this trap category typically all describe tuning something *within* the same ongoing call (more instructions, more reasoning budget, lower temperature) — the correct answer is usually the only one that restructures *how many* calls happen.

**Aggregate metrics masking variation.** Any question where one blended number (accuracy, helpfulness score, grader agreement) hides very different sub-scores — the correct answer segments/breaks it out (by category, by document type, by grader), never picks one sub-score, discards data, homogenizes the sources, or tunes sampling until they converge. Source: [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents). *Verified: 2026-07-24*

## Topics covered (log)

Append one line per session: `YYYY-MM-DD — concept — one-line takeaway`.

- 2026-07-15 — Messages API statelessness — conversation history isn't magic, it's resent every call; "agent forgot" bugs are usually "history wasn't passed."
- 2026-07-15 — Agent SDK hooks (PostToolUse data normalization) — fix heterogeneous tool outputs after execution, not before; `updatedToolOutput` is the field.
- 2026-07-15 — Self-review bias / independent instances — "separate pass" language is the giveaway for a new session even without saying "new session."
- 2026-07-22 — `.mcp.json` env var expansion — `${VAR}` syntax is real and built-in; a named "secret retrieval tool" is not. Missing var fails open (warning), not hard.
- 2026-07-22 — Rate limits, retries, exponential backoff — isolate failure to the smallest unit; retry counts are bounded even though backoff is exponential; 429 (your limit) vs 529 (server overload) both need backoff, never immediate retry.
- 2026-07-24 — Edit vs Write tool — full-file replacement is Write, not Edit-with-anchor-lines; Edit's old_string is one continuous exact match, so "match first and last line" doesn't skip the middle.
- 2026-07-24 — Aggregate metrics masking variation (accuracy by document type, grader agreement) — correct answer always segments/exposes the breakdown, never picks one sub-score, discards data, or averages the disagreement away.
- 2026-07-30 — Prompt caching (byte-exact prefix hash, breakpoint placement) — any prefix change or per-request content before the breakpoint kills the whole cache; not a model-level toggle.
- 2026-07-31 — Parallel subagent execution — concurrency is multiple Task/Agent tool_use blocks in one turn, not a config flag; `AgentDefinition` has no `execution_mode` field.
- 2026-08-07 — CI/CD context reduction, `-p` flag, automated code review context — token reduction is several small levers (cache-friendly system prompt, concise CLAUDE.md, `--max-turns`, shallow checkout), not `--max-budget-usd` (that caps spend, not tokens); code review needs full repo checkout so Read/Grep can reach beyond the diff.

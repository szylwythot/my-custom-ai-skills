# Claude Code Architecture — Study Notes

> Context: Preparing for the Anthropic Claude exam.  
> Covers: CLAUDE.md, settings.json, hooks, tools, skills, subagents — when they fire, their priority, and what gets sent to the LLM.

---

## The Exam Question That Started This

**Q:** The refactoring team's Java naming convention must be applied on every run. A senior developer's user-level `CLAUDE.md` (`~/.claude/CLAUDE.md`) contradicts it, and reviewers have already caught Claude following the developer's personal preference over the team rule. Where should the team move the rule so it is guaranteed to be honoured?

**A:** Into the project's `settings.json` or a `PreToolUse` hook — enforcement-grade locations that the Claude Code client applies regardless of what the model decides.

> Anthropic's memory docs are explicit that CLAUDE.md files are "concatenated into context rather than overriding each other" and that "if two rules contradict each other, Claude may pick one arbitrarily." CLAUDE.md is delivered as a user message — there is no guarantee of strict compliance. Settings rules and hooks are enforced by the client regardless of what Claude decides to do.

---

## Chapter 1: When is each thing invoked?

| Technology | When it fires |
|---|---|
| `~/.claude/CLAUDE.md` | Every session start, for every project |
| `.claude/CLAUDE.md` (project) | When Claude Code opens that specific project |
| `settings.json` | At client startup — permissions locked in before any LLM call |
| Hooks (PreToolUse, PostToolUse) | Right before/after each tool call executes |
| Tools (Read, Edit, Bash…) | When the LLM *decides* to call one |
| Skills (`/command`) | When user types `/skill-name` or Claude detects a trigger |
| Subagents | When Claude calls the `Agent` tool — spawns a separate LLM call |

### When does the project CLAUDE.md load? (VSCode vs terminal)

The trigger is **which folder Claude Code sees as the project root** — not how you launched it.

- **VSCode extension:** loads when you open the folder. Project root = your VSCode workspace folder.
- **Terminal / bash:** loads when Claude Code starts in that directory. Project root = your current working directory (`cd my-project && claude`).

Both cases: Claude Code walks up the directory tree, finds `.claude/CLAUDE.md` (or `CLAUDE.md`), and loads it. Same file, same moment — just a different way of telling Claude Code "this is the project."

---

## Chapter 2: Strength / Priority Order

Think of it as two tiers:

### Tier 1: Client-enforced (the LLM has NO say)

1. **`settings.json` permissions** — the client blocks the tool call before it even reaches the model
2. **Hooks** — shell scripts that run regardless of what the model decided

### Tier 2: Model-interpreted (the LLM reads and *tries* to follow)

3. **Project CLAUDE.md** — more specific, loaded after user-level
4. **User CLAUDE.md** (`~/.claude/`) — global preferences
5. **Skills** — extra instructions injected at trigger time
6. **In-conversation messages** — what you type in chat
7. **Model training** — base behavior fallback

> The critical insight: **Tier 1 vs Tier 2** is the real divide. If two CLAUDE.md files contradict each other, the model may pick either one arbitrarily — both are just text. If a hook contradicts the model's decision, the hook wins every time.

---

## Chapter 3: Order of Execution Per Turn

```
Session starts
  ├─ 1. settings.json loaded → permissions locked
  ├─ 2. User ~/.claude/CLAUDE.md → added to context
  └─ 3. Project .claude/CLAUDE.md → added to context

User sends a message
  ├─ 4. Skill triggered? → inject skill instructions into context
  ├─ 5. Full context assembled → sent to LLM
  └─ 6. LLM responds (text or tool_use)

If LLM wants to call a tool:
  ├─ 7. settings.json permission check → BLOCKED? stop here (client side)
  ├─ 8. PreToolUse hook runs → BLOCKED? stop here (client side)
  ├─ 9. Tool actually executes (Read, Edit, Bash…)
  ├─ 10. PostToolUse hook runs
  └─ 11. Tool result added to context → back to LLM
```

---

## Chapter 4: What Exactly Gets Sent to the LLM?

Here is a simplified but realistic example of the actual API payload:

```json
POST /v1/messages
{
  "model": "claude-sonnet-4-6",

  "system": "You are Claude Code, Anthropic's CLI...\n
    [~/.claude/CLAUDE.md]\n
    - use simple language\n
    - use bullet points\n
    \n
    [.claude/CLAUDE.md]\n
    - Java naming: use camelCase for methods\n
    \n
    Available tools: Read, Edit, Bash, Write...",

  "tools": [
    { "name": "Read",  "description": "...", "input_schema": {} },
    { "name": "Edit",  "description": "...", "input_schema": {} },
    { "name": "Bash",  "description": "...", "input_schema": {} }
  ],

  "messages": [
    { "role": "user",      "content": "Refactor Main.java" },
    { "role": "assistant", "content": [
        { "type": "tool_use", "name": "Read",
          "input": { "file_path": "/src/Main.java" } }
    ]},
    { "role": "user", "content": [
        { "type": "tool_result",
          "content": "public class main { void MyMethod(){} }" }
    ]}
  ]
}
```

### What is in the LLM payload:
- System prompt (CLAUDE.md contents, skill instructions, tool definitions)
- Full conversation history (messages + tool results)
- The user's current message

### What stays client-side only (LLM never sees this):
- `settings.json` permission rules — the client just blocks/allows before asking the LLM
- Hook scripts — they are shell commands, run locally
- The actual file system reads/writes (the LLM only sees the *result* as a `tool_result` message)
- Subagent spawning logic — the parent LLM emits a `tool_use` for `Agent`, and the client handles the actual new API call

---

## Chapter 5: settings.json Permissions Explained

### Structure

```json
"permissions": {
  "allow": [
    "Bash(find ~/.claude -name \"*linkedin*\")",
    "Read(//c/Users/name/.claude/**)"
  ],
  "deny": [
    "Bash(rm -rf *)",
    "Write(/etc/**)"
  ]
}
```

- `allow` — these tool calls run without asking for confirmation
- `deny` — hard block; Claude cannot call these even if it wants to
- Pattern format: `ToolName(argument-pattern)`

### About `--dangerously-skip-permissions`

This is a **runtime flag**, not a settings.json entry:

```bash
claude --dangerously-skip-permissions
```

- Skips all permission prompts for that session only
- Nothing is written to any file
- Disappears when the session ends
- Bypasses `deny` rules too — hence "dangerously"

---

## Chapter 6: settings.json vs Hooks — Not the Same Thing

They solve different problems:

| | `settings.json` permissions | Hooks |
|---|---|---|
| What it does | Allow or block a tool call | Run a shell script at a lifecycle event |
| Use case | "Claude can/cannot use this tool" | "Before/after tool X, run this script" |
| Can modify behavior? | No — just yes/no on the call | Yes — can inspect, transform, block with custom logic |
| Example | Block all `Bash(rm *)` | Before every Edit, check if file matches Java convention |

### Hook types

| Hook | When it fires |
|---|---|
| `PreToolUse` | Before the tool runs — can **block** it |
| `PostToolUse` | After the tool runs — can inspect result |
| `Notification` | When Claude sends a notification |
| `Stop` | When Claude finishes a response |

Hooks are configured **only in `settings.json`** (or `settings.local.json`). There is no other place.

### Why the answer says "or"

Both options alone are enough to enforce a rule — pick whichever fits:

- **Option A:** `settings.json` deny rule → block Claude from writing files that violate naming
- **Option B:** `PreToolUse` hook → run a script that checks naming before every Edit/Write, exit with error code to block it

A hook gives you more custom logic (regex check, custom error message back to Claude). A permissions deny is simpler but less flexible.

---

## Quick Reference: The Key Exam Distinction

| Location | Enforced by | Guarantee |
|---|---|---|
| `~/.claude/CLAUDE.md` | LLM (model interprets) | None — may be ignored |
| `.claude/CLAUDE.md` | LLM (model interprets) | None — may be ignored |
| `settings.json` allow/deny | Client (before LLM call) | Hard — LLM never gets the chance |
| Hooks | Client (shell script) | Hard — runs regardless of LLM decision |

> If a rule must hold every time → put it in `settings.json` or a hook.  
> If a rule is a preference or style guide → CLAUDE.md is fine.

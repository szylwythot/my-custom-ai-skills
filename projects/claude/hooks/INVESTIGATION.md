# PreToolUse Hook Investigation

## Background — the exam question

This investigation started from a Claude Code certification exam question:

> **Q:** The refactoring team's Java naming convention must be applied on every run. A senior developer's user-level `~/.claude/CLAUDE.md` contradicts it, and reviewers have already caught Claude following the developer's personal preference over the team rule. Where should the team move the rule so it is guaranteed to be honoured?
>
> **A:** Into the project's `settings.json` or a `PreToolUse` hook — enforcement-grade locations that the Claude Code client applies regardless of what the model decides. `CLAUDE.md` files are concatenated into context rather than overriding each other. If two rules contradict each other, Claude may pick one arbitrarily. Settings rules and hooks are enforced by the client regardless of what Claude decides to do.

The goal was to **prove this answer by building it** — a `PreToolUse` hook in `.claude/hooks/check-naming.js` that intercepts every `Write`/`Edit` tool call, scans `.ts` files for PascalCase function names, and hard-blocks the write if a violation is found. The hook would enforce the team rule even if a user's personal `CLAUDE.md` told Claude to use a different naming style.

The hook is wired up in `.claude/settings.json` under `PreToolUse` with matcher `Write|Edit`.

---

## Root cause — why it took 3 hours

The ES module crash exited with code `1` instead of `2`, so it was completely invisible — every test looked like "hook does nothing" for hours, even when the underlying logic was already correct.

---

## Timeline of bugs

### Bug 1 — Wrong exit code (09:00–09:14)

The first hook used `process.exit(1)`. In Claude Code, exit `1` is non-blocking — the tool call proceeds anyway. Only exit `2` blocks.

### Bug 2 — Silent ES module crash (09:09 → hours)

The project `package.json` has `"type": "module"`, so Node treats all `.js` files as ESM. The hook used `require('fs')` — CommonJS syntax that crashes instantly in ESM:

```
ReferenceError: require is not defined in ES module scope
```

The crash exited with code `1` (non-blocking), so the hook silently failed on every invocation. To the user it looked like "the hook just does nothing." Every fix attempt appeared to fail even when the logic was correct. This error first appeared at 09:09 and kept repeating silently for hours.

### Bug 3 — Diagnostic hook locked Claude out (12:41–13:26)

To verify the hook system was wired up at all, an unconditional `exit(2)` diagnostic was installed. That hook then blocked Claude's own `Write`/`Edit` tool calls, preventing it from fixing the hook file. Required a Bash heredoc workaround — slow and clumsy.

### Bug 4 — stderr vs stdout confusion (13:25)

Claude switched between `process.stderr.write` and `process.stdout.write` based on wrong assumptions about which channel Claude Code reads. This caused the "No stderr output" error visible in the second session.

---

## Exit code rules

| Exit code | Effect |
|-----------|--------|
| `0` | Allow — stdout silently discarded |
| `1` | Non-blocking error — treated as allow, hook output ignored |
| `2` | Hard block — stdout shown to Claude as the reason |

**stdout** → shown to Claude on exit 2; use for the BLOCKED reason.
**stderr** → terminal only, Claude never sees it.

---

## Three lessons

**1. Use ES modules, not CommonJS.**
`require()` silently breaks when `package.json` has `"type": "module"`. Use:

```js
import { readFileSync, appendFileSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
```

**2. Log to a file from day one.**
stdout is discarded on exit `0`. A file log gives visibility regardless of exit code:

```js
appendFileSync(join(__dirname, 'debug.log'), JSON.stringify({ tool_name, keys }) + '\n');
```

**3. Test in isolation before wiring up.**
Round-tripping through a chat is slow. Pipe fake input directly and iterate in seconds:

```powershell
echo '{"tool_name":"Write","tool_input":{"file_path":"foo.ts","content":"function MyFunc() {}"}}' | node .claude/hooks/check-naming.js
```

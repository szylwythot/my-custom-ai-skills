# 🧠 My Custom AI Skills, Instructions & Tooling

A centralized repository collecting custom skills, agent workflows, hooks, rules, prompt instructions, and new machine developer setup guides for **Google Gemini / Antigravity**, **Anthropic Claude Code**, and **GitHub Copilot**.

---

## 🗂️ Structure Overview

```text
my-custom-ai-skills/
├── projects/
│   ├── gemini/          # Project skills, rules, GEMINI.md files
│   ├── claude/          # Project skills, agents, hooks, CLAUDE.md files
│   └── copilot/         # Project copilot-instructions.md files
├── personal/
│   ├── gemini/          # Personal skills (study-guide-generator, ADK CLI) & rules
│   ├── claude/          # Personal CLAUDE.md, cca-f-quiz-review
│   └── copilot/         # Global fallback copilot instructions
└── tools/
    └── new-machine-setup.md # Complete checklist of all runtimes, CLIs, and tools
```

---

## ⚡ Inventory Table

### 📁 1. Project-Based AI Assets (`projects/`)

| Category | Item / Name | Description | Source Project |
| :--- | :--- | :--- | :--- |
| **Gemini Skill** | `gemini-cert-prep-mentoring` | Partner Specialist cert mentoring across Gemini, Claude & OpenAI | `binit` |
| **Gemini Skill** | `clean-md` | Markdown cleanup, deduplication, and tightening | `binit` |
| **Gemini Skill** | `weekly-report` | Weekly accomplishment and cert progress reports | `binit` |
| **Gemini Rule** | `communication.md` | Persona, response clarity, and concise communication rules | `antigravity-pet-project` |
| **Gemini Instructions** | `binit-GEMINI.md` | Fullstack TypeScript/React project instructions | `binit` |
| **Gemini Instructions** | `ambient-expense-agent-GEMINI.md` | Agentic workflow & Python project instructions | `ambient-expense-agent` |
| **Gemini Instructions** | `aws-cloudx-template-GEMINI.md` | AWS practitioner kata instructions | `AWS/cloudx template` |
| **Claude Skill** | `a11y-url-check` | Automated accessibility checks on live URLs | `binit` |
| **Claude Skill** | `clean-md` | Claude Code Markdown documentation cleanup | `binit` |
| **Claude Skill** | `weekly-report` | Weekly report generator for Claude Code | `binit` |
| **Claude Agent** | `a11y-auditor` | Specialized accessibility auditing subagent | `binit` |
| **Claude Hook** | `schema-guard.js` | PreToolUse guard blocking Zod schema anti-patterns | `core-epam` |
| **Claude Hook** | `enforce-camelcase.js` | Enforces naming conventions across generated code | `binit` |
| **Claude Instructions** | `binit-CLAUDE.md` | Project rules and architectural guidance for Claude Code | `binit` |
| **Claude Instructions** | `uigen-CLAUDE.md` | UI generator project instructions | `uigen` |
| **Copilot Instructions** | `core-epam-copilot-instructions.md` | Strict React 19, MUI v7, Nx monorepo standards | `core-epam` |
| **Copilot Instructions** | `default-copilot-instructions.md` | Baseline coding and communication standards | `binit` |

---

### 👤 2. Personal / User-Level AI Assets (`personal/`)

| Category | Item / Name | Description | Source |
| :--- | :--- | :--- | :--- |
| **Gemini Skills** | `study-guide-generator` | ADHD-friendly, high-structure study guide and notes generator | `~/.gemini/config` |
| **Gemini Skills** | `google-agents-cli-*` suite | ADK code, deploy, eval, observability, publish, scaffold, workflow | `~/.agents/skills` |
| **Gemini Skills** | `clean-md`, `weekly-report` | Global markdown maintenance and weekly reporting | `~/.gemini/config` |
| **Gemini Rules** | `communication.md` | Global user communication preferences rule | `~/.agents/rules` |
| **Claude Skills** | `cca-f-quiz-review` | CCA-F certification exam preparation and quiz review | `~/.claude/skills` |
| **Claude Skills** | `clean-md`, `weekly-report` | Global personal Claude skills | `~/.claude/skills` |
| **Claude Rules** | `CLAUDE.md` | Personal global Claude system instructions | `~/.claude/CLAUDE.md` |
| **Copilot Instructions** | `global-copilot-instructions.md` | Personal fallback instructions across all workspaces | `~/.github` |

---

### 💻 3. Developer Toolchain & New Machine Setup (`tools/`)

| File | Purpose |
| :--- | :--- |
| [`new-machine-setup.md`](file:///c:/Users/szilvia_toth1/Documents/projects/my-custom-ai-skills/tools/new-machine-setup.md) | Step-by-step installation commands (`winget`, `npm`, `pip`, `dotnet`, `docker`, `aws`, `gcloud`, SSH configs) for `core-epam`, `AWS`, `claude`, `gemini`, and `.NET`. |

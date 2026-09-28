# 🧠 My Custom AI Skills & Instructions

A centralized repository collecting custom skills, agent workflows, hooks, rules, and prompt instructions for **Google Gemini / Antigravity**, **Anthropic Claude Code**, and **GitHub Copilot**.

---

## 🗂️ Structure Overview

```text
my-custom-ai-skills/
├── projects/
│   ├── gemini/
│   │   ├── skills/          # clean-md, gemini-cert-prep-mentoring, weekly-report
│   │   ├── rules/           # communication.md
│   │   └── instructions/    # binit, ambient-expense, AWS template GEMINI.md files
│   ├── claude/
│   │   ├── skills/          # a11y-url-check, clean-md, weekly-report
│   │   ├── agents/          # a11y-auditor
│   │   ├── hooks/           # schema-guard.js, enforce-camelcase.js, INVESTIGATION.md
│   │   └── instructions/    # binit & uigen CLAUDE.md files, architecture notes
│   └── copilot/
│       └── instructions/    # core-epam and default copilot instructions
└── personal/
    ├── gemini/
    │   ├── skills/          # study-guide-generator, clean-md, weekly-report, google-agents-cli-*
    │   └── rules/           # communication.md
    ├── claude/
    │   ├── skills/          # cca-f-quiz-review, weekly-report, clean-md
    │   └── CLAUDE.md        # Personal global Claude instructions
    └── copilot/
        └── instructions/    # global-copilot-instructions.md (from ~/.github)
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

## 🚀 How to Use & Sync

- **Gemini / Antigravity**: Copy to `.agents/skills/` or `~/.gemini/config/skills/`.
- **Claude Code**: Copy to `.claude/skills/`, `.claude/agents/`, or `.claude/hooks/`.
- **GitHub Copilot**: Copy to `.github/copilot-instructions.md` (project) or `~/.github/copilot-instructions.md` (global).

---
name: study-guide-generator
description: >-
  Converts dense technical course modules, documentation, and quiz questions into ADHD-friendly, highly structured Markdown (.md) study guides with full abbreviation expansions, comparison tables,
  glossaries, interview translations, and step-by-step code flows. Cross-references against official
  Google/Gemini documentation.
---

# 📚 Study Guide Generator Skill

This skill transforms heavy, dense technical course chapters, documentation, and quiz dumps into clear, ADHD-friendly study guides saved as Markdown (`.md`) files.

---

## 🎯 Core Operating Principles

### 1. ADHD-Friendly Visual Structure
- **BLUF (Bottom Line Up Front):** Put the key takeaways at the very top.
- **Micro-Chunks:** Keep explanations to 1–2 short sentences maximum per point.
- **Scannability:** Use bold keywords, visual bullet points, and clean separation.
- **Comparison Tables:** Always replace long comparative paragraphs with markdown tables.
- **Emoji Rule:** Use emojis to highlight key concepts in text; **never** put emojis in code blocks or code comments.
- **No ADHD Mentions:** **Never** use the term "ADHD" in the generated study guide files, unless the course material itself is explicitly about ADHD.

### 2. 🔤 Mandatory Abbreviation & Glossary Rule
- **Every single abbreviation/acronym** must be spelled out with its full name in brackets upon first use in each file (e.g., `IAM (Identity and Access Management)`, `JWT (JSON Web Token)`, `LRO (Long-Running Operation)`, `TTL (Time To Live)`, `ADK (Agent Developer Kit)`, `MCP (Model Context Protocol)`, `API (Application Programming Interface)`).
- **Every abbreviation and specialized term** must be included in the `## 📖 Plain English Glossary` section with an intuitive, non-jargon explanation.

### 3. 🤫 Stealth Quiz Integration
- When the user pastes course quiz questions, **incorporate all tested concepts, edge cases, and answers directly into the study guide notes and tables**.
- **Do not mention the quiz:** Never write *"This was asked in the quiz"* or *"Quiz answer:"*. Weave the facts in as standard, fundamental platform knowledge.

### 4. 💼 Interview & Mental Model Translations
- Include a translation table that maps simple intuitive analogies (e.g., *"temporary private mini-computer"*) to senior-level enterprise tech terminology (e.g., *"ephemeral isolated compute container with downscoped IAM tokens"*).
- Connect security concepts to mathematical/cryptographic intuition where relevant (e.g., asymmetric key signing, trusted brokers, zero ambient storage).

### 5. 🔍 Context Awareness (Match Existing Style)
- Before creating a new study guide, always check the target output directory within the `knowhow-sharing` repo for existing `.md` files.
- Read them to understand the current structure, tone, and formatting style. Use existing files as the primary structural template rather than forcing a rigid one.

### 6. 🧹 Directory-Level Deduplication
- Treat all `.md` files within the same output folder as a single continuous study resource.
- **Acronym Expansions:** You *must* expand acronyms upon their first use in *each* file (e.g., `LRO (Long-Running Operation)`), even if they were introduced in previous modules. This prevents context-switching.
- **Explanations & Definitions:** **Do not repeat** full glossary definitions, mental model translations, or core concept explanations if they already exist in another file in the same folder.
- **Exception for ADHD Reinforcement:** You may include a brief, inline reminder of a previously covered concept if repeating it actively aids memorization or serves a pedagogical purpose in the new context.

---

## 🌐 Official Google & Gemini Verification Sources

When validating course concepts or resolving ambiguities in pasted notes, verify against these official Google / Gemini resources:

1. **Google Cloud Vertex AI & Managed Agents Documentation:**
   - [Vertex AI Agent Builder Documentation](https://cloud.google.com/vertex-ai/docs)
   - [Google Cloud IAM Token Broker & Security Guides](https://cloud.google.com/iam/docs)
   - [Google Cloud Storage IAM Access Control](https://cloud.google.com/storage/docs/access-control)
2. **Google Agent Developer Kit & Open Protocols:**
   - [Google Agent Developer Kit (ADK)](https://github.com/google/adk)
   - [Model Context Protocol (MCP) Specification](https://modelcontextprotocol.io/)
3. **Course Root & Learning Paths:**
   - [Google Cloud Skills Boost: Use Agents to Build Agents](https://partner.skills.google/paths/3476)
   - [Build with the Managed Agents API on Gemini Enterprise Agent Platform](https://partner.skills.google/paths/3476/course_templates/1747)

---

## 📋 Course-Agnostic Study Guide Template

*Note: This is a flexible baseline. Adapt the headings (like replacing Control/Data Plane with whatever fits the current module) and check existing files to match their style.*

```markdown
# 🚀 [Module Title / Main Topic]

**Course:** [Course Name]  
**Module [N]:** [Module Name]  

---

## ⚡ Key Takeaways (BLUF)

- 🎯 **[Core Concept 1]:** [1-sentence crisp summary]
- 🛡️ **[Core Concept 2]:** [1-sentence crisp summary]
- 🎛️ **[Core Concept 3]:** [1-sentence crisp summary]

---

## 🏗️ 1. Core Concepts & Comparisons

| Feature / Dimension | 🛠️ [Option A / Concept A] | 🛡️ [Option B / Concept B] |
|---|---|---|
| **Primary Focus** | ... | ... |
| **Security / Usage** | ... | ... |
| **Best For** | ... | ... |

---

## 📦 2. Technical Deep-Dive & Rules

- 📂 **[Key Component 1]:** [1-sentence explanation with full abbreviations spelled out in brackets].
- 🔒 **[Key Component 2]:** [1-sentence explanation].

---

## 🎛️ 3. [Domain or Process Breakdown]

### ⚙️ [Sub-Category A, e.g., Theory, Setup, or Control Plane]
- **Purpose:** [What it is]
- **Details:** [Key details]

```python
# Code example without emojis in code or comments
```

### 🏃 [Sub-Category B, e.g., Practice, Execution, or Data Plane]
- **Purpose:** [What it does]
- **Details:** [Key details]

```python
# Code example without emojis in code or comments
```

---

## 🧱 4. [Secondary Breakdown or Capability Stack]

### 👤 [Perspective A, e.g., User Role or Frontend]
- 📝 **[Item]:** [Details]

### ☁️ [Perspective B, e.g., System Role or Backend]
- 🧠 **[Item]:** [Details]

---

## 💼 5. Interview Translation Cheat Sheet

| 🧸 Simple Mental Model | 💼 Professional Tech Language |
|---|---|
| *"[Simple phrase]"* | **"[Professional enterprise phrase]"** |

---

## 📖 6. Plain English Glossary

- 🏗️ **[Term / Abbreviation (Full Form)]:** [Clear plain-English definition].
- 🔑 **[Term / Abbreviation (Full Form)]:** [Clear plain-English definition].

---

## 🛠️ 7. Hands-On Practice Guide: Step-by-Step Flow

### Step 1: [Action Name]
1. [Bite-sized step]
2. [Bite-sized step]

```python
# Clean Python code with no emojis
```
```

---

## 📂 File Output Convention

- Unless specified otherwise, save all generated study guides and knowledge sharing files into the `c:\Users\szilvia_toth1\Documents\projects\knowhow-sharing` repository.
- Place them in the appropriate subfolder based on the topic.
- Use standardized naming: `<topic_slug>.md` or `module<N>_<topic_slug>.md`.

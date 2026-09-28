---
name: a11y-url-check
description: >
  Spawn an accessibility audit agent for a URL. Triggered when the user provides
  a URL and asks to check, audit, review, or "ellenőrizd" it for accessibility
  or a11y. Also triggered by: "a11y check <url>", "accessibility review <url>".
---

# A11y URL Audit

1. Extract the URL from ARGUMENTS or the user message.
2. Spawn the `a11y-auditor` subagent (subagent_type: "a11y-auditor") with run_in_background: true. Pass the URL in the prompt.
3. Tell the user the audit is running in the background and they will be notified when it completes.

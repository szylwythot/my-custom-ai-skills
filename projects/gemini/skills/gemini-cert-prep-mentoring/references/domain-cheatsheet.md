# Gemini Enterprise Cert Prep Domain Cheat Sheet

Verified concepts and reference takeaways for Gemini Enterprise Agent Development, Gemini Enterprise Deployment, Claude, and OpenAI.

## Verified concepts

**Vertex AI Agent Builder vs Agent Studio vs Agent Engine.** Agent Studio is for rapid prototyping, evaluation, and low-code design. Agent Engine is the managed production runtime for deployment, scaling, governance, and session persistence. Source: [Vertex AI Documentation](https://cloud.google.com/vertex-ai/docs). *Verified: 2026-08-10*

**Partner Specialist Certification Structure.** Certifications are performance-based challenge labs (not multiple choice), valid for 6 months. Development track covers Antigravity, ADK, and evaluation; Deployment track covers Workspace data sources, Model Armor, and Agent Gateway. Source: [Google Skills for Partners](https://rsvp.withgoogle.com/events/partner-learning/cps). *Verified: 2026-08-10*

**Grounding with Enterprise Search vs Google Search.** Grounding with Google Search uses public web indexes. Grounding with Vertex AI Search (Datastores) uses private enterprise data (Cloud Storage, BigQuery, Workspace). Enterprise search respects IAM permissions and document access controls. Source: [Grounding Overview](https://cloud.google.com/vertex-ai/docs/generative-ai/grounding/overview). *Verified: 2026-08-10*

**Gemini Function Calling (Declarative Tooling).** Function declarations define JSON Schemas. Gemini outputs structured tool call requests (`functionCall`); execution happens on the client/application side, which then returns `functionResponse` back to the model. Source: [Function Calling](https://ai.google.dev/docs/function_calling). *Verified: 2026-08-10*

**Gemini Context Caching.** Caching requires a minimum token threshold (typically 32k tokens depending on model version). Cached content is immutable; updates require creating a new cached content resource. Useful for large system instructions or fixed reference datasets. Source: [Context Caching](https://ai.google.dev/docs/context_caching). *Verified: 2026-08-10*

**Gemini Enterprise Security & Governance.** Production deployments require IAM roles (`roles/aiplatform.user`), Customer-Managed Encryption Keys (CMEK) for data at rest, VPC Service Controls (VPC-SC) to prevent data exfiltration, Model Armor security filtering, Agent Gateway governance, and Cloud Audit Logs for compliance. Source: [Google Cloud Security Docs](https://cloud.google.com/docs/security). *Verified: 2026-08-10*

**Claude Messages API & Prompt Caching.** Messages API is stateless; full conversation history must be resent. Prompt caching relies on byte-exact prefix match up to the breakpoint. Source: [Claude Documentation](https://platform.claude.com/docs). *Verified: 2026-08-10*

**OpenAI Assistants API & Vector Stores.** Assistants API handles message history statefully on OpenAI servers. File Search uses managed Vector Stores with automatic chunking and retrieval. Source: [OpenAI Documentation](https://platform.openai.com/docs). *Verified: 2026-08-10*

## Recurring Exam & Challenge Lab Traps

**Client-Side vs Server-Side Execution.** A common lab mistake is assuming Gemini executes function code automatically. Gemini only generates the parameters; your application harness must execute the logic and return results.

**Public vs Private Grounding.** Using public Google Search grounding for enterprise internal queries fails privacy checks and governance requirements. Internal data must use Datastores with IAM restrictions.

**Model Armor vs System Instructions.** Relying solely on prompt instructions to block prompt injection or PII leak is insufficient for enterprise compliance; production setups use Model Armor and Agent Gateway for deterministic proxy-level enforcement.

## Topics covered (log)

- 2026-08-10 - Gemini Enterprise Agent Platform - Initial cheat sheet creation covering Agent Studio, Agent Engine, Grounding, Function Calling, and Security.
- 2026-08-10 - Gemini Knowledge Sharing Review - Reviewed and updated knowledge-sharing document with Partner Specialist tracks, ADK, Agent Gateway, and Model Armor details.

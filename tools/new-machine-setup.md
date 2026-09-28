# 💻 New Machine Developer Setup Guide

A complete checklist and installation guide of all runtimes, CLIs, SDKs, and developer tools required to run and contribute to all projects in this workspace (**core-epam**, **AWS**, **Claude**, **Gemini / Antigravity**, and **.NET**).

---

## ⚡ Quick Matrix: Projects & Required Tools

| Project Area | Primary Language / Runtime | Package Manager | Essential CLIs & Tools | Cloud & Infrastructure |
| :--- | :--- | :--- | :--- | :--- |
| **`core-epam`** | Node.js 22+ (ES2024), TypeScript 5.8+ | `yarn 1.22+`, `npm` | `nx` (Nx monorepo), `git`, `acli.exe` | Docker, PostgreSQL, Azure Blob / ACR, LocalStack |
| **`AWS`** | Node.js 20+, JavaScript / TS | `npm` | `aws` (AWS CLI v2), `git` | AWS IAM, S3, Lambda, CloudWatch |
| **`claude`** | Node.js 20+, TypeScript | `npm`, `pnpm` | `@anthropic-ai/claude-code`, Claude Agent SDK | Anthropic Console API Key |
| **`gemini` / `antigravity`** | Python 3.10 / 3.11+, Node.js | `pip`, `venv`, `uv` | Google Antigravity IDE, `agy` CLI, `gcloud` CLI | Google Cloud Vertex AI, BigQuery, Gemini API Key |
| **`dotnet`** | .NET SDK 10 (or 8/9 LTS), C# 13 | `dotnet` (NuGet) | `dotnet` CLI, C# Dev Kit | Microsoft SQL Server / LocalDB |

---

## 🚀 Step 1: Core System Essentials (Brand New PC)

Run these in PowerShell as Administrator using **Windows Package Manager (winget)**:

### 1. Runtimes & Version Managers
```powershell
# Git & Shell
winget install --id Git.Git -e --source winget
winget install --id Microsoft.PowerShell -e --source winget

# Node.js LTS (v22+)
winget install --id OpenJS.NodeJS.LTS -e --source winget

# Python 3.11 (Required for Gemini / ADK tools)
winget install --id Python.Python.3.11 -e --source winget

# .NET SDK (v10 / v8 LTS)
winget install --id Microsoft.DotNet.SDK.10 -e --source winget
# (Or .NET 8 LTS): winget install --id Microsoft.DotNet.SDK.8 -e --source winget
```

### 2. Container & Virtualization
```powershell
# Docker Desktop (Needed for core-epam PostgreSQL & LocalStack)
winget install --id Docker.DockerDesktop -e --source winget
```

### 3. Cloud CLIs
```powershell
# AWS CLI v2
winget install --id Amazon.AWSCLI -e --source winget

# Google Cloud SDK (gcloud)
winget install --id Google.CloudSDK -e --source winget
```

---

## 📦 Step 2: Global Node & Python Tools

After installing Node.js and Python, run the following global package installs:

### Node.js Global CLIs
```powershell
# Yarn (Required for core-epam monorepo)
npm install -g yarn

# Nx Monorepo CLI (Required for core-epam build/test/serve)
npm install -g nx

# Claude Code CLI
npm install -g @anthropic-ai/claude-code

# TypeScript & TS-Node
npm install -g typescript ts-node
```

### Python Agent & AI Tooling
```powershell
# Upgrade pip & install virtualenv
python -m pip install --upgrade pip virtualenv uv

# Google Agent Development Kit (ADK) & Gemini SDK
pip install google-adk google-genai google-cloud-aiplatform
```

---

## 🛠️ Step 3: Project-Specific Requirements & Commands

### 1. `core-epam` (React 19 + MUI v7 + Express/Koa + Nx)
- **Repo Setup:**
  ```powershell
  cd c:\Users\szilvia_toth1\Documents\projects\core-epam
  yarn install
  ```
- **Local Database & Services:**
  - Start Docker Desktop.
  - Run: `npm run localstack:deps` or `npm run start-docker`.
- **Database Migrations:**
  - Run: `npm run db:migrate:latest`.
- **Run Frontend & API:**
  - Frontend: `npm run dev:frontend` (or `nx run @core-epam/core-frontend:dev`).
  - Backend: `npm run serve:api` (or `nx run core-api:serve`).

---

### 2. `AWS` (`cloudx-aws-practitioner-for-js-template`)
- **Configure Credentials:**
  ```powershell
  aws configure
  # Enter AWS Access Key ID, Secret Access Key, Default region (e.g., us-east-1)
  ```
- **Dependencies:**
  ```powershell
  cd c:\Users\szilvia_toth1\Documents\projects\AWS\cloudx-aws-practitioner-for-js-template
  npm install
  ```

---

### 3. `claude` (`binit`, `uigen`, `bin-it-ai`)
- **Setup:**
  - Login to Claude Code: `claude`
  - Paste your Anthropic API Key or authenticate through browser.
- **Project Install:**
  ```powershell
  cd c:\Users\szilvia_toth1\Documents\projects\claude\binit
  npm install
  ```

---

### 4. `gemini` / `antigravity` (`antigravity-pet-project`, `ambient-expense-agent`)
- **Setup Virtual Environment:**
  ```powershell
  cd c:\Users\szilvia_toth1\Documents\projects\antigravity\antigravity-pet-project\ambient-expense-agent
  python -m venv .venv
  .\.venv\Scripts\Activate.ps1
  pip install -r requirements.txt
  ```
- **Configure Environment Variables (`.env`):**
  - `GEMINI_API_KEY=your_gemini_api_key`
  - `GOOGLE_CLOUD_PROJECT=your_project_id`

---

### 5. `dotnet` (`DIKata`, `aspDotNetCiurse`, `questionaire-builder`)
- **Build & Test:**
  ```powershell
  cd c:\Users\szilvia_toth1\Documents\projects\dotnet\DIKata
  dotnet restore
  dotnet build
  dotnet test
  ```

---

## 🔑 Step 4: SSH Key Setup for Multiple Git Accounts

To push to both **Personal GitHub** (`szylwythot`) and **Corporate Repos** without conflicts:

### 1. Generate SSH Keys
```powershell
# Personal GitHub Key
ssh-keygen -t ed25519 -C "your_personal_email" -f "$HOME\.ssh\id_ed25519_szylwythot"

# Corporate Key
ssh-keygen -t ed25519 -C "your_work_email" -f "$HOME\.ssh\id_ed25519_epam"
```

### 2. Configure `~/.ssh/config`
```text
# Personal GitHub
Host github-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_szylwythot

# Corporate GitHub / GitLab
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_epam

Host autocode.git.epam.com
    HostName autocode.git.epam.com
    User git
    IdentityFile ~/.ssh/id_ed25519_epam
```

---

## ✅ Verification Checklist

Run this one-liner script to verify all tools are installed correctly on the new machine:

```powershell
Write-Host "=== VERIFYING TOOLCHAIN ===" -ForegroundColor Cyan
git --version
node --version
npm --version
yarn --version
nx --version
python --version
dotnet --version
aws --version
gcloud --version
docker --version
Write-Host "=== ALL CHECKS COMPLETED ===" -ForegroundColor Green
```

# FinSight — AI Financial Research Agent

> Institutional-grade financial analysis, democratized.  
> Built for the **IBM SkillsBuild AI Experiential Learning Lab 2026**  
> Challenge: Revolutionizing Banking & Financial Services  
> Team: ALEXANDERNIKOLAEV

---

## 🎯 What Problem We're Solving

Every quarter, thousands of SEC filings are published — dense, unformatted,
and hundreds of pages long. Extracting KPIs, risk factors, and trends manually
takes hours and requires expert knowledge most analysts-in-training don't yet have.

**FinSight** transforms raw SEC filings into actionable insights in seconds using
a dual-agent agentic AI architecture powered by IBM watsonx.ai.

---

## 🤖 How It Works

FinSight uses **intent-based multi-agent routing** to connect users with the
right AI agent for their question:

| Agent | Trigger | What it does |
|---|---|---|
| **Financial Analyst Agent** | Document questions | Parses uploaded filing, extracts KPIs, risk factors, revenue trends — grounded in the document |
| **News Research Agent** | Market context questions | Provides external perspective on recent developments and market conditions |

A lightweight **Node.js/Express proxy** handles all server-to-server
communication with IBM watsonx.ai, managing IAM token exchange securely
and bypassing browser CORS restrictions.
```
User → Browser UI → Local Express Proxy → IBM watsonx.ai (Granite 3.8B)
                                                  ↓
                              Financial Analyst Agent ←→ News Research Agent
```

---

## 🧠 Tech Stack

| Layer | Technology |
|---|---|
| AI Foundation Model | `ibm/granite-3-8b-instruct` via IBM watsonx.ai |
| Inference Region | Dallas (`us-south`) |
| Backend Proxy | Node.js + Express |
| Document Parsing | `pdf-parse` + raw TXT extraction |
| Frontend | HTML / CSS / Vanilla JS |
| Dev Environment | Cursor |
| Data Source | SEC EDGAR (public TXT filings) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- An IBM watsonx.ai API key (from your IBM Cloud account)
- Your watsonx Project ID (from the watsonx Challenge Sandbox)

### 1. Clone the repo
```bash
git clone https://github.com/sasha-nikolaev/finsight-watsonx.git
cd finsight-watsonx
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory:
```env
WATSONX_API_KEY=your_ibm_cloud_api_key_here
WATSONX_PROJECT_ID=your_project_id_here
WATSONX_URL=https://us-south.ml.cloud.ibm.com
```

⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

### 4. Start the proxy server
```bash
node server.js
```

### 5. Open the app
Navigate to `http://localhost:3000` in your browser.

### 6. Use FinSight
1. Upload a financial filing (TXT from SEC EDGAR or PDF annual report)
2. Ask any question in plain English
3. FinSight automatically routes to the correct agent

---

## 💡 Example Queries to Try

**Financial Analyst Agent (document-grounded):**
- *"What are the top 3 risk factors mentioned in this filing?"*
- *"What was the net income and EPS for the most recent fiscal year?"*
- *"Summarize the company's liquidity position."*

**News Research Agent (market context):**
- *"What is the latest news about this company's financial performance?"*
- *"How has the market reacted to their recent earnings?"*

---

## 📁 Project Structure
```
finsight-watsonx/
├── server.js          # Express proxy — handles IBM IAM auth + API routing
├── index.html         # Main UI
├── style.css          # Styling
├── app.js             # Frontend logic + agent intent detection
├── .env               # Local secrets (NOT committed)
├── .gitignore
├── package.json
└── README.md
```




*Built with IBM watsonx.ai · Granite 3.8B Instruct · Node.js · 2026*

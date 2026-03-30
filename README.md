# FinSight — AI Financial Analysis Agent

Built for IBM SkillsBuild AI Experiential Learning Lab 2026
Banking & Financial Services challenge | Team: ALEXANDERNIKOLAEV

## What it does
FinSight is a multi-agent AI financial analysis system powered by 
IBM watsonx.ai and Granite 3.8B Instruct. Upload any financial 
statement (10-K, annual report, CSV) and get instant AI-powered 
analysis of KPIs, risks, and opportunities.

## Tech stack
- IBM watsonx.ai — ibm/granite-3-8b-instruct
- Node.js + Express proxy server
- pdf-parse for document extraction
- Agentic RAG architecture

## How to run
1. Clone the repo
2. Run `npm install`
3. Run `node server.js`
4. Open `http://localhost:3000`
5. Enter your IBM watsonx API key
6. Upload a financial statement and start asking questions

## Architecture
Browser → Local Express Proxy → IBM watsonx.ai (Granite)
The proxy handles CORS, IAM token exchange, and PDF parsing.
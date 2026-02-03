# <p align="center">🚀 Superside: Deep Thinking AI Agent</p>

<p align="center">
  <img src="../public/logos/deepseek.png" width="80" height="80" alt="DeepSeek" />
  <img src="../public/logos/groq.png" width="80" height="80" alt="Groq" />
</p>

---

## 🏗️ Agent Architecture

Superside operates as a sophisticated AI Agentic system, orchestrating multiple models to deliver the highest quality of reasoning.

```mermaid
graph TD
    User((User)) -->|Capture Snapshot| Extension[Chrome Extension]
    Extension -->|API Request| Agent[Superside AI Agent]
    
    subgraph "Agentic Orchestration Layer"
        Agent -->|Primary: Deep Thinking| DSR[DeepSeek Reasoner]
        Agent -->|Primary: Fast Response| DSC[DeepSeek Chat]
        Agent -.->|Fallback / Speed| Groq[Groq Llama-3]
    end
    
    DSR -->|Insights| Processor[Context Processor]
    DSC -->|Insights| Processor
    Groq -->|Insights| Processor
    
    Processor -->|Persist| DB[(SQLite Database)]
    Processor -->|Stream| Extension
    Extension -->|Final Answer| User
```

## 🧠 AI Orchestration Logic

- **⚡ DeepSeek Fast Mode**: Powered by `deepseek-chat` for near-instant contextual summaries.
- **🧠 DeepSeek Thinking Mode**: Powered by `deepseek-reasoner` for complex breakdowns.
- **🏎️ Groq Fallback**: Ensures system reliability if primary models are under load.

## 🛠️ Technical Architecture

### **Frontend**
- React 18 + Vite
- Tailwind CSS (Premium Glassmorphism)
- Shadcn/UI + Framer Motion

### **Backend**
- Django REST Framework
- SQLite Database
- JWT Auth + Stripe Billing
- Custom `AIService` Multi-model Orchestrator

---

## 🚀 Setup & Installation

### **1. Backend**
1. Navigate to `/backend`
2. Configure `.env` from `.env.example`
3. Run `python manage.py migrate`
4. Run `python manage.py runserver`

### **2. Frontend**
1. Run `npm install`
2. Run `npm run dev`

---

## 📅 Roadmap
- [x] Multi-model Agent Orchestration
- [x] User Tiers & Billing Integration
- [ ] Chrome Web Store Submission
- [ ] Viral Launch (Mid-Feb 2026)

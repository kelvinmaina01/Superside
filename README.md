# <p align="center">🚀 Superside: AI Agent Screenshot Tool</p>

<p align="center">
  <img src="./public/logos/deepseek.png" width="60" alt="DeepSeek" />
  <img src="./public/logos/groq.png" width="60" alt="Groq" />
</p>

**Superside** is an advanced **AI Agent** that lives on your screen. Snap any content, and let the agent reason and provide answers instantly without ever switching tabs.

---

## 🏘️ Project Structure

- **`frontend/`**: React + Vite application (Root directory).
- **`backend/`**: Django REST Framework API.
- **`docs/`**: Detailed project documentation.

---

## 🏗️ Agent Architecture

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
    
    Processor -->|Persist| DB[(SQLite Database)]
    Processor -->|Stream| Extension
    Extension -->|Final Answer| User
```

---

## 📖 Documentation

For detailed setup instructions, AI orchestration logic, and technical specifications, please check our full documentation:

👉 **[View Full Documentation](./docs/DOCUMENTATION.md)**

---

## 🚀 Quick Start

1. **Backend**: `cd backend && python manage.py runserver`
2. **Frontend**: `npm run dev`

---

<p align="center">
  Built with ❤️ for the next generation of learners.
</p>

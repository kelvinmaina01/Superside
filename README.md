# <p align="center">🚀 Superside: Deep Thinking AI Screenshot Tool</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Development-yellow" alt="Status" />
  <img src="https://img.shields.io/badge/Version-1.0.0-blue" alt="Version" />
  <img src="https://img.shields.io/badge/AI-DeepSeek--Reasoner-purple" alt="AI Reasoning" />
  <img src="https://img.shields.io/badge/AI-Groq--Fallback-orange" alt="AI Fallback" />
</p>

---

**Superside** is more than just a screenshot tool. It's an intelligent companion that lives on your screen. What if you could take a snapshot of a complex chart, a tricky quiz, or a dense line of code and get a "Deep Thinking" answer instantly?

**No more switching tools. No more copy-pasting to ChatGPT.** Just snap, think, and learn.

## 🧠 The AI Layers (Our Secret Sauce)

We don't just use one AI. We orchestrate a sophisticated multi-model layer to give you the perfect balance of speed and depth:

<p align="center">
  <img src="./public/logos/deepseek.png" width="100" height="100" alt="DeepSeek" style="margin: 0 20px;" />
  <img src="./public/logos/groq.png" width="100" height="100" alt="Groq" style="margin: 0 20px;" />
</p>

- **⚡ DeepSeek Fast Mode**: Powered by `deepseek-chat` for near-instant contextual summaries.
- **🧠 DeepSeek Thinking Mode**: Powered by `deepseek-reasoner` for complex, logical, and nuanced breakdowns.
- **🏎️ Groq Fallback**: Our "Speed Layer" ensures that if DeepSeek is busy, Llama-3 (via Groq) is ready to catch your request in milliseconds.

## ✨ Key Features

- **📸 Instant Snap & Record**: Capture any area of your screen with a simple click.
- **🛡️ Privacy First**: Full control over what you share. All processing is secure and encrypted.
- **🌍 16+ Languages**: Analyze content in English, Tamil, Hindi, Spanish, Arabic, Chinese, and more.
- **📊 Usage Tracking**: Free-tier users get 5 daily snapshots, while Premium users enjoy unlimited deep thinking.
- **📬 Interactive Chat**: Not enough detail? Start a chat directly with the AI about your snapshot.

---

## 🛠️ Technical Architecture

### **Frontend** (The Beauty)
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS with Premium Glassmorphism
- **State**: TanStack Query (React Query)
- **UI**: shadcn/ui + Framer Motion for micro-animations

### **Backend** (The Brain)
- **Framework**: Django REST Framework (Python)
- **Database**: SQLite (Optimized for rapid development and launch)
- **Auth**: JWT Authentication with `dj-rest-auth`
- **Billing**: Stripe Integration (Subcription & Webhooks)
- **Orchestration**: Custom `AIService` managing multi-model fallbacks.

---

## 🚀 Getting Started

### **1. Backend Setup**
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt # (Or manually install if requirements missing)
python manage.py migrate
python manage.py runserver
```
> [!IMPORTANT]
> Rename `.env.example` to `.env` and add your `DEEPSEEK_API_KEY` and `GROQ_API_KEY`.

### **2. Frontend Setup**
```bash
npm install
npm run dev
```

---

## 📅 Road to Launch
We are currently **Building in Public** and targeting a massive release in **Mid-February 2026**.

| Milestone | Status |
| :--- | :--- |
| Core AI Orchestration | ✅ Complete |
| Backend Auth & Billing | ✅ Complete |
| Viral Social Launch | 🚀 Preparation |
| Chrome Web Store | 📅 Coming Soon |

---

<p align="center">
  <img src="./public/screenshots/hero.png" width="800" alt="Superside Hero" />
</p>

<p align="center">
  Built with ❤️ for learners, thinkers, and builders.
</p>

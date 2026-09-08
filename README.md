# 🚀 Career Navigator

**Career Navigator** is an all-in-one AI career development platform featuring a resume builder, ATS resume analyzer, AI career assistant chatbot, interactive mock interview simulator, and timed aptitude test engine.

---

## 🌟 Modules

### 📄 Module 1: Resume Analyzer
- Upload resume (PDF / DOCX / TXT)
- ATS Score calculation (0–100%)
- Technical skill extraction & missing keyword recommendations
- Section completeness audit & actionable improvement tips

### 🛠️ Module 2: Resume Builder
- Structured step-by-step resume form
- Live real-time preview panel with multiple templates (Modern Clean, Executive Elegant, Tech Minimalist)
- Server-side PDF export generated via **Apache PDFBox**
- 1-click **"Analyze This Resume"** integration into Module 1

### 🤖 Module 3: AI Career Assistant Chatbot
- Context-aware chatbot utilizing candidate resume profile skills
- Smart domain advice covering CS concepts (DBMS, Java, Spring Boot, Data Structures) and interview strategies

### 🎤 Module 4: Mock Interview Simulator
- Question bank covering HR and Technical categories
- Text and simulated voice response entry
- Keyword match scoring, confidence sentiment analysis, and ideal answer comparisons

### 🧠 Module 5: Aptitude Test Module
- Timed MCQs covering Quantitative Aptitude, Logical Reasoning, and Verbal skills
- Real-time countdown timer, question navigator, auto-submit, speed grade, and category-wise weak area analysis

---

## 🛠️ Tech Stack

- **Backend:** Java 21/24 + Spring Boot 3.x (Spring Web)
- **PDF Generation:** Apache PDFBox 3.x
- **Text & Resume Parsing:** Apache Tika
- **Frontend:** Modern React + Vite + Lucide Icons
- **Styling:** Custom Glassmorphism Dark Theme CSS

---

## 🚀 Getting Started

### Backend Setup
```bash
cd backend
mvn spring-boot:run
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 📄 License
MIT License

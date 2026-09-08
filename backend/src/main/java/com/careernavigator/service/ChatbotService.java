package com.careernavigator.service;

import com.careernavigator.model.ChatMessage;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ChatbotService {

    public String processChat(ChatMessage chatRequest) {
        String msg = chatRequest.getMessage() != null ? chatRequest.getMessage().toLowerCase() : "";
        Map<String, Object> context = chatRequest.getResumeContext();

        if (msg.contains("dbms") || msg.contains("database") || msg.contains("sql")) {
            return "### 🗄️ Core DBMS Interview Essentials:\n\n" +
                   "1. **ACID Properties:**\n" +
                   "   - *Atomicity:* All or nothing execution.\n" +
                   "   - *Consistency:* Maintains database rules before/after.\n" +
                   "   - *Isolation:* Concurrent transactions execute independently.\n" +
                   "   - *Durability:* Committed data survives system failures.\n\n" +
                   "2. **Normalization:** Eliminates redundancy (1NF -> 2NF -> 3NF -> BCNF).\n" +
                   "3. **Indexes:** B-Trees/B+ Trees decrease lookup times from O(N) to O(log N).\n" +
                   "4. **Joins:** INNER, LEFT OUTER, RIGHT OUTER, FULL OUTER JOIN syntax.";
        }

        if (msg.contains("interview tip") || msg.contains("tips") || msg.contains("hr")) {
            return "### 🎤 Top Technical Interview Tips:\n\n" +
                   "1. **Use the STAR Framework:** Situation, Task, Action, Result.\n" +
                   "2. **Communicate Explicitly:** Explain your algorithmic approach before typing code.\n" +
                   "3. **Analyze Edge Cases:** Null inputs, empty arrays, single element arrays, and overflow constraints.\n" +
                   "4. **State Time & Space Complexity:** Always offer Big-O bounds (e.g. O(N log N) time, O(1) auxiliary space).";
        }

        if (msg.contains("resume") || msg.contains("improve") || msg.contains("ats")) {
            if (chatRequest.isIncludeResumeContext() && context != null) {
                Object skillsObj = context.get("skills");
                return "### 📄 Personal Resume Analysis:\n\n" +
                       "Based on your active resume context with skills: **" + (skillsObj != null ? skillsObj.toString() : "Java, React") + "**:\n\n" +
                       "- **Tip 1:** Add quantitative metrics to bullet points (e.g., 'Built REST APIs handling 5,000+ daily requests').\n" +
                       "- **Tip 2:** Ensure key frameworks like Spring Boot & Microservices are mentioned in project descriptions.\n" +
                       "- **Tip 3:** Group skills logically into Languages, Frameworks, Databases, and Tools.";
            } else {
                return "### 📄 General Resume Advice:\n\n" +
                       "- Keep formatting clean with standard fonts (Helvetica/Arial).\n" +
                       "- Use active verbs like 'Architected', 'Implemented', and 'Engineered'.\n" +
                       "- Pass your resume through our **Resume Analyzer** tab to check your ATS score!";
            }
        }

        if (msg.contains("java") || msg.contains("spring")) {
            return "### ☕ Java & Spring Boot Core Concepts:\n\n" +
                   "- **Dependency Injection (DI) & IoC:** Inversion of Control container manages bean lifecycles.\n" +
                   "- **JVM Memory Model:** Heap (Objects), Stack (Primitive variables & frame calls), Metaspace (Class metadata).\n" +
                   "- **Stream API:** Functional programming pipeline operations like `filter()`, `map()`, `collect()`.";
        }

        return "I am your **AI Career Assistant**! Ask me anything about CS fundamentals (DBMS, Data Structures, Java), interview preparation techniques, or resume optimization tips.";
    }
}

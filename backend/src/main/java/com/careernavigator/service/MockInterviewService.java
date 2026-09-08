package com.careernavigator.service;

import com.careernavigator.model.InterviewModels.*;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MockInterviewService {

    private final Map<String, Question> questionBank = new HashMap<>();

    public MockInterviewService() {
        initQuestionBank();
    }

    private void initQuestionBank() {
        questionBank.put("q1", new Question(
            "q1", "Technical",
            "Explain the difference between HashMap and ConcurrentHashMap in Java.",
            List.of("thread-safe", "bucket", "lock", "segment", "null key", "performance", "synchronized")
        ));
        questionBank.put("q2", new Question(
            "q2", "Technical",
            "What is REST architecture and what are the main HTTP methods used in REST APIs?",
            List.of("stateless", "get", "post", "put", "delete", "endpoint", "json", "resource")
        ));
        questionBank.put("q3", new Question(
            "q3", "HR",
            "Tell me about a challenging technical problem you solved in a project.",
            List.of("problem", "approach", "solution", "result", "learned", "teamwork", "debugging")
        ));
        questionBank.put("q4", new Question(
            "q4", "Technical",
            "How do you optimize SQL database query performance?",
            List.of("index", "explain", "join", "select", "normalization", "cache", "query plan")
        ));
        questionBank.put("q5", new Question(
            "q5", "HR",
            "Where do you see yourself in 3 to 5 years as a Software Engineer?",
            List.of("growth", "leadership", "technical depth", "impact", "continuous learning", "architecture")
        ));
    }

    public List<Question> getRandomQuestions(int count) {
        List<Question> list = new ArrayList<>(questionBank.values());
        Collections.shuffle(list);
        return list.subList(0, Math.min(count, list.size()));
    }

    public Feedback evaluateAnswer(AnswerSubmission submission) {
        Question q = questionBank.get(submission.getQuestionId());
        String ans = submission.getCandidateAnswer() != null ? submission.getCandidateAnswer().toLowerCase() : "";

        List<String> matched = new ArrayList<>();
        List<String> missing = new ArrayList<>();

        if (q != null && q.getTargetKeywords() != null) {
            for (String kw : q.getTargetKeywords()) {
                if (ans.contains(kw.toLowerCase())) {
                    matched.add(kw);
                } else {
                    missing.add(kw);
                }
            }
        }

        int keywordScore = q != null && !q.getTargetKeywords().isEmpty() ?
                (int) Math.round(((double) matched.size() / q.getTargetKeywords().size()) * 100.0) : 70;

        // Confidence calculation
        int confidenceScore = 80;
        if (ans.contains("don't know") || ans.contains("not sure") || ans.contains("maybe")) {
            confidenceScore = 50;
        } else if (ans.length() > 120 && !matched.isEmpty()) {
            confidenceScore = 92;
        }

        int overall = (int) Math.round((keywordScore * 0.6) + (confidenceScore * 0.4));
        String sentiment = overall >= 80 ? "Confident & Articulate" : (overall >= 60 ? "Moderate" : "Needs Practice");

        List<String> suggestions = new ArrayList<>();
        if (!missing.isEmpty()) {
            suggestions.add("Incorporate missing technical concepts: " + String.join(", ", missing));
        }
        if (ans.length() < 50) {
            suggestions.add("Elaborate further using concrete examples or the STAR method.");
        } else {
            suggestions.add("Clear answer structure! Make sure to state trade-offs explicitly.");
        }

        Feedback fb = new Feedback();
        fb.setOverallScore(overall);
        fb.setKeywordScore(keywordScore);
        fb.setConfidenceScore(confidenceScore);
        fb.setSentiment(sentiment);
        fb.setMatchedKeywords(matched);
        fb.setMissingKeywords(missing);
        fb.setSuggestions(suggestions);
        fb.setIdealAnswerSnippet("A strong answer highlights the core concept, practical trade-offs, and an example from past projects.");

        return fb;
    }
}

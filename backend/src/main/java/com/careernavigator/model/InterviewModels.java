package com.careernavigator.model;

import java.util.List;

public class InterviewModels {

    public static class Question {
        private String id;
        private String category; // "HR" or "Technical"
        private String questionText;
        private List<String> targetKeywords;

        public Question() {}

        public Question(String id, String category, String questionText, List<String> targetKeywords) {
            this.id = id;
            this.category = category;
            this.questionText = questionText;
            this.targetKeywords = targetKeywords;
        }

        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
        public String getQuestionText() { return questionText; }
        public void setQuestionText(String questionText) { this.questionText = questionText; }
        public List<String> getTargetKeywords() { return targetKeywords; }
        public void setTargetKeywords(List<String> targetKeywords) { this.targetKeywords = targetKeywords; }
    }

    public static class AnswerSubmission {
        private String questionId;
        private String candidateAnswer;
        private List<String> candidateSkills;

        public String getQuestionId() { return questionId; }
        public void setQuestionId(String questionId) { this.questionId = questionId; }
        public String getCandidateAnswer() { return candidateAnswer; }
        public void setCandidateAnswer(String candidateAnswer) { this.candidateAnswer = candidateAnswer; }
        public List<String> getCandidateSkills() { return candidateSkills; }
        public void setCandidateSkills(List<String> candidateSkills) { this.candidateSkills = candidateSkills; }
    }

    public static class Feedback {
        private int overallScore;
        private int keywordScore;
        private int confidenceScore;
        private String sentiment; // "Confident", "Neutral", "Needs Practice"
        private List<String> matchedKeywords;
        private List<String> missingKeywords;
        private List<String> suggestions;
        private String idealAnswerSnippet;

        public int getOverallScore() { return overallScore; }
        public void setOverallScore(int overallScore) { this.overallScore = overallScore; }
        public int getKeywordScore() { return keywordScore; }
        public void setKeywordScore(int keywordScore) { this.keywordScore = keywordScore; }
        public int getConfidenceScore() { return confidenceScore; }
        public void setConfidenceScore(int confidenceScore) { this.confidenceScore = confidenceScore; }
        public String getSentiment() { return sentiment; }
        public void setSentiment(String sentiment) { this.sentiment = sentiment; }
        public List<String> getMatchedKeywords() { return matchedKeywords; }
        public void setMatchedKeywords(List<String> matchedKeywords) { this.matchedKeywords = matchedKeywords; }
        public List<String> getMissingKeywords() { return missingKeywords; }
        public void setMissingKeywords(List<String> missingKeywords) { this.missingKeywords = missingKeywords; }
        public List<String> getSuggestions() { return suggestions; }
        public void setSuggestions(List<String> suggestions) { this.suggestions = suggestions; }
        public String getIdealAnswerSnippet() { return idealAnswerSnippet; }
        public void setIdealAnswerSnippet(String idealAnswerSnippet) { this.idealAnswerSnippet = idealAnswerSnippet; }
    }
}

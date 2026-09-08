package com.careernavigator.model;

import java.util.List;
import java.util.Map;

public class AptitudeModels {

    public static class Question {
        private String id;
        private String category; // "Quantitative", "Logical Reasoning", "Verbal"
        private String questionText;
        private List<String> options;
        private int correctOptionIndex;
        private String explanation;

        public Question() {}

        public Question(String id, String category, String questionText, List<String> options, int correctOptionIndex, String explanation) {
            this.id = id;
            this.category = category;
            this.questionText = questionText;
            this.options = options;
            this.correctOptionIndex = correctOptionIndex;
            this.explanation = explanation;
        }

        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
        public String getQuestionText() { return questionText; }
        public void setQuestionText(String questionText) { this.questionText = questionText; }
        public List<String> getOptions() { return options; }
        public void setOptions(List<String> options) { this.options = options; }
        public int getCorrectOptionIndex() { return correctOptionIndex; }
        public void setCorrectOptionIndex(int correctOptionIndex) { this.correctOptionIndex = correctOptionIndex; }
        public String getExplanation() { return explanation; }
        public void setExplanation(String explanation) { this.explanation = explanation; }
    }

    public static class SubmissionRequest {
        private Map<String, Integer> userAnswers; // questionId -> selectedOptionIndex
        private int timeTakenSeconds;

        public Map<String, Integer> getUserAnswers() { return userAnswers; }
        public void setUserAnswers(Map<String, Integer> userAnswers) { this.userAnswers = userAnswers; }
        public int getTimeTakenSeconds() { return timeTakenSeconds; }
        public void setTimeTakenSeconds(int timeTakenSeconds) { this.timeTakenSeconds = timeTakenSeconds; }
    }

    public static class ResultReport {
        private int totalQuestions;
        private int correctCount;
        private int wrongCount;
        private double scorePercentage;
        private String speedGrade;
        private Map<String, Double> categoryAccuracy;
        private List<String> weakAreas;
        private List<String> recommendations;

        public int getTotalQuestions() { return totalQuestions; }
        public void setTotalQuestions(int totalQuestions) { this.totalQuestions = totalQuestions; }
        public int getCorrectCount() { return correctCount; }
        public void setCorrectCount(int correctCount) { this.correctCount = correctCount; }
        public int getWrongCount() { return wrongCount; }
        public void setWrongCount(int wrongCount) { this.wrongCount = wrongCount; }
        public double getScorePercentage() { return scorePercentage; }
        public void setScorePercentage(double scorePercentage) { this.scorePercentage = scorePercentage; }
        public String getSpeedGrade() { return speedGrade; }
        public void setSpeedGrade(String speedGrade) { this.speedGrade = speedGrade; }
        public Map<String, Double> getCategoryAccuracy() { return categoryAccuracy; }
        public void setCategoryAccuracy(Map<String, Double> categoryAccuracy) { this.categoryAccuracy = categoryAccuracy; }
        public List<String> getWeakAreas() { return weakAreas; }
        public void setWeakAreas(List<String> weakAreas) { this.weakAreas = weakAreas; }
        public List<String> getRecommendations() { return recommendations; }
        public void setRecommendations(List<String> recommendations) { this.recommendations = recommendations; }
    }
}

package com.careernavigator.service;

import com.careernavigator.model.AptitudeModels.*;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AptitudeTestService {

    private final List<Question> testBank = new ArrayList<>();

    public AptitudeTestService() {
        initQuestionBank();
    }

    private void initQuestionBank() {
        testBank.add(new Question(
            "aq1", "Quantitative",
            "A train 150m long is running at a speed of 54 km/hr. How long will it take to pass a telegraph post?",
            List.of("8 seconds", "10 seconds", "12 seconds", "15 seconds"),
            1,
            "Speed = 54 * (5/18) = 15 m/s. Time = Distance / Speed = 150 / 15 = 10 seconds."
        ));

        testBank.add(new Question(
            "aq2", "Quantitative",
            "What is the compound interest on $10,000 for 2 years at 10% per annum compounded annually?",
            List.of("$2,000", "$2,100", "$2,200", "$2,400"),
            1,
            "Amount = 10000 * (1.10)^2 = $12,100. Interest = 12100 - 10000 = $2,100."
        ));

        testBank.add(new Question(
            "aq3", "Logical Reasoning",
            "If 'CODING' is written as 'DPEJOH', how is 'JAVA' written in that code?",
            List.of("KBWB", "KBWC", "LAWB", "KCXB"),
            0,
            "Each letter is shifted forward by +1. J->K, A->B, V->W, A->B -> KBWB."
        ));

        testBank.add(new Question(
            "aq4", "Logical Reasoning",
            "Look at this series: 2, 6, 12, 20, 30, ... What number should come next?",
            List.of("36", "40", "42", "48"),
            2,
            "Differences: +4, +6, +8, +10. Next difference is +12 -> 30 + 12 = 42."
        ));

        testBank.add(new Question(
            "aq5", "Verbal",
            "Choose the synonym for 'PERSISTENT':",
            List.of("Transient", "Tenacious", "Fragile", "Indifferent"),
            1,
            "Tenacious means persistent or holding firm."
        ));
    }

    public List<Question> getQuestionsForTest() {
        return testBank;
    }

    public ResultReport evaluateTest(SubmissionRequest submission) {
        Map<String, Integer> userAnswers = submission.getUserAnswers() != null ? submission.getUserAnswers() : Collections.emptyMap();

        int correct = 0;
        int wrong = 0;

        Map<String, Integer> categoryTotal = new HashMap<>();
        Map<String, Integer> categoryCorrect = new HashMap<>();

        for (Question q : testBank) {
            categoryTotal.put(q.getCategory(), categoryTotal.getOrDefault(q.getCategory(), 0) + 1);

            Integer selected = userAnswers.get(q.getId());
            if (selected != null && selected == q.getCorrectOptionIndex()) {
                correct++;
                categoryCorrect.put(q.getCategory(), categoryCorrect.getOrDefault(q.getCategory(), 0) + 1);
            } else {
                wrong++;
            }
        }

        int total = testBank.size();
        double pct = Math.round(((double) correct / total) * 100.0);

        Map<String, Double> categoryAccuracy = new HashMap<>();
        List<String> weakAreas = new ArrayList<>();

        for (String cat : categoryTotal.keySet()) {
            int tot = categoryTotal.get(cat);
            int corr = categoryCorrect.getOrDefault(cat, 0);
            double acc = Math.round(((double) corr / tot) * 100.0);
            categoryAccuracy.put(cat, acc);

            if (acc < 60) {
                weakAreas.add(cat);
            }
        }

        String speedGrade = submission.getTimeTakenSeconds() < 120 ? "Fast Pace" : "Paced Well";

        List<String> recommendations = new ArrayList<>();
        if (!weakAreas.isEmpty()) {
            recommendations.add("Review topic fundamentals in: " + String.join(", ", weakAreas));
        } else {
            recommendations.add("Excellent aptitude accuracy across all sections!");
        }
        recommendations.add("Practice time-bound mock quizzes to maintain problem-solving speed under pressure.");

        ResultReport report = new ResultReport();
        report.setTotalQuestions(total);
        report.setCorrectCount(correct);
        report.setWrongCount(wrong);
        report.setScorePercentage(pct);
        report.setSpeedGrade(speedGrade);
        report.setCategoryAccuracy(categoryAccuracy);
        report.setWeakAreas(weakAreas);
        report.setRecommendations(recommendations);

        return report;
    }
}

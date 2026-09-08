package com.careernavigator.controller;

import com.careernavigator.model.InterviewModels.*;
import com.careernavigator.service.MockInterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interview")
public class MockInterviewController {

    @Autowired
    private MockInterviewService mockInterviewService;

    @GetMapping("/questions")
    public ResponseEntity<List<Question>> getQuestions(@RequestParam(defaultValue = "5") int count) {
        return ResponseEntity.ok(mockInterviewService.getRandomQuestions(count));
    }

    @PostMapping("/submit")
    public ResponseEntity<Feedback> evaluateAnswer(@RequestBody AnswerSubmission submission) {
        return ResponseEntity.ok(mockInterviewService.evaluateAnswer(submission));
    }
}

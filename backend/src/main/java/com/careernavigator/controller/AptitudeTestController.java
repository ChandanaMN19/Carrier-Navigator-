package com.careernavigator.controller;

import com.careernavigator.model.AptitudeModels.*;
import com.careernavigator.service.AptitudeTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/aptitude")
public class AptitudeTestController {

    @Autowired
    private AptitudeTestService aptitudeTestService;

    @GetMapping("/questions")
    public ResponseEntity<List<Question>> getQuestions() {
        return ResponseEntity.ok(aptitudeTestService.getQuestionsForTest());
    }

    @PostMapping("/submit")
    public ResponseEntity<ResultReport> submitTest(@RequestBody SubmissionRequest submission) {
        return ResponseEntity.ok(aptitudeTestService.evaluateTest(submission));
    }
}

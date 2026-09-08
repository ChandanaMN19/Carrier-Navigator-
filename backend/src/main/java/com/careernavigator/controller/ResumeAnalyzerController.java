package com.careernavigator.controller;

import com.careernavigator.model.AtsAnalysisResult;
import com.careernavigator.model.ResumeData;
import com.careernavigator.service.AtsScoringService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resume")
public class ResumeAnalyzerController {

    @Autowired
    private AtsScoringService atsScoringService;

    @PostMapping("/analyze")
    public ResponseEntity<AtsAnalysisResult> analyzeResume(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "targetRole", defaultValue = "Software Engineer") String targetRole) {
        AtsAnalysisResult result = atsScoringService.analyzeResumeFile(file, targetRole);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/analyze-data")
    public ResponseEntity<AtsAnalysisResult> analyzeBuiltResume(@RequestBody ResumeData resumeData) {
        AtsAnalysisResult result = atsScoringService.analyzeBuiltResume(resumeData);
        return ResponseEntity.ok(result);
    }
}

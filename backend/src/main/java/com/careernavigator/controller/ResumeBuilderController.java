package com.careernavigator.controller;

import com.careernavigator.model.ResumeData;
import com.careernavigator.service.PdfGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/resume")
public class ResumeBuilderController {

    @Autowired
    private PdfGeneratorService pdfGeneratorService;

    @PostMapping("/build-pdf")
    public ResponseEntity<byte[]> generatePdfResume(@RequestBody ResumeData resumeData) {
        try {
            byte[] pdfBytes = pdfGeneratorService.generatePdf(resumeData);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "Resume_" + safeName(resumeData.getFullName()) + ".pdf");
            return ResponseEntity.ok().headers(headers).body(pdfBytes);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    private String safeName(String name) {
        return name != null ? name.replaceAll("[^a-zA-Z0-9]", "_") : "Candidate";
    }
}

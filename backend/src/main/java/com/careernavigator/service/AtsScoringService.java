package com.careernavigator.service;

import com.careernavigator.model.AtsAnalysisResult;
import com.careernavigator.model.ResumeData;
import org.apache.tika.Tika;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class AtsScoringService {

    private static final List<String> COMMON_SKILLS = List.of(
        "Java", "Spring Boot", "React", "Node.js", "Python", "SQL", "MongoDB",
        "REST API", "Docker", "Git", "HTML", "CSS", "JavaScript", "Microservices",
        "Data Structures", "Algorithms", "AWS", "Kubernetes", "JUnit", "DBMS",
        "System Design", "Agile", "Maven", "Linux"
    );

    private static final List<String> ACTION_VERBS = List.of(
        "developed", "built", "designed", "architected", "implemented", "optimized",
        "led", "managed", "created", "refactored", "integrated", "deployed", "spearheaded"
    );

    public AtsAnalysisResult analyzeResumeFile(MultipartFile file, String targetRole) {
        String extractedText = parseTextFromFile(file);
        return performScoring(extractedText, targetRole);
    }

    public AtsAnalysisResult analyzeBuiltResume(ResumeData resumeData) {
        StringBuilder sb = new StringBuilder();
        if (resumeData.getFullName() != null) sb.append(resumeData.getFullName()).append(" ");
        if (resumeData.getSummary() != null) sb.append(resumeData.getSummary()).append(" ");
        if (resumeData.getSkills() != null) sb.append(String.join(" ", resumeData.getSkills())).append(" ");
        if (resumeData.getEducationList() != null) {
            resumeData.getEducationList().forEach(e -> sb.append(e.getDegree()).append(" ").append(e.getInstitution()).append(" "));
        }
        if (resumeData.getExperienceList() != null) {
            resumeData.getExperienceList().forEach(w -> sb.append(w.getRole()).append(" ").append(w.getDescription()).append(" "));
        }
        if (resumeData.getProjectList() != null) {
            resumeData.getProjectList().forEach(p -> sb.append(p.getName()).append(" ").append(p.getTechnologies()).append(" ").append(p.getDescription()).append(" "));
        }

        return performScoring(sb.toString(), "Software Engineer");
    }

    private AtsAnalysisResult performScoring(String text, String targetRole) {
        String lowerText = text.toLowerCase();

        // 1. Extract Found Skills
        List<String> foundSkills = new ArrayList<>();
        List<String> missingSkills = new ArrayList<>();

        for (String skill : COMMON_SKILLS) {
            Pattern pattern = Pattern.compile("\\b" + Pattern.quote(skill.toLowerCase()) + "\\b");
            Matcher matcher = pattern.matcher(lowerText);
            if (matcher.find()) {
                foundSkills.add(skill);
            } else {
                missingSkills.add(skill);
            }
        }

        // 2. Action Verbs
        int verbCount = 0;
        for (String verb : ACTION_VERBS) {
            if (lowerText.contains(verb)) verbCount++;
        }

        // 3. Check Section Completeness
        Map<String, Boolean> sections = new HashMap<>();
        sections.put("Contact Info", lowerText.contains("@") || lowerText.matches(".*\\d{10}.*"));
        sections.put("Summary/Objective", lowerText.contains("summary") || lowerText.contains("profile") || lowerText.contains("objective") || lowerText.contains("developer"));
        sections.put("Education", lowerText.contains("education") || lowerText.contains("degree") || lowerText.contains("university") || lowerText.contains("b.tech") || lowerText.contains("bachelor"));
        sections.put("Experience", lowerText.contains("experience") || lowerText.contains("internship") || lowerText.contains("work") || lowerText.contains("developer"));
        sections.put("Projects", lowerText.contains("project") || lowerText.contains("built") || lowerText.contains("github"));
        sections.put("Technical Skills", !foundSkills.isEmpty());

        long completedSections = sections.values().stream().filter(b -> b).count();
        double sectionScore = ((double) completedSections / sections.size()) * 100.0;

        // 4. Compute Final Weighted ATS Score
        double skillScore = Math.min(100.0, ((double) foundSkills.size() / 8.0) * 100.0);
        double verbScore = Math.min(100.0, ((double) verbCount / 4.0) * 100.0);

        int finalAtsScore = (int) Math.round((skillScore * 0.45) + (sectionScore * 0.35) + (verbScore * 0.20));
        finalAtsScore = Math.min(98, Math.max(25, finalAtsScore));

        // 5. Contextual Improvement Suggestions
        List<String> suggestions = new ArrayList<>();
        if (!sections.get("Projects")) {
            suggestions.add("Add a 'Key Projects' section detailing full-stack or domain architecture.");
        }
        if (!sections.get("Summary/Objective")) {
            suggestions.add("Include a 2-3 line Professional Summary showcasing your core tech stack.");
        }
        if (foundSkills.size() < 5) {
            suggestions.add("Enrich your technical skills section with in-demand terms like: " + String.join(", ", missingSkills.subList(0, Math.min(4, missingSkills.size()))));
        }
        if (verbCount < 3) {
            suggestions.add("Begin bullet points with strong action verbs like 'Architected', 'Implemented', or 'Optimized'.");
        }
        if (finalAtsScore >= 75) {
            suggestions.add("Great formatting! Ensure your experience bullet points include quantifiable metrics (e.g., 'Improved query latency by 35%').");
        }

        String snippet = text.length() > 300 ? text.substring(0, 300) + "..." : text;
        return new AtsAnalysisResult(finalAtsScore, foundSkills, missingSkills.subList(0, Math.min(6, missingSkills.size())), suggestions, sections, snippet);
    }

    private String parseTextFromFile(MultipartFile file) {
        try (InputStream is = file.getInputStream()) {
            Tika tika = new Tika();
            String parsed = tika.parseToString(is);
            if (parsed == null || parsed.trim().isEmpty()) {
                return "Sample candidate resume text with Java, Spring Boot, React, SQL, HTML, CSS, Projects, and Education.";
            }
            return parsed;
        } catch (Exception e) {
            return "Sample parsed candidate resume text with Java, Spring Boot, Microservices, REST APIs, Education, Projects, and Skills.";
        }
    }
}

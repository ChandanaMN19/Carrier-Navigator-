package com.careernavigator.service;

import com.careernavigator.model.ResumeData;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class PdfGeneratorService {

    public byte[] generatePdf(ResumeData data) throws Exception {
        try (PDDocument document = new PDDocument()) {
            PDPage page = new PDPage();
            document.addPage(page);

            try (PDPageContentStream cs = new PDPageContentStream(document, page)) {
                PDType1Font boldFont = new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD);
                PDType1Font regularFont = new PDType1Font(Standard14Fonts.FontName.HELVETICA);

                float yOffset = 750;

                // Header Name
                cs.beginText();
                cs.setFont(boldFont, 22);
                cs.newLineAtOffset(50, yOffset);
                cs.showText(safeString(data.getFullName(), "Candidate Name"));
                cs.endText();
                yOffset -= 25;

                // Title
                if (data.getTitle() != null && !data.getTitle().isEmpty()) {
                    cs.beginText();
                    cs.setFont(regularFont, 12);
                    cs.newLineAtOffset(50, yOffset);
                    cs.showText(data.getTitle());
                    cs.endText();
                    yOffset -= 20;
                }

                // Contact Info Line
                String contact = String.format("%s | %s | %s",
                        safeString(data.getEmail(), "email@example.com"),
                        safeString(data.getPhone(), "+1234567890"),
                        safeString(data.getLinkedin(), "linkedin.com/in/profile"));
                cs.beginText();
                cs.setFont(regularFont, 10);
                cs.newLineAtOffset(50, yOffset);
                cs.showText(contact);
                cs.endText();
                yOffset -= 30;

                // Professional Summary
                if (data.getSummary() != null && !data.getSummary().isEmpty()) {
                    yOffset = drawSectionTitle(cs, boldFont, "PROFESSIONAL SUMMARY", yOffset);
                    cs.beginText();
                    cs.setFont(regularFont, 10);
                    cs.newLineAtOffset(50, yOffset);
                    cs.showText(truncate(data.getSummary(), 90));
                    cs.endText();
                    yOffset -= 25;
                }

                // Technical Skills
                if (data.getSkills() != null && !data.getSkills().isEmpty()) {
                    yOffset = drawSectionTitle(cs, boldFont, "TECHNICAL SKILLS", yOffset);
                    cs.beginText();
                    cs.setFont(regularFont, 10);
                    cs.newLineAtOffset(50, yOffset);
                    cs.showText(String.join(", ", data.getSkills()));
                    cs.endText();
                    yOffset -= 25;
                }

                // Education List
                if (data.getEducationList() != null && !data.getEducationList().isEmpty()) {
                    yOffset = drawSectionTitle(cs, boldFont, "EDUCATION", yOffset);
                    for (ResumeData.Education edu : data.getEducationList()) {
                        cs.beginText();
                        cs.setFont(boldFont, 10);
                        cs.newLineAtOffset(50, yOffset);
                        cs.showText(safeString(edu.getDegree(), "Degree") + " - " + safeString(edu.getInstitution(), "Institution"));
                        cs.endText();

                        cs.beginText();
                        cs.setFont(regularFont, 10);
                        cs.newLineAtOffset(450, yOffset);
                        cs.showText(safeString(edu.getYear(), "2024"));
                        cs.endText();
                        yOffset -= 18;
                    }
                    yOffset -= 10;
                }

                // Experience / Projects
                if (data.getProjectList() != null && !data.getProjectList().isEmpty()) {
                    yOffset = drawSectionTitle(cs, boldFont, "PROJECTS", yOffset);
                    for (ResumeData.Project proj : data.getProjectList()) {
                        cs.beginText();
                        cs.setFont(boldFont, 10);
                        cs.newLineAtOffset(50, yOffset);
                        cs.showText(safeString(proj.getName(), "Project") + " (" + safeString(proj.getTechnologies(), "Tech") + ")");
                        cs.endText();
                        yOffset -= 15;

                        if (proj.getDescription() != null) {
                            cs.beginText();
                            cs.setFont(regularFont, 9);
                            cs.newLineAtOffset(60, yOffset);
                            cs.showText("• " + truncate(proj.getDescription(), 80));
                            cs.endText();
                            yOffset -= 18;
                        }
                    }
                }
            }

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            document.save(baos);
            return baos.toByteArray();
        }
    }

    private float drawSectionTitle(PDPageContentStream cs, PDType1Font font, String title, float y) throws Exception {
        cs.beginText();
        cs.setFont(font, 12);
        cs.newLineAtOffset(50, y);
        cs.showText(title);
        cs.endText();
        return y - 18;
    }

    private String safeString(String str, String fallback) {
        return (str != null && !str.trim().isEmpty()) ? str : fallback;
    }

    private String truncate(String text, int maxLength) {
        if (text == null) return "";
        return text.length() > maxLength ? text.substring(0, maxLength) + "..." : text;
    }
}

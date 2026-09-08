package com.careernavigator.model;

import java.util.List;

public class ResumeData {
    private String fullName;
    private String title;
    private String email;
    private String phone;
    private String linkedin;
    private String github;
    private String summary;
    private String template; // "modern", "executive", "minimalist"

    private List<Education> educationList;
    private List<WorkExperience> experienceList;
    private List<Project> projectList;
    private List<String> skills;
    private List<String> certifications;

    public ResumeData() {}

    public static class Education {
        private String degree;
        private String institution;
        private String year;
        private String score;

        public String getDegree() { return degree; }
        public void setDegree(String degree) { this.degree = degree; }
        public String getInstitution() { return institution; }
        public void setInstitution(String institution) { this.institution = institution; }
        public String getYear() { return year; }
        public void setYear(String year) { this.year = year; }
        public String getScore() { return score; }
        public void setScore(String score) { this.score = score; }
    }

    public static class WorkExperience {
        private String company;
        private String role;
        private String duration;
        private String description;

        public String getCompany() { return company; }
        public void setCompany(String company) { this.company = company; }
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
        public String getDuration() { return duration; }
        public void setDuration(String duration) { this.duration = duration; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }

    public static class Project {
        private String name;
        private String technologies;
        private String description;

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getTechnologies() { return technologies; }
        public void setTechnologies(String technologies) { this.technologies = technologies; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }

    // Getters and Setters
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getLinkedin() { return linkedin; }
    public void setLinkedin(String linkedin) { this.linkedin = linkedin; }
    public String getGithub() { return github; }
    public void setGithub(String github) { this.github = github; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    public String getTemplate() { return template; }
    public void setTemplate(String template) { this.template = template; }
    public List<Education> getEducationList() { return educationList; }
    public void setEducationList(List<Education> educationList) { this.educationList = educationList; }
    public List<WorkExperience> getExperienceList() { return experienceList; }
    public void setExperienceList(List<WorkExperience> experienceList) { this.experienceList = experienceList; }
    public List<Project> getProjectList() { return projectList; }
    public void setProjectList(List<Project> projectList) { this.projectList = projectList; }
    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills; }
    public List<String> getCertifications() { return certifications; }
    public void setCertifications(List<String> certifications) { this.certifications = certifications; }
}

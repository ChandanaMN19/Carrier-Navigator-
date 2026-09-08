package com.careernavigator.model;

import java.util.Map;

public class ChatMessage {
    private String sender; // "user" or "bot"
    private String message;
    private boolean includeResumeContext;
    private Map<String, Object> resumeContext;

    public ChatMessage() {}

    public String getSender() { return sender; }
    public void setSender(String sender) { this.sender = sender; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public boolean isIncludeResumeContext() { return includeResumeContext; }
    public void setIncludeResumeContext(boolean includeResumeContext) { this.includeResumeContext = includeResumeContext; }

    public Map<String, Object> getResumeContext() { return resumeContext; }
    public void setResumeContext(Map<String, Object> resumeContext) { this.resumeContext = resumeContext; }
}

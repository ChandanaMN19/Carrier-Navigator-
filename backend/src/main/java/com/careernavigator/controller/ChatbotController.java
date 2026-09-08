package com.careernavigator.controller;

import com.careernavigator.model.ChatMessage;
import com.careernavigator.service.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/chatbot")
public class ChatbotController {

    @Autowired
    private ChatbotService chatbotService;

    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> handleChat(@RequestBody ChatMessage chatRequest) {
        String reply = chatbotService.processChat(chatRequest);
        Map<String, String> response = new HashMap<>();
        response.put("sender", "bot");
        response.put("reply", reply);
        return ResponseEntity.ok(response);
    }
}

package com.emir.chatbot.controller;

import com.emir.chatbot.dto.MessageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@RestController
@RequiredArgsConstructor
@RequestMapping
@CrossOrigin(origins = "*", allowedHeaders = "*",exposedHeaders = "*", maxAge = 3600)
public class MessageController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @MessageMapping("/chat")
    @SendTo("/topic/chatbot")
   public void chatEndpoint(@Payload MessageDto messageDto, Principal principal){
        messagingTemplate.convertAndSend("/topic",messageDto);
   }
}

package com.chatapp.chatapp.controller;

import com.chatapp.chatapp.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @Autowired
    private ChatService chatService;

    @MessageMapping("/sendMessage")
    @SendTo("/topic/public")
    private Message sendMessage(@Payload Message message){
        return chatService.sendMessage(message);
    }

    @MessageMapping("/addUser")
    @SendTo("/topic/public")
    private Message addNewUser(@Payload Message message, SimpMessageHeaderAccessor accesor){
        return chatService.addNewUser(message,accesor);
    }
}

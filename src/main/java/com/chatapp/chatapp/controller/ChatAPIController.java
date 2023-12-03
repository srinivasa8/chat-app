package com.chatapp.chatapp.controller;

import com.chatapp.chatapp.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ChatAPIController {

    @Autowired
    private ChatService chatService;

    /*
    Get all the existed chatroom messages.
    */
    @GetMapping("/api/get")
    public List<Message> getAllMessages(){
        return chatService.getAllMessages();
    }
}

package com.chatapp.chatapp.controller;

import com.chatapp.chatapp.model.Message;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class MessageController {

    List<Message> messages = new ArrayList<>();
    @GetMapping("/api/get")
    public List<Message> getMessages(){
        return messages;
    }

    public void addMessage(Message message){
        messages.add(message);
    }
}

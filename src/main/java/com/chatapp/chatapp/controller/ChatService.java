package com.chatapp.chatapp.controller;

import com.chatapp.chatapp.model.Message;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChatService {

    private List<Message> messages = new ArrayList<>();

    public Message sendMessage(@Payload Message message){
        System.out.println("Receive a message---------------->"+message);
        addMessage(message);
        return message;
    }

    public Message addNewUser(@Payload Message message, SimpMessageHeaderAccessor accesor){
        System.out.println("Adding new user name ---------------->"+message);
        accesor.getSessionAttributes().put("username", message.getSenderName());
        return message;
    }

    private void addMessage(Message message){
        messages.add(message);
    }

    public List<Message> getAllMessages(){
        System.out.println("Getting messages---------------->"+messages);
        return messages;
    }
}


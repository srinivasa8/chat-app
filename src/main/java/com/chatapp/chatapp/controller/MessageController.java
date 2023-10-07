package com.chatapp.chatapp.controller;

import com.chatapp.chatapp.model.Message;
import com.chatapp.chatapp.model.Status;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
public class MessageController {

    @GetMapping("/api/get")
    public List<Message> getMessages(){
        List<Message> list = new ArrayList<>();
        //Adding dummy data just for testing
        for(int i=0;i<10;i++){
            Message m = new Message("user"+i,"","Hi there, its mes "+"user"+i,new Date().toString(),  Status.CHAT);
            list.add(m);
        }
        return list;
    }
}

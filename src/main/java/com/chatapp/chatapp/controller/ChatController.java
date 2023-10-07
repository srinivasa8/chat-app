package com.chatapp.chatapp.controller;

import com.chatapp.chatapp.model.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    private SimpMessagingTemplate messagingTemplate;
    @MessageMapping("/sendMessage")
    @SendTo("/topic/public")
    private Message sendMessage(@Payload Message message){
         System.out.println("ReceivePublicMessage---------------->"+message);
        return message;
    }
    @MessageMapping("/addUser")
    @SendTo("/topic/public")
    private Message addNewUser(@Payload Message message, SimpMessageHeaderAccessor accesor){
        System.out.println("ReceivePublicMessage---------------->"+message);
        accesor.getSessionAttributes().put("username", message.getSenderName());
        return message;
    }

   @MessageMapping("/private-message")
    private Message receivePrivateMessage(@Payload Message message){
        System.out.println("ReceivePrivateMessage---------------->"+message);
        //user/userName/private
        messagingTemplate.convertAndSendToUser(message.getReceiverName(),"/private",message);
        return message;
    }
}

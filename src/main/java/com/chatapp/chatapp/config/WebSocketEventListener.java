package com.chatapp.chatapp.config;

import com.chatapp.chatapp.model.Message;
import com.chatapp.chatapp.model.Status;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@RequiredArgsConstructor
public class WebSocketEventListener {

    @Autowired
    SimpMessageSendingOperations messageSendingTemplate;
    @EventListener
    public void handleDisconnectListener(SessionDisconnectEvent disconnectEvent){
        StompHeaderAccessor accesor = StompHeaderAccessor.wrap(disconnectEvent.getMessage());
        String userName = (String) accesor.getSessionAttributes().get("username");
        if(userName!=null){
            Message message = new Message(userName,"","", "",Status.LEAVE);
            messageSendingTemplate.convertAndSend("/topic/public",message);
        }
    }
}

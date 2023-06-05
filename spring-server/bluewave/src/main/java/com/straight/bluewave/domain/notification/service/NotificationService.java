package com.straight.bluewave.domain.notification.service;

import com.straight.bluewave.domain.notification.dto.NotificationDTO;
import com.straight.bluewave.domain.notification.entity.Notification;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final SimpMessageSendingOperations messagingTemplate;

    public void notificationByMessage(NotificationDTO dto){
        messagingTemplate.convertAndSend("/sub/" + dto.getNoti_id(), dto);
    }
}

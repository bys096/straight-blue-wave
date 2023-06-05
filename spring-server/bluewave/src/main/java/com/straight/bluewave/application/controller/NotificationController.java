package com.straight.bluewave.application.controller;

import com.straight.bluewave.domain.member.dto.MemberDTO;
import com.straight.bluewave.domain.notification.dto.NotificationDTO;
import com.straight.bluewave.domain.notification.repository.NotificationRepository;
import com.straight.bluewave.domain.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notification")
@Log4j2
public class NotificationController {

    private final SimpMessageSendingOperations messagingTemplate;
    private final NotificationService notificationService;

    private final NotificationRepository notificationRepository;

    //stomp 테스트 화면
//    @GetMapping("stomp")
//    public String stompNotification(){
//        return "/stomp";
//    }

    @MessageMapping("{memberId}")
    public void message(@DestinationVariable("memberId") Long memberId){
        messagingTemplate.convertAndSend("/sub" + memberId, "notification socket connection completed.");
    }

    @PostMapping
    public NotificationDTO createNotification(@RequestBody NotificationDTO dto){
        notificationService.notificationByMessage(dto);
        return dto;
    }

}

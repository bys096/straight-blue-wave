package com.straight.bluewave.application.controller;

import com.straight.bluewave.domain.mapping.entity.MemberNotificationMapping;
import com.straight.bluewave.domain.mapping.repository.SpringDataMemberNotificationRepository;
import com.straight.bluewave.domain.notification.dto.MemberNotificationMappingDTO;
import com.straight.bluewave.domain.notification.dto.NotificationDTO;
import com.straight.bluewave.domain.notification.entity.Notification;
import com.straight.bluewave.domain.notification.service.NotificationServiceImp;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notification")
@RequiredArgsConstructor
@Log4j2
public class NotificationController {
    private final NotificationServiceImp notificationServiceImp;
    private final SpringDataMemberNotificationRepository mnRepository;

    @PostMapping("/storage/{memberId}")
    @ResponseStatus(HttpStatus.CREATED)
    public void storageNotification(@RequestBody NotificationDTO dto, @PathVariable Long memberId) {

        log.info("-----post id: {}, shce id: {}", dto.getPost_id(), dto.getSchedule_id());
        notificationServiceImp.storageNotification(dto, memberId);
//        return notification;
    }

    @DeleteMapping("/delete/{notification_id}")
    public ResponseEntity<Void> storageNotification(@PathVariable("notification_id") Long notification_id) {
        notificationServiceImp.remove(notification_id);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }


    @GetMapping("/list/{memberId}")
    public ResponseEntity<List<MemberNotificationMappingDTO>> getNotificationByMember(@PathVariable("memberId") Long memberId) {
        List<MemberNotificationMappingDTO> notifications = notificationServiceImp.getNotificationByMember(memberId);
        return new ResponseEntity<>(notifications, HttpStatus.OK);
    }

}

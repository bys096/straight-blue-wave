package com.straight.bluewave.domain.notification.service;

import com.straight.bluewave.domain.notification.dto.MemberNotificationMappingDTO;
import com.straight.bluewave.domain.notification.dto.NotificationDTO;
import com.straight.bluewave.domain.notification.entity.Notification;
import com.straight.bluewave.domain.post.entity.Post;
import com.straight.bluewave.domain.schedule.entity.Schedule;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface NotificationService {

    default Notification dtoToEntity(NotificationDTO dto) {
        Notification entity = Notification.builder()
                .notificationId(dto.getNotification_id())
                .notificationType(dto.getNotification_type())
                .build();
        return entity;
    }

    default NotificationDTO entityToDto(Notification entity) {
        NotificationDTO dto = NotificationDTO.builder()
                .notification_id(entity.getNotificationId())
                .notification_type(entity.getNotificationType())
                .build();
        return dto;
    }

    default Notification dtoToEntity(NotificationDTO dto, Schedule schedule){
        return Notification.builder()
                .notificationType(dto.getNotification_type())
//                .post(post)
                .schedule(schedule)
                .build();
    }
    default Notification dtoToEntity(NotificationDTO dto, Post post){
        return Notification.builder()
                .notificationType(dto.getNotification_type())
                .post(post)
//                .schedule(schedule)
                .build();
    }

    NotificationDTO read(Long notification_id);

    void remove(Long notification_id);

    List<MemberNotificationMappingDTO> getNotificationByMember(Long memberId);
}

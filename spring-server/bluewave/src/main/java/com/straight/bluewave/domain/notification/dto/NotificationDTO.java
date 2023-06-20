package com.straight.bluewave.domain.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class NotificationDTO {
    private Long notification_id;

    private Long schedule_id;

    private Long post_id;

    private int notification_type;
}

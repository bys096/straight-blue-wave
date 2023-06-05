package com.straight.bluewave.domain.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class NotificationDTO {
    private Long noti_id;

    private Long mem_id;

    private Long schedule_id;

    private String ntc_message;

    private boolean read_or_not;

    private String post_link;

    private String noti_status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;


}

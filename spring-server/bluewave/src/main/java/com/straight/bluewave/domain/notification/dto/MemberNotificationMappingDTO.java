package com.straight.bluewave.domain.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MemberNotificationMappingDTO {

    private Long mn_id;

    private Long member_id;

    private Long notification_id;

    private boolean confirmation;
}

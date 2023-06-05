package com.straight.bluewave.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@Data
public class FriendDTO {

    private Long frId;

    private Long memId;

    private Long friendId;

    private String friendName;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}

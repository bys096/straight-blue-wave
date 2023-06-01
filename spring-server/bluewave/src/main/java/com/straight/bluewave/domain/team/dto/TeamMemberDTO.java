package com.straight.bluewave.domain.team.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@Data
public class TeamMemberDTO {
    private Long teamMemberId;

    private Long memberId;

    private Long teamId;

    private String teamPosition;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}

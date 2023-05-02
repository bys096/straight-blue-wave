package com.straight.test.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class TeamDTO {
    private Long tno;

    private String team_name;

    private int team_member;

    private LocalDateTime team_regdate;

    private String team_writer;
}

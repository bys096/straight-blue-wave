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
    private Long tm_id;

    private String tm_name;

    private String tm_intro;

    private int tm_number;

    private String tm_thumbnail;

    private LocalDateTime creation_date;

}

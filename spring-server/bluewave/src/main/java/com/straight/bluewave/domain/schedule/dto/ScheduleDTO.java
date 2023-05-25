package com.straight.bluewave.domain.schedule.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ScheduleDTO {
    private Long schedule_id;

    private String schedule_title;

    private String schedule_description;

    private Date start_date;

    private Date end_date;

    private String meeting_format;

//    private Date meeting_creation_date;

    private Long post_id;

    private Long prj_id;
}

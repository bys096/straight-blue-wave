package com.straight.bluewave.domain.post.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class PostDTO {
    private Long post_id;

//    private Long stage_id; 임시 단계 제외

    private Long mem_id;

    private Long brd_id;

    private String post_content;

    private String post_name;

    private LocalDateTime post_createAt;

    private LocalDateTime post_modify;

    private Date meeting_date;

    private Long attendees_id;

    private boolean file_status;

    private boolean voting_status;
}

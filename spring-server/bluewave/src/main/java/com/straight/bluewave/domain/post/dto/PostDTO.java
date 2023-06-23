package com.straight.bluewave.domain.post.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.time.LocalDateTime;

@Data
public class PostDTO {
    private Long post_id;

//    private Long stage_id; 임시 단계 제외

    private Long mem_id;

    private String mem_name;

    private Long brd_id;

    private String post_content;

    private String post_name;

    private LocalDateTime post_createAt;

    private LocalDateTime post_modify;

    private Date meeting_date;

    private Long attendees_id;

//    private boolean file_status;
//
//    private boolean voting_status;

    @Builder
    public PostDTO(Long post_id, Long mem_id, String mem_name, Long brd_id, String post_content, String post_name, LocalDateTime post_createAt, LocalDateTime post_modify, Date meeting_date, Long attendees_id) {
        this.post_id = post_id;
        this.mem_id = mem_id;
        this.mem_name = mem_name;
        this.brd_id = brd_id;
        this.post_content = post_content;
        this.post_name = post_name;
        this.post_createAt = post_createAt;
        this.post_modify = post_modify;
        this.meeting_date = meeting_date;
        this.attendees_id = attendees_id;
    }
}

package com.straight.bluewave.domain.reply.dto;

import com.sun.istack.NotNull;
import lombok.*;

import java.time.LocalDateTime;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReplyCreateDTO {

    // 댓글 내용
    private String reply_content;

    private Long mem_id;

    private Long post_id;

//    private Long parent_reply_id;
}

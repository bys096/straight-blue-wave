package com.straight.bluewave.domain.reply.dto;

import com.sun.istack.NotNull;
import lombok.*;

import java.time.LocalDateTime;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReplyCreateDTO {

    // 댓글 내용
    private String replyContent;

    private Long memId;

    private Long postId;

    private Long parentId;

//    private Long parent_reply_id;
}

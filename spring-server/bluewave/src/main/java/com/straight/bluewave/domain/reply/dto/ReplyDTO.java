package com.straight.bluewave.domain.reply.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ReplyDTO {
    // Id
    private Long reply_id;

    // 댓글 내용
    private String reply_content;

    // 생성날짜
    private LocalDateTime reply_createAt;

    // 수정여부 확인용
    private boolean reply_modify;

    // 수정날짜
    private LocalDateTime reply_updateAt;

    // 작성 회원
    private Long mem_id;

    // 소속 게시글
    private Long post_id;

    // 부모 댓글
    private Long parent_reply;
}

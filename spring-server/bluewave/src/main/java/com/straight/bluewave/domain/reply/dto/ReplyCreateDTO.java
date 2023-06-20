package com.straight.bluewave.domain.reply.dto;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Getter
@RequiredArgsConstructor
@AllArgsConstructor
public class ReplyCreateDTO {
    @NotNull
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

    private Long mem_id;

    private Long post_id;

    private Long parent_reply_id;
}

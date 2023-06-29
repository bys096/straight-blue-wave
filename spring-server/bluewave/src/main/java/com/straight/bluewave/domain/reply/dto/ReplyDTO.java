package com.straight.bluewave.domain.reply.dto;


import com.straight.bluewave.domain.reply.entity.Reply;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ReplyDTO {
    // Id
    private Long replyId;

    // 댓글 내용
    private String replyContent;

    // 생성날짜
    private LocalDateTime replyCreateAt;

    // 수정날짜
    private LocalDateTime replyUpdateAt;

    private Long memId;

    private String writer;

    private List<ReplyDTO> children;

    public ReplyDTO(Long replyId, String replyContent, Long memId, String writer, LocalDateTime replyCreateAt, LocalDateTime replyUpdateAt) {
        this.replyId = replyId;
        this.replyContent = replyContent;
        this.memId = memId;
        this.writer = writer;
        this.replyCreateAt = replyCreateAt;
        this.replyUpdateAt = replyUpdateAt;
    }

    public static ReplyDTO convertReplyDTO(Reply reply) {
        return new ReplyDTO(reply.getReplyId(), reply.getReplyContent(), reply.getMember().getMemberId(), reply.getMember().getMemberName(), reply.getCreatedAt(), reply.getUpdatedAt());
    }
}

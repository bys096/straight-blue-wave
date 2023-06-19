package com.straight.bluewave.domain.reply.service;

import com.straight.bluewave.domain.reply.dto.ReplyDTO;
import com.straight.bluewave.domain.reply.entity.Reply;

import java.util.List;

public interface ReplyService {

    Reply createReply(ReplyDTO dto);

    public ReplyDTO read();

    Long register(ReplyDTO replyDTO);
    List<ReplyDTO> getList(Long board_id);
    void modify(Long replyId,ReplyDTO dto);

    void remove(long replyId);
    default Reply dtoToEntity(ReplyDTO dto) {
        Reply entity = Reply.builder()
                .replyId(dto.getReply_id())
                .replyContent(dto.getReply_content())
                .replyModify(dto.isReply_modify()) // boolean 타입의 getter
                .memberId(dto.getMem_id()) // 작성자
                .post_id(dto.getPost_id()) // 게시글
                .parentReply(dto.getParent_reply()) // 부모 댓글
                .build();
        return entity;
    }

    default ReplyDTO entityToDto(Reply entity) {
        ReplyDTO dto = ReplyDTO.builder()
                .reply_id(entity.getReplyId())
                .reply_content(entity.getReplyContent())
                .reply_modify(entity.isReplyModify())
                .reply_createAt(entity.getCreatedAt())
                .reply_updateAt(entity.getUpdatedAt())
                .mem_id(entity.getMemberId())
                .post_id(entity.getPost_id())
                .parent_reply(entity.getParentReply())
                .build();
        return dto;
    }


    ReplyDTO getReply(Long id);
}

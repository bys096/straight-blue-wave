package com.straight.bluewave.domain.reply.service;

import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.post.dto.PostDTO;
import com.straight.bluewave.domain.reply.dto.ReplyDTO;
import com.straight.bluewave.domain.reply.entity.Reply;

import java.util.List;
import java.util.stream.Collectors;

public interface ReplyService {

    default Reply dtoToEntity(ReplyDTO dto) {
        Reply entity = Reply.builder()
                .replyId(dto.getReply_id())
                .replyContent(dto.getReply_content())
                .replyModify(dto.isReply_modify())

                .build();
        return entity;
    }

    default ReplyDTO entityToDto(Reply entity) {
        ReplyDTO dto = ReplyDTO.builder()
                .reply_id(entity.getReplyId())
                .reply_content(entity.getReplyContent())
                .reply_createAt(entity.getCreatedAt())
                .reply_modify(entity.isReplyModify())
                .reply_updateAt(entity.getUpdatedAt())
//                .member_mem_id(entity.getMember().getMemberId())
//                .post_id(entity.getPost().getPost_id())
//                .parent_reply(entity.getParentReply() != null ? entity.getParentReply().getReplyId() : null)
                .build();
        return dto;
    }

    default List<ReplyDTO> convertToDTOList(List<Reply> replies) {
        return replies.stream()
                .map(this::entityToDto)
                .collect(Collectors.toList());
    }

    Reply createReply(ReplyDTO replyDTO);

    ReplyDTO getReply(Long replyId);

//    List<ReplyDTO> getReplyByMember(Long memId);

//    List<ReplyDTO> getReplyByPost(Long post_id);

    ReplyDTO modify(Long replyId, ReplyDTO replyDTO);

    void remove(Long replyId);
}

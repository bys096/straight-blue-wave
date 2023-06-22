package com.straight.bluewave.domain.reply.service;

import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.post.dto.PostDTO;
import com.straight.bluewave.domain.post.entity.Post;
import com.straight.bluewave.domain.reply.dto.ReplyCreateDTO;
import com.straight.bluewave.domain.reply.dto.ReplyDTO;
import com.straight.bluewave.domain.reply.entity.Reply;

import java.util.List;
import java.util.stream.Collectors;

public interface ReplyService {

    default Reply dtoToEntity(ReplyCreateDTO dto, Post post, Member member) {
        return  Reply.builder()
                .post(post)
                .member(member)
                .replyContent(dto.getReplyContent())
                .build();
    }

    default Reply dtoToEntity(ReplyDTO dto) {
        Reply entity = Reply.builder()
                .replyContent(dto.getReplyContent())
                .build();
        return entity;
    }

    default ReplyDTO entityToDto(Reply entity) {
        ReplyDTO dto = ReplyDTO.builder()
                .replyId(entity.getReplyId())
                .replyContent(entity.getReplyContent())
                .replyCreateAt(entity.getCreatedAt())
                .replyUpdateAt(entity.getUpdatedAt())
                .build();
        return dto;
    }

    /*default List<ReplyDTO> convertToDTOList(List<Reply> replies) {
        return replies.stream()
                .map(this::entityToDto)
                .collect(Collectors.toList());
    }*/

    ReplyDTO createReply(ReplyCreateDTO replyDTO);

    ReplyDTO getReply(Long replyId);

    ReplyDTO modify(Long replyId, ReplyDTO replyDTO);

    List<ReplyDTO> findReliesByPostId(Long postId);

    void remove(Long replyId);
}

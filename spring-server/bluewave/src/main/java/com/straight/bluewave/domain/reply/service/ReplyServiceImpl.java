package com.straight.bluewave.domain.reply.service;

import com.straight.bluewave.domain.member.dto.MemberDTO;
import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.member.repository.MemberRepository;
import com.straight.bluewave.domain.post.entity.Post;
import com.straight.bluewave.domain.post.repository.PostRepository;
import com.straight.bluewave.domain.post.repository.SpringDataPostRepository;
import com.straight.bluewave.domain.reply.dto.ReplyCreateDTO;
import com.straight.bluewave.domain.reply.dto.ReplyDTO;
import com.straight.bluewave.domain.reply.entity.Reply;
import com.straight.bluewave.domain.reply.repository.ReplyRepository;
import com.straight.bluewave.domain.reply.repository.SpringDataReplyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReplyServiceImpl implements ReplyService {

    private final ReplyRepository replyRepository;

    private final SpringDataReplyRepository springDataReplyRepository;
    private final MemberRepository memberRepository;
    private final SpringDataPostRepository postRepository;

    @Override
    public List<ReplyDTO> findReliesByPostId(Long postId) {
        postRepository.findById(postId).orElseThrow(() -> new RuntimeException("게시판 아이디를 찾을 수 없습니다."));
        return convertNestedStructure(replyRepository.findReplyByPostId(postId));
    }

    private List<ReplyDTO> convertNestedStructure(List<Reply> replies) {
        List<ReplyDTO> result = new ArrayList<>();
        Map<Long, ReplyDTO> map = new HashMap<>();
        replies.stream().forEach(r -> {
            ReplyDTO dto = ReplyDTO.convertReplyDTO(r);
            map.put(dto.getReplyId(), dto);
            if(r.getParent() != null) map.get(r.getParent().getReplyId()).getChildren().add(dto);
            else result.add(dto);
        });

        return result;
    }


    @Override
    public ReplyDTO createReply(ReplyCreateDTO replyDTO) {
        Reply reply = springDataReplyRepository.save(
                Reply.createReply(replyDTO.getReplyContent(),
                        postRepository.findById(replyDTO.getPostId()).orElseThrow(() -> new RuntimeException("게시판 아이디를 찾을 수 없습니다.")),
                        memberRepository.findById(replyDTO.getMemId()).orElseThrow(() -> new RuntimeException("회원 아이디를 찾을 수 없습니다.")),
                        replyDTO.getParentId() != null ? springDataReplyRepository.findById(replyDTO.getParentId()).get() : null)
        );
        return ReplyDTO.convertReplyDTO(reply);
    }

    @Override
    public ReplyDTO getReply(Long replyId) {
        Reply reply = springDataReplyRepository.findById(replyId)
                .orElseThrow(() -> new RuntimeException("ID를 통한 댓글 조회 불가: " + replyId));
        return entityToDto(reply);
    }

//    @Override
//    public List<ReplyDTO> getReplyByMember(Long memId) {
//        List<Reply> replies = replyRepository.findAllByMemId(memId);
//        return convertToDTOList(replies);
//    }
//
//    @Override
//    public List<ReplyDTO> getReplyByPost(Long post_id) {
//        List<Reply> replies = replyRepository.findAllByPostId(post_id);
//        return convertToDTOList(replies);
//    }

    @Override
    public ReplyDTO modify(Long replyId, ReplyDTO replyDTO) {

        Reply reply = springDataReplyRepository.findById(replyId)
                .orElseThrow(() -> new RuntimeException("ID를 통한 댓글 조회 불가: " + replyId));

        reply.updateContent(replyDTO);

        Reply savedReply = springDataReplyRepository.save(reply);

        return entityToDto(savedReply);
    }

    @Override
    public void remove(Long replyId) {
        Reply reply = springDataReplyRepository.findById(replyId)
                .orElseThrow(() -> new RuntimeException("ID를 통한 댓글 조회 불가: " + replyId));

        springDataReplyRepository.delete(reply);
    }
}

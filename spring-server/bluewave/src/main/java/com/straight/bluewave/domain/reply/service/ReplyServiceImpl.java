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
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReplyServiceImpl implements ReplyService {

    private final ReplyRepository replyRepository;
    private final MemberRepository memberRepository;
    private final SpringDataPostRepository postRepository;


    @Override
    public void createReply(ReplyCreateDTO replyDTO) {
        Post post = postRepository.findById(replyDTO.getPost_id()).get();
        Member member = memberRepository.findById((replyDTO.getMem_id())).get();
        Reply reply = dtoToEntity(replyDTO, post, member);
        replyRepository.save(dtoToEntity(replyDTO, post, member));
    }

    @Override
    public ReplyDTO getReply(Long replyId) {
        Reply reply = replyRepository.findById(replyId)
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
        replyDTO.setReply_modify(true);

        Reply reply = replyRepository.findById(replyId)
                .orElseThrow(() -> new RuntimeException("ID를 통한 댓글 조회 불가: " + replyId));

        reply.updateContent(replyDTO);

        Reply savedReply = replyRepository.save(reply);

        return entityToDto(savedReply);
    }

    @Override
    public void remove(Long replyId) {
        Reply reply = replyRepository.findById(replyId)
                .orElseThrow(() -> new RuntimeException("ID를 통한 댓글 조회 불가: " + replyId));

        replyRepository.delete(reply);
    }
}

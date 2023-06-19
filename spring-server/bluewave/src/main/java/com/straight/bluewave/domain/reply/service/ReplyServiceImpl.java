package com.straight.bluewave.domain.reply.service;

import com.straight.bluewave.domain.member.dto.MemberDTO;
import com.straight.bluewave.domain.reply.dto.ReplyDTO;
import com.straight.bluewave.domain.reply.entity.Reply;
import com.straight.bluewave.domain.reply.repository.ReplyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReplyServiceImpl implements ReplyService {

    private ReplyRepository replyRepository;

    @Override
    public ReplyDTO createReply(ReplyDTO dto) {
        Reply reply = dtoToEntity(dto);
        Reply savedReply = replyRepository.save(reply);
        return entityToDto(savedReply);
    }




    public List<ReplyDTO> searchAll() {
        List<Reply> reply = replyRepository.findAll();
        return reply.stream().map(this::entityToDto).collect(Collectors.toList());
    }

//    @Override
//    public ReplyDTO read() {
//        Optional<Reply> result = replyRepository.findAll();
//        return result.isPresent() ? entityToDto(result.get()) : null;
//    }

    @Override
    public Long register(ReplyDTO replyDTO) {
        return null;
    }

    @Override
    public List<ReplyDTO> getList(Long board_id) {
        return null;
    }

    @Override
    public void modify(Long replyId, ReplyDTO replyDTO) {
        Reply reply = dtoToEntity(replyDTO);
        replyRepository.save(reply);
    }

    @Override
    public void remove(long replyId) {
        replyRepository.deleteById(replyId);
    }

    @Override
    public ReplyDTO getReply(Long id) {
        return null;
    }

//    public List<ReplyDTO> searchMyReply(Long memberId) {
//        List<Reply> reply = repository.findReplyByMem_id(memberId);
//        return reply.stream().map(this::entityToDto).collect(Collectors.toList());
//    }
}

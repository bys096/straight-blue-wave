package com.straight.bluewave.application.controller;


import com.straight.bluewave.domain.reply.dto.ReplyCreateDTO;
import com.straight.bluewave.domain.reply.dto.ReplyDTO;
import com.straight.bluewave.domain.reply.entity.Reply;
import com.straight.bluewave.domain.reply.service.ReplyService;
import com.straight.bluewave.domain.reply.service.ReplyServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reply")
@RequiredArgsConstructor
@Log4j2
public class ReplyController {

    private final ReplyService replyService;

    @PostMapping("/create")         //댓글 생성
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<String> createReply(@RequestBody ReplyCreateDTO replyDTO) {
        replyService.createReply(replyDTO);
        return new ResponseEntity<>("댓글 생성 성공", HttpStatus.OK);
    }

    @GetMapping("/replies/{postId}")     //해당하는 게시글의 댓글들
    public ResponseEntity<List<ReplyDTO>> relies(@PathVariable Long postId) {
        List<ReplyDTO> replies = replyService.findReliesByPostId(postId);
        return ResponseEntity.ok(replies);
    }

    // 자기가 쓴 댓글 모아서 보기
//    @GetMapping("/read/member/{member_id}")
//    public List<ReplyDTO> getReplyByMember(@PathVariable Long mem_id) {
//        return replyService.getReplyByMember(mem_id);
//    }

    // 게시글의 전체 댓글 조회
//    @GetMapping("/read/post/{post_id}")
//    public List<ReplyDTO> getReplyByPost(@PathVariable Long post_id) {
//        return replyService.getReplyByPost(post_id);
//    }

    // 댓글 1개 조회
    @GetMapping("/read/reply/{replyId}")
    public ReplyDTO getReply(@PathVariable Long replyId) {

        return replyService.getReply(replyId);
    }

    @PutMapping("/modify/{replyId}")
    public ReplyDTO modifyReply(@PathVariable Long replyId, @RequestBody ReplyDTO replyDTO) {
        return replyService.modify(replyId, replyDTO);
    }

    @DeleteMapping("/delete/{replyId}")
    public ResponseEntity<String> deleteReply(@PathVariable Long replyId) {
        replyService.remove(replyId);
        return new ResponseEntity<>("댓글 삭제 성공", HttpStatus.OK);
    }



}

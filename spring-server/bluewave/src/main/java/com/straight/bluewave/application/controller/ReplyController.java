package com.straight.bluewave.application.controller;


import com.straight.bluewave.domain.reply.dto.ReplyDTO;
import com.straight.bluewave.domain.reply.entity.Reply;
import com.straight.bluewave.domain.reply.service.ReplyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reply")
@RequiredArgsConstructor
@Log4j2
public class ReplyController {

    @Autowired
    private ReplyService replyService;

    @PostMapping("/create")
    public Reply createReply(@RequestBody ReplyDTO replyDTO) {
        return replyService.createReply(replyDTO);
    }

    @GetMapping("/read/reply/{replyId}")
    public ReplyDTO getReply(@PathVariable Long id) {
        return replyService.getReply(id);
    }

    // 자기가 쓴 댓글 모아서 보기


    @PutMapping("/modify/{replyId}")
    public ReplyDTO modifyReply(@PathVariable long replyId, @RequestBody ReplyDTO dto) {
        return replyService.modify(id, replyDTO);
    }

    @DeleteMapping("/delete/{replyId}")
    public ResponseEntity<Boolean> deleteReply(@PathVariable long replyId) {
        replyService.remove(replyId);
        return ResponseEntity.ok(true);
    }



}

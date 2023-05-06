package com.straight.test.controller;

import com.straight.test.domain.Board;
import com.straight.test.domain.dto.BoardDTO;
import com.straight.test.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
@Log4j2
public class BoardController {

    private final BoardService boardService;

    @PostMapping("/create")
    public Board createBoard(@PathVariable Long brd_id, BoardDTO board, HttpServletRequest request){
        HttpSession session = (HttpSession) request.getSession();
        log.info("brd_id : " + brd_id);
        Board brd =  boardService.createBoard(board);
        return brd;
    }

    @PostMapping("/modify/{brd_id}")
    public Board modifyBoard(@PathVariable BoardDTO board){
        Board brd = boardService.modify(board);
        return brd;
    }

    @PostMapping("/delete/{brd_id}")
    public ResponseEntity<Void> deleteBoard(@PathVariable("brd_id") Long brd_id) {
        boardService.remove(brd_id);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/list")
    public List<Board> getBoard() {
        return boardService.findAll();
    }

}

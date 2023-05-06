package com.straight.test.controller;

import com.straight.test.domain.Board;
import com.straight.test.domain.Post;
import com.straight.test.domain.dto.BoardDTO;
import com.straight.test.domain.dto.PostDTO;
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
    public Board createBoard(@RequestBody BoardDTO dto){
        Board board = boardService.createBoard(dto);
        return board;
    }

    //보류
    @PutMapping("/modify/{brd_id}")
    public Board modifyBoard(@PathVariable Long brd_id, @RequestBody BoardDTO dto) {
        return boardService.modify(brd_id, dto);
    }
//    @PostMapping("/modify/{brd_id}")
//    public Board modifyBoard(@PathVariable BoardDTO board){
//        Board brd = boardService.modify(board);
//        return brd;
//    }

    @DeleteMapping("/delete/{brd_id}")
    public ResponseEntity<Void> deleteBoard(@PathVariable("brd_id") Long brd_id) {
        boardService.remove(brd_id);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/list")
    public List<Board> getBoard() {
        return boardService.findAll();
    }

}

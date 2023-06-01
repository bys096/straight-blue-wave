package com.straight.bluewave.application.controller;

import com.straight.bluewave.domain.board.dto.BoardDTO;
import com.straight.bluewave.domain.board.entity.Board;
import com.straight.bluewave.domain.board.service.BoardServiceImp;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
@Log4j2
public class BoardController {

    private final BoardServiceImp boardService;

    @PostMapping("/create")
    public Board createBoard(@RequestBody BoardDTO dto){
        Board board = boardService.createBoard(dto);
        return board;
    }

    @PutMapping("/modify/{brd_id}")
    public Long modifyBoard(@PathVariable Long brd_id, @RequestBody BoardDTO dto){
        return boardService.modify(brd_id, dto);
    }

    @DeleteMapping("/delete/{brd_id}")
    public ResponseEntity<Void> deleteBoard(@PathVariable("brd_id") Long brd_id) {
        boardService.remove(brd_id);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    // 해당 프로젝트에 속하는 게시판 불러오기
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/list/{prj_id}")
    public List<BoardDTO> getBoard(@PathVariable("prj_id") Long prjId) {
        List boardList = boardService.getBoardListByPrjId(prjId);
        return boardList;
    }
}
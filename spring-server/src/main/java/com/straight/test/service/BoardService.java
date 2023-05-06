package com.straight.test.service;

import com.straight.test.domain.Board;
import com.straight.test.domain.dto.BoardDTO;
import com.straight.test.repository.SpringDataJpaBoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardService implements BoardServiceImp{

    private final SpringDataJpaBoardRepository boardRepository;

    public Board createBoard(BoardDTO dto) {
        Board board = Board.builder()
                .brdId(dto.getBrd_id())
                .brdName(dto.getBrd_name())
                .brdName(dto.getBrd_name())
                .build();
        boardRepository.save(board);
        return board;

    }


    @Override
    public BoardDTO read(Long brd_id) {
        Optional<Board> result = boardRepository.findById(brd_id);
        return result.isPresent() ? entityToDto(result.get()) : null;
    }

    @Override
    public Board modify(BoardDTO dto) {
        Optional<Board> result = boardRepository.findById(dto.getBrd_id());

        Board board = null;
        if(result.isPresent()) {
            board = result.get();
            board.changeBrdName(dto.getBrd_name());

            boardRepository.save(board);
        }
        return board;
    }

    @Override
    public void remove(Long brd_id) {
        boardRepository.deleteById(brd_id);
    }

    public List<Board> findAll() {
        List<Board> boards = new ArrayList<>();
        boardRepository.findAll().forEach(u -> boards.add(u));
        return boards;
    }
}

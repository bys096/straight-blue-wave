package com.straight.bluewave.domain.board.service;

import com.straight.bluewave.domain.board.dto.BoardDTO;
import com.straight.bluewave.domain.board.entity.Board;
import com.straight.bluewave.domain.board.repository.BoardRepository;
import com.straight.bluewave.domain.project.entity.Project;
import com.straight.bluewave.domain.project.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardServiceImp implements BoardService{
    private final BoardRepository boardRepository;
    private final ProjectRepository projectRepository;

    public Board createBoard(BoardDTO dto) {

        Project project = projectRepository.findById(dto.getPrj_id())
                .orElseThrow(() -> new IllegalArgumentException("Board not found with ID: " + dto.getPrj_id()));

        Board board = Board.builder()
                .brdId(dto.getBrd_id())
                .brdName(dto.getBrd_name())
                .project(project)
                .build();

        Board boards = new Board(project, dto);

        boardRepository.save(board);
        return board;

    }


    @Override
    public BoardDTO read(Long brd_id) {
        Optional<Board> result = boardRepository.findById(brd_id);
        return result.isPresent() ? entityToDto(result.get()) : null;
    }

    @Override
    public Long modify(Long brd_id, BoardDTO dto) {
        Optional<Board> result = boardRepository.findById(brd_id);

        Board board = null;
        if(result.isPresent()) {
            board = result.get();
            board.changeBrdName(dto.getBrd_name());

            boardRepository.save(board);
        }
        return board.getBrdId();
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

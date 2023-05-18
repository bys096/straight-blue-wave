package com.straight.bluewave.domain.board.service;

import com.straight.bluewave.domain.board.dto.BoardDTO;
import com.straight.bluewave.domain.board.entity.Board;

public interface BoardService {
    default Board dtoToEntity(BoardDTO dto) {
        Board entity = Board.builder()
                .brdId(dto.getBrd_id())
                .brdName(dto.getBrd_name())
                .build();
        return entity;
    }

    default BoardDTO entityToDto(Board entity) {
        BoardDTO dto = BoardDTO.builder()
                .brd_id(entity.getBrdId())
                .brd_name(entity.getBrdName())
                .build();
        return dto;
    }

    BoardDTO read(Long brd_id);

    Long modify(Long brd_id, BoardDTO dto);

    void remove(Long brd_id);
}

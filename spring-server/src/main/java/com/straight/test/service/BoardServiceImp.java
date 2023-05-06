package com.straight.test.service;

import com.straight.test.domain.Board;
import com.straight.test.domain.dto.BoardDTO;

public interface BoardServiceImp {
    default Board dtoToEntity(BoardDTO dto) {
        Board entity = Board.builder()
                .brdId(dto.getBrd_id())
                .prjId(dto.getPrj_id())
                .brdName(dto.getBrd_name())
                .build();
        return entity;
    }

    default BoardDTO entityToDto(Board entity) {
        BoardDTO dto = BoardDTO.builder()
                .brd_id(entity.getBrdId())
                .prj_id(entity.getPrjId())
                .brd_name(entity.getBrdName())
                .build();
        return dto;
    }

    BoardDTO read(Long brd_id);

    Long modify(Long brd_id, BoardDTO dto);

    void remove(Long brd_id);

}

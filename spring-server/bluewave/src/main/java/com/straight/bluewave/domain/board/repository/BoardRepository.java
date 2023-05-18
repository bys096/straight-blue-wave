package com.straight.bluewave.domain.board.repository;
import com.straight.bluewave.domain.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
public interface BoardRepository extends JpaRepository<Board, Long>{
}

package com.straight.test.repository;

import com.straight.test.domain.Board;
import com.straight.test.domain.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
public interface SpringDataJpaBoardRepository extends JpaRepository<Board, Long>{

    Page<Project> findBoardIdBy(Long brd_id, Pageable pageable);

}

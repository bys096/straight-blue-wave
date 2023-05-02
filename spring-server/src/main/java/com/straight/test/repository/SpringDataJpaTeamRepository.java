package com.straight.test.repository;

import com.straight.test.domain.Team;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface SpringDataJpaTeamRepository extends JpaRepository<Team, Long> {
    Page<Team> findAllByTeamWriter(String user_id, Pageable pageable);
}

package com.straight.test.repository;

import com.straight.test.domain.Member;
import com.straight.test.domain.Project;
import com.straight.test.domain.Team;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SpringDataJpaProjectRepository extends JpaRepository<Project, Long> {
    Page<Project> findProjectBy(Long prj_id, Pageable pageable);
}

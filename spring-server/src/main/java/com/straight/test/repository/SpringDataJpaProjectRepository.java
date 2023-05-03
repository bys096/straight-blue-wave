package com.straight.test.repository;

import com.straight.test.domain.Project;
import com.straight.test.domain.Team;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpringDataJpaProjectRepository extends JpaRepository<Project, Long> {
}

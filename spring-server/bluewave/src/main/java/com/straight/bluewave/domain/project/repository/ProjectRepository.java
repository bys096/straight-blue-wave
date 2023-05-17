package com.straight.bluewave.domain.project.repository;

import com.straight.bluewave.domain.project.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface ProjectRepository extends JpaRepository<Project, Long> {
    Page<Project> findProjectBy(Long prj_id, Pageable pageable);
}

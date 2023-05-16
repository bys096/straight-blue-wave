package com.straight.bluewave.domain.project.repository;


import com.straight.bluewave.domain.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {

}

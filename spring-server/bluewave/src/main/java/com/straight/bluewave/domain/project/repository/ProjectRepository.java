package com.straight.bluewave.domain.project.repository;

import com.straight.bluewave.domain.project.entity.Project;
import com.straight.bluewave.domain.team.entity.Team;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
public interface ProjectRepository extends JpaRepository<Project, Long> {

//    @Query("select t.projects from Team t where t.teamId = :teamId")
//    List<Project> findProjectsByTeam(@Param("teamId") Long teamId);

//    @Query("SELECT p FROM Project p JOIN p.teamProjectMappings tpm WHERE tpm.team = :team")
//    List<Project> findProjectsByTeam(@Param("team") Team team);

    @Query("SELECT p FROM Project p WHERE p.team.teamId = :teamId")
    List<Project> findProjectsByTeam(@Param("teamId") Long teamId);

    Optional<Project> findByTeam(Team team);
}

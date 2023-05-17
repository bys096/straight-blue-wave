package com.straight.bluewave.domain.team.repository;

import com.straight.bluewave.domain.team.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpringDataTeamRepository extends JpaRepository<Team, Long> {
}

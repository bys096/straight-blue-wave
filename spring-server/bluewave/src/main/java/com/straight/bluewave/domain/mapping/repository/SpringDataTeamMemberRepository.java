package com.straight.bluewave.domain.mapping.repository;

import com.straight.bluewave.domain.mapping.entity.TeamMemberMapping;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpringDataTeamMemberRepository extends JpaRepository<TeamMemberMapping, Long> {
}

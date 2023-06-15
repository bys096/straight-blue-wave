package com.straight.bluewave.domain.mapping.repository;

import com.straight.bluewave.domain.mapping.entity.TeamMemberMapping;
import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.team.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SpringDataTeamMemberRepository extends JpaRepository<TeamMemberMapping, Long> {
    @Query("select t from TeamMemberMapping t where t.team.teamId = :teamId")
    List<TeamMemberMapping> findAllByTeam(@Param("teamId") Long teamId);

    Optional<TeamMemberMapping> findByMember(Member member);
}

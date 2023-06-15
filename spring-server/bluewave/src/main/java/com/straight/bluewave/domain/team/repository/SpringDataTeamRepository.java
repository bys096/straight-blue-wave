package com.straight.bluewave.domain.team.repository;

import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.team.entity.Team;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SpringDataTeamRepository extends JpaRepository<Team, Long> {


    @Query("select m.teams from Member m where m.memberId = :memberId")
    List<Team> findTeamsByMemberId(@Param("memberId") Long memberId);

    Optional<Team> findByMember(Member member);
}

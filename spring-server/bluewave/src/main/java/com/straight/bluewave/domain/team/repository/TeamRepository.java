package com.straight.bluewave.domain.team.repository;

import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.team.dto.TeamMemberPageRequestDTO;
import com.straight.bluewave.domain.team.entity.Team;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TeamRepository {
    
    Page<Object[]> searchTeamPage(TeamMemberPageRequestDTO pageRequestDTO, Pageable pageable);

    public Page<Object[]> getTeamList(TeamMemberPageRequestDTO pageRequestDTO, Pageable pageable);





}

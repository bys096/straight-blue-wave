package com.straight.bluewave.domain.team.repository;

import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.team.dto.TeamPageRequestDTO;
import com.straight.bluewave.domain.team.entity.Team;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamRepository  {
    
    Page<Object[]> searchTeamPage(TeamPageRequestDTO pageRequestDTO, Pageable pageable);

    public List<Member> searchTeamMemberList(Long n);


}

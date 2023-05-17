package com.straight.bluewave.domain.team.service;

import com.straight.bluewave.application.dto.PageRequestDTO;
import com.straight.bluewave.application.dto.PageResultDTO;
import com.straight.bluewave.domain.mapping.entity.TeamMemberMapping;
import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.team.dto.TeamDTO;
import com.straight.bluewave.domain.team.dto.TeamPageRequestDTO;
import com.straight.bluewave.domain.team.entity.Team;

public interface TeamService {
    PageResultDTO<TeamDTO, Object[]> getList(TeamPageRequestDTO pageRequestDTO);

    default TeamDTO entityToDTO(Team team, Member member, TeamMemberMapping teamMember) {

        TeamDTO teamDTO = TeamDTO.builder()
                .teamId(team.getTeamId())
                .teamName(team.getTeamName())
                .memberId(member.getMemberId())
                .memberName(member.getMemberName())
                .createdAt(teamMember.getCreatedAt())
                .build();
        return teamDTO;
    }
}

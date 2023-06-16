package com.straight.bluewave.domain.team.service;

import com.straight.bluewave.domain.team.dto.TeamMemberDTO;
import com.straight.bluewave.domain.team.dto.TeamMemberPageResultDTO;
import com.straight.bluewave.domain.mapping.entity.TeamMemberMapping;
import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.team.dto.TeamDTO;
import com.straight.bluewave.domain.team.dto.TeamMemberPageRequestDTO;
import com.straight.bluewave.domain.team.entity.Team;

public interface TeamService {
    TeamMemberPageResultDTO<TeamDTO, Object[]> getList(TeamMemberPageRequestDTO pageRequestDTO);

    default TeamDTO entityToDTO(Team team, Member member, TeamMemberMapping teamMember) {

        TeamDTO teamDTO = TeamDTO.builder()
                .teamId(team.getTeamId())
                .teamName(team.getTeamName())
                .teamDesc(team.getTeamDesc())
                .memberId(member.getMemberId())
                .memberName(member.getMemberName())
                .createdAt(teamMember.getCreatedAt())
                .build();
        return teamDTO;
    }

    default Team dtoToEntity(TeamDTO dto) {
        Member member = Member.builder()
                .memberId(dto.getMemberId())
                .build();
        Team entity = Team.builder()
                .teamId(dto.getTeamId())
                .teamName(dto.getTeamName())
//                .teamDesc(dto.getTeamDesc())
                .member(member)
                .build();

        return entity;
    }

    default TeamDTO entityToDto(Team team) {

        TeamDTO teamDTO = TeamDTO.builder()
                .teamId(team.getTeamId())
                .teamName(team.getTeamName())
//                .teamDesc(team.getTeamDesc())
                .build();
        return teamDTO;
    }

    default TeamMemberDTO entityToDTO(TeamMemberMapping entity) {
        TeamMemberDTO dto = TeamMemberDTO.builder()
                .teamMemberId(entity.getTeamMemberId())
                .teamPosition(entity.getTeamPosition())
                .teamName(entity.getTeamName())
                .memberId(entity.getMember().getMemberId())
                .teamId(entity.getTeam().getTeamId())
                .build();
        return dto;
    }


    TeamDTO read(Long tm_id);

    void modify(TeamDTO dto);

    void remove(Long tm_id);


}

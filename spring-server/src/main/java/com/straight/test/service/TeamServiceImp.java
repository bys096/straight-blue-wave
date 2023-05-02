package com.straight.test.service;

import com.straight.test.domain.Team;
import com.straight.test.domain.dto.PageRequestDTO;
import com.straight.test.domain.dto.PageResultDTO;
import com.straight.test.domain.dto.TeamDTO;

import java.util.List;

public interface TeamServiceImp {

    default Team dtoToEntity(TeamDTO dto) {
        Team entity = Team.builder()
                .tno(dto.getTno())
                .teamName(dto.getTeam_name())
                .teamMember(dto.getTeam_member())
                .teamWriter(dto.getTeam_writer())
                .build();
        return entity;
    }

    default TeamDTO entityToDto(Team entity) {
        TeamDTO dto = TeamDTO.builder()
                .tno(entity.getTno())
                .team_name(entity.getTeamName())
                .team_member(entity.getTeamMember())
                .team_writer(entity.getTeamWriter())
                .build();
        return dto;
    }

    PageResultDTO<TeamDTO, Team> getList(String user_id, PageRequestDTO requestDTO);

    TeamDTO read(Long tno);

    void modify(TeamDTO dto);

    void remove(Long tno);
}

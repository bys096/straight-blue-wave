package com.straight.bluewave.domain.team.service;

import com.straight.bluewave.domain.team.dto.TeamDTO;
import com.straight.bluewave.domain.team.entity.Team;

public interface TeamService {

    default Team dtoToEntity(TeamDTO dto) {
        Team entity = Team.builder()
                .teamId(dto.getTeam_id())
                .teamName(dto.getTeam_name())
                .teamDesc(dto.getTeam_desc())
                .build();
        return entity;
    }

    default TeamDTO entityToDto(Team entity) {
        TeamDTO dto = TeamDTO.builder()
                .team_id(entity.getTeamId())
                .team_name(entity.getTeamName())
                .team_desc(entity.getTeamDesc())
                .build();
        return dto;
    }

    //PageResultDTO<TeamDTO, Team> getList(String user_id, PageRequestDTO requestDTO);

    TeamDTO read(Long team_id);

    void modify(TeamDTO dto);

    void remove(Long team_id);
}

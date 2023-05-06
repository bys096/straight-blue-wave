package com.straight.test.service;

import com.straight.test.domain.Team;
import com.straight.test.domain.dto.PageRequestDTO;
import com.straight.test.domain.dto.PageResultDTO;
import com.straight.test.domain.dto.TeamDTO;

import java.util.List;

public interface TeamServiceImp {

    default Team dtoToEntity(TeamDTO dto) {
        Team entity = Team.builder()
                .tmId(dto.getTm_id())
                .tmName(dto.getTm_name())
                .tmIntro(dto.getTm_intro())
                .tmNumber(dto.getTm_number())
                .tmThumbnail(dto.getTm_thumbnail())
                .build();
        return entity;
    }

    default TeamDTO entityToDto(Team entity) {
        TeamDTO dto = TeamDTO.builder()
                .tm_id(entity.getTmId())
                .tm_name(entity.getTmName())
                .tm_intro(entity.getTmIntro())
                .creation_date((entity.getCreationDate()))
                .tm_number(entity.getTmNumber())
                .tm_thumbnail(entity.getTmThumbnail())
                .build();
        return dto;
    }

    //PageResultDTO<TeamDTO, Team> getList(String user_id, PageRequestDTO requestDTO);

    TeamDTO read(Long tm_id);

    void modify(TeamDTO dto);

    void remove(Long tm_id);
}

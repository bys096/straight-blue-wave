package com.straight.bluewave.domain.member.repository;

import com.straight.bluewave.domain.team.dto.TeamPageResultDTO;
import com.straight.bluewave.domain.team.dto.TeamPageRequestDTO;
import com.straight.bluewave.domain.team.service.TeamService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class TeamServiceTest {

    @Autowired
    TeamService teamService;
    @Test
    void getList() {
        TeamPageRequestDTO dto = new TeamPageRequestDTO();
        TeamPageResultDTO resultDTO = teamService.getList(dto);

        System.out.println(resultDTO.getDtoList().toString());
    }
}
package com.straight.bluewave.application.controller;

import com.straight.bluewave.application.dto.PageResultDTO;
import com.straight.bluewave.domain.team.service.TeamService;
import com.straight.bluewave.domain.team.dto.TeamPageRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final TeamService teamService;
    @GetMapping("/team")
    public PageResultDTO getTeamList(TeamPageRequestDTO pageRequestDTO) {
        PageResultDTO dto = teamService.getList(pageRequestDTO);
        return dto;
    }
}

package com.straight.bluewave.application.controller;

import com.straight.bluewave.domain.team.dto.TeamPageRequestDTO;
import com.straight.bluewave.domain.team.dto.TeamPageResultDTO;
import com.straight.bluewave.domain.team.service.TeamService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/team")
@RequiredArgsConstructor
@Log4j2
public class TeamController {

    private final TeamService teamService;
    // 팀 목록 페이지 함수 -> querydsl, 조건 검색 적용

    @GetMapping("/list") // 매핑 url 바꿔야함
    public TeamPageResultDTO getTeamList(@RequestBody TeamPageRequestDTO pageRequestDTO) {
        TeamPageResultDTO dto = teamService.getList(pageRequestDTO);
        return dto;
    }
}

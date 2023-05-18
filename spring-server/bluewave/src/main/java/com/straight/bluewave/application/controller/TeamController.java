package com.straight.bluewave.application.controller;

import com.straight.bluewave.application.dto.PageRequestDTO;
import com.straight.bluewave.application.dto.PageResultDTO;
import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.team.dto.TeamDTO;
import com.straight.bluewave.domain.team.dto.TeamMemberPageRequestDTO;
import com.straight.bluewave.domain.team.dto.TeamMemberPageResultDTO;
import com.straight.bluewave.domain.team.dto.TeamPageRequestDTO;
import com.straight.bluewave.domain.team.entity.Team;
import com.straight.bluewave.domain.team.repository.SpringDataTeamRepository;
import com.straight.bluewave.domain.team.service.TeamServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/team")
@RequiredArgsConstructor
@Log4j2
public class TeamController {

    private final TeamServiceImpl teamService;
    // 팀 목록 페이지 함수 -> querydsl, 조건 검색 적용


    // 팀 회원 목록 조회(조건 가능) -> 라우팅 수정
    @GetMapping("/member/list")
    public TeamMemberPageResultDTO getTeamMemberList(@RequestBody TeamMemberPageRequestDTO pageRequestDTO) {
        TeamMemberPageResultDTO dto = teamService.getList(pageRequestDTO);
        return dto;
    }

    // 팀 목록 불러오기
    @GetMapping("/list/{memberId}")
    public TeamMemberPageResultDTO getTeamList(@PathVariable Long memberId) {
        System.out.println("진입" + memberId);
        TeamMemberPageRequestDTO rdto = new TeamMemberPageRequestDTO();
        rdto.setMemberId(memberId);

        return teamService.getTeamList(rdto);
    }


    @PostMapping("/joinTeam")       //팀 생성
    public Team join(@RequestBody TeamDTO dto) {
        return teamService.joinTeam(dto);
//        return null;
    }

    @GetMapping("/readTeam/{tm_id}")      //변경할 팀 조회
    public TeamDTO update(@PathVariable Long tm_id) {
        TeamDTO dto = teamService.read(tm_id);
        return dto;
    }

    @PutMapping("/updateTeam")     //팀명 변경
    public void modify(@RequestBody TeamDTO dto) {

        teamService.modify(dto);
    }

    @DeleteMapping("/deleteTeam/{tm_id}")          //팀삭제
    public void remove(@PathVariable Long tm_id) {
        log.info("tm_id : " + tm_id);
        teamService.remove(tm_id);
    }


}

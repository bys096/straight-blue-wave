package com.straight.test.controller;

import com.straight.test.domain.Team;
import com.straight.test.domain.dto.PageRequestDTO;
import com.straight.test.domain.dto.TeamDTO;
import com.straight.test.service.MemberService;
import com.straight.test.service.TeamService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/api/team")
@RequiredArgsConstructor
@Log4j2
public class TeamController {

    private final TeamService teamService;

    @PostMapping("/joinTeam")       //팀 생성
    public Team join(@RequestBody TeamDTO dto) {
        return teamService.joinTeam(dto);

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

    @GetMapping("/listTeam")                //팀 전체
    public ResponseEntity<List<Team>> getAllTeams() {
        List<Team> teams = teamService.getAllTeams();
        return new ResponseEntity<>(teams, HttpStatus.OK);
    }



    /*@GetMapping("/listTeam")        //생성한 팀 리스트 보기
    public String list(PageRequestDTO pageRequestDTO, Model model, HttpServletRequest request) {
        HttpSession session = (HttpSession) request.getSession();
        String user_id = (String) session.getAttribute("loginId");
        log.info("id : " + user_id);
        model.addAttribute("result", teamService.getList(user_id,pageRequestDTO));
        return "/index";
    }*/


}

package com.straight.test.controller;

import com.straight.test.domain.Team;
import com.straight.test.domain.dto.PageRequestDTO;
import com.straight.test.domain.dto.TeamDTO;
import com.straight.test.service.MemberService;
import com.straight.test.service.TeamService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/team")
@RequiredArgsConstructor
@Log4j2
public class TeamController {

    private final TeamService teamService;
    @GetMapping("/teamForm")       //팀 생성 폼으로
    public String joinTeam() {

        return "/team/joinTeam";
    }

    @PostMapping("/joinTeam")       //팀 생성
    public String join(TeamDTO dto, HttpServletRequest request) {
        HttpSession session = (HttpSession) request.getSession();
        String id = (String) session.getAttribute("loginId");
        log.info("id : " + id);
        teamService.joinTeam(id, dto);
        return "redirect:/team/list";
    }

    @GetMapping("/update")      //팀명 변경하기 폼으로 이동
    public String update(Model model, Long tno) {

        TeamDTO dto = teamService.read(tno);
        model.addAttribute("dto", dto);
        return "/team/updateTeam";
    }

    @PostMapping("/update")     //팀명 변경
    public String modify(TeamDTO dto) {
        teamService.modify(dto);
        return "redirect:/team/list";
    }

    @GetMapping("/delete")          //팀삭제
    public String remove(@RequestParam("tno") Long tno) {
        teamService.remove(tno);
        return "redirect:/team/list";
    }

    @GetMapping("/list")        //생성한 팀 리스트 보기
    public String list(PageRequestDTO pageRequestDTO, Model model, HttpServletRequest request) {
        HttpSession session = (HttpSession) request.getSession();
        String user_id = (String) session.getAttribute("loginId");
        log.info("id : " + user_id);
        model.addAttribute("result", teamService.getList(user_id,pageRequestDTO));
        return "/index";
    }


}

package com.straight.test.controller;

import com.straight.test.domain.Member;
import com.straight.test.domain.dto.MemberDTO;
import com.straight.test.domain.dto.PageRequestDTO;
import com.straight.test.service.MemberService;
import com.straight.test.service.TeamService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/test")
@RequiredArgsConstructor
@Log4j2
public class MemberController {

    private final MemberService memberService;

    private final TeamService teamService;

    // 회원가입 페이지로 navi
    @GetMapping("/joinForm")
    public String joinForm() {
        return "joinForm";
    }

    // 로그인 페이지로 navi
    @GetMapping("/loginForm")
    public String loginForm() {return "loginForm";}


    // 회원 가입
    @PostMapping("/member")     //회원가입
    public String joinMember(MemberDTO member) {
        Member result = memberService.joinMember(member);
        return "redirect:/test/loginForm";
    }

    @PostMapping("/member/login")   //로그인
    public String login(String user_id, String user_pw, HttpServletRequest request) {

        boolean login = memberService.loginMember(user_id, user_pw);
        HttpSession session = (HttpSession) request.getSession();
        if(login) {
            session.setAttribute("loginState", "login");
            session.setAttribute("loginId", user_id);
            session.setAttribute("loginPw", user_pw);
            return "redirect:/team/list";
        }
        else {
            session.setAttribute("loinState", "logout");
            return "loginForm";
        }
    }

    @GetMapping("/logout")      //로그아웃
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/test/loginForm";
    }

    @GetMapping("/member")      //회원 정보 불러오기
    public String updateMember(String user_id, Model model) {

        MemberDTO dto = memberService.read(user_id);
        model.addAttribute("dto", dto);
        return "member";
    }

    @PostMapping("/update")     //회원 정보 수정
    public String updateMember(MemberDTO member) {
        memberService.modify(member);
        return "redirect:/team/list";
    }

    @GetMapping("/delete")      //회원탙퇴
    public String deleteMember(@RequestParam("id") Long id) {
        memberService.remove(id);
        return "loginForm";
    }
}

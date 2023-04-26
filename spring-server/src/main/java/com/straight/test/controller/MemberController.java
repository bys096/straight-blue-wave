package com.straight.test.controller;

import com.straight.test.domain.Member;
import com.straight.test.domain.dto.MemberDTO;
import com.straight.test.service.MemberService;
import lombok.RequiredArgsConstructor;
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
public class MemberController {

    private final MemberService memberService;

    // 회원가입 페이지로 navi
    @GetMapping("/joinForm")
    public String joinForm() {
        return "joinForm";
    }

    // 로그인 페이지로 navi
    @GetMapping("/loginForm")
    public String loginForm() {return "loginForm";}


    // 회원 가입
    @PostMapping("/member")
    public String joinMember(MemberDTO member) {
        Member result = memberService.joinMember(member);
        return "redirect:/test/loginForm";
    }

    @PostMapping("/member/login")
    public String login(String user_id, String user_pw, HttpServletRequest request) {

        boolean login = memberService.loginMember(user_id, user_pw);
        HttpSession session = (HttpSession) request.getSession();
        if(login) {
            session.setAttribute("loginState", "login");
            session.setAttribute("loginId", user_id);
            session.setAttribute("loginPw", user_pw);
            return "../static/index";
        }
        else {
            session.setAttribute("loinState", "logout");
            return "loginForm";
        }
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/test/loginForm";
    }

    @GetMapping("/member")
    public String updateMember(String user_id, Model model) {

        MemberDTO dto = memberService.read(user_id);
        model.addAttribute("dto", dto);
        return "member";
    }

    @PostMapping("/update")
    public String updateMember(MemberDTO member) {
        memberService.modify(member);
        return "../static/index";
    }

    @GetMapping("/delete")
    public String deleteMember(@RequestParam("id") Long id) {
        memberService.remove(id);
        return "loginForm";
    }
}

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

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Log4j2
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/register")
    public Member join(@RequestBody MemberDTO member) {

        return memberService.join(member);
    }

    @PostMapping("/login")
    public MemberDTO login(@RequestBody MemberDTO member) {
        MemberDTO dto = memberService.login(member);
        return dto;
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

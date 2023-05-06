package com.straight.test.controller;

import com.straight.test.domain.Member;
import com.straight.test.domain.Team;
import com.straight.test.domain.dto.MemberDTO;
import com.straight.test.domain.dto.PageRequestDTO;
import com.straight.test.repository.SpringDataJpaMemberRepository;
import com.straight.test.service.MemberService;
import com.straight.test.service.TeamService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
@Log4j2
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/register")       //회원가입
    public Member join(@RequestBody MemberDTO member) {

        return memberService.join(member);
    }

    @PostMapping("/login")          //로그인
    public MemberDTO login(@RequestBody MemberDTO member) {
        MemberDTO dto = memberService.login(member);
        return dto;
    }


    @GetMapping("/member/{id}")      //회원 정보 불러오기
    public MemberDTO updateMember(@PathVariable Long id) {
        log.info("id : " + id);
        MemberDTO dto = memberService.read(id);
        return dto;
    }

    @GetMapping("/listMember")      //회원 전체 불러오기
    public ResponseEntity<List<Member>> getAllMembers() {
        List<Member> members = memberService.getAllMembers();
        return new ResponseEntity<>(members, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")     //회원 정보 수정
    public void updateMember(@RequestBody MemberDTO member, @PathVariable Long id) {

        memberService.modify(member, id);
    }

    @DeleteMapping("/delete/{id}")      //회원탙퇴
    public void deleteMember(@PathVariable Long id) {
        log.info("id : " + id);
        memberService.remove(id);
    }
}
package com.straight.bluewave.application.controller;

import com.straight.bluewave.domain.member.dto.MemberDTO;
import com.straight.bluewave.domain.member.dto.MemberResponseDTO;
import com.straight.bluewave.domain.member.dto.MemberUpdateDTO;
import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.member.service.AuthService;
import com.straight.bluewave.domain.member.service.MemberServiceImp;
import com.straight.bluewave.global.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
@Log4j2
public class MemberController {

    private final MemberServiceImp memberServiceImp;

    private final AuthService authService;

    @GetMapping("/{email}")     //이메일로 사용자 요청
    public ResponseEntity<MemberResponseDTO> findMemberInfoByEmail(@PathVariable String memberEmail) {
        return ResponseEntity.ok(memberServiceImp.findMemberInfoByEmail(memberEmail));
    }


    @GetMapping("/me")         //인증된 사용자의 회원정보 조회
    public ResponseEntity<MemberResponseDTO> findMemberInfoById() {
        return ResponseEntity.ok(memberServiceImp.findMemberInfoById(SecurityUtil.getCurrentMemberId()));
    }

    @PutMapping("/update")      //회원정보 수정(이메일 X)
    public ResponseEntity<MemberResponseDTO> updateMyInfo(@RequestBody MemberUpdateDTO dto) {
        memberServiceImp.modify(dto);
        return ResponseEntity.ok(memberServiceImp.findMemberInfoById(SecurityUtil.getCurrentMemberId()));

    }

    @DeleteMapping("/delete")       //회원탈퇴
    public ResponseEntity<String> deleteMember(HttpServletRequest request, HttpServletResponse response) {
        authService.logout(request);
        memberServiceImp.delete();

        Cookie cookie = new Cookie("token", null);
        cookie.setMaxAge(0);
        cookie.setPath("/api");
        response.addCookie(cookie);
        response.setHeader("Authorization", "");

        return new ResponseEntity<>("회원탈퇴 성공", HttpStatus.OK);
    }


    @GetMapping("/listMember")      //회원 전체 불러오기
    public ResponseEntity<List<Member>> getAllMembers() {
        List<Member> members = memberServiceImp.getAllMembers();
        return new ResponseEntity<>(members, HttpStatus.OK);
    }


}

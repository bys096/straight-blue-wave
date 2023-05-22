package com.straight.bluewave.application.controller;

import com.straight.bluewave.domain.member.dto.MemberDTO;
import com.straight.bluewave.domain.member.dto.MemberResponseDTO;
import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.member.service.MemberServiceImp;
import com.straight.bluewave.global.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
@Log4j2
public class MemberController {

    private final MemberServiceImp memberServiceImp;

    @GetMapping("/{email}")     //이메일로 사용자 요청
    public ResponseEntity<MemberResponseDTO> findMemberInfoByEmail(@PathVariable String memberEmail) {
        return ResponseEntity.ok(memberServiceImp.findMemberInfoByEmail(memberEmail));
    }


    @GetMapping("/me")         //인증된 사용자의 회원정보 조회
    public ResponseEntity<MemberResponseDTO> findMemberInfoById() {
        return ResponseEntity.ok(memberServiceImp.findMemberInfoById(SecurityUtil.getCurrentMemberId()));
    }




    /*@PostMapping("/register")       //회원가입
    public Member join(@RequestBody MemberDTO member) {

        return memberServiceImp.join(member);
    }*/

    /*@PostMapping("/login")          //로그인
    public MemberDTO login(@RequestBody MemberDTO member) {
        MemberDTO dto = memberServiceImp.login(member);
        return dto;
    }*/


    @GetMapping("/member/{id}")      //회원 정보 불러오기
    public MemberDTO updateMember(@PathVariable Long id) {
        log.info("id : " + id);
        MemberDTO dto = memberServiceImp.read(id);
        return dto;
    }

    @GetMapping("/listMember")      //회원 전체 불러오기
    public ResponseEntity<List<Member>> getAllMembers() {
        List<Member> members = memberServiceImp.getAllMembers();
        return new ResponseEntity<>(members, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")     //회원 정보 수정
    public void updateMember(@RequestBody MemberDTO member, @PathVariable Long id) {

        memberServiceImp.modify(member, id);
    }

    @DeleteMapping("/delete/{id}")      //회원탙퇴
    public void deleteMember(@PathVariable Long id) {
        log.info("id : " + id);
        memberServiceImp.remove(id);
    }
}

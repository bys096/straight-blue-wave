package com.straight.bluewave.application.controller;

import com.straight.bluewave.domain.mapping.entity.FriendMapping;
import com.straight.bluewave.domain.member.dto.FriendDTO;
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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
@Log4j2
public class MemberController {

    private final MemberServiceImp memberServiceImp;

    private final AuthService authService;

    @GetMapping("/{email}")     //이메일로 사용자 요청
    public ResponseEntity<MemberResponseDTO> findMemberInfoByEmail(@PathVariable String email) {
        return ResponseEntity.ok(memberServiceImp.findMemberInfoByEmail(email));
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

    //@PreAuthorize("#id.toString() == principal.username or hasRole('MANAGER')")
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

    @PostMapping("/addFriend")      //친구 추가
    public ResponseEntity<String> addFriend(@RequestParam Long memId, @RequestParam Long friendId) {
        memberServiceImp.addFriend(memId, friendId);
        return new ResponseEntity<>("친구추가 성공", HttpStatus.OK);
    }

    @GetMapping("/friendList/{memId}")      //친구 리스트
    public ResponseEntity<List<FriendDTO>> friends(@PathVariable Long memId) {
        Member member = new Member();
        member.setMemberId(memId);
        List<FriendDTO> friendDTOS = memberServiceImp.getFriendList(member);
        return new ResponseEntity<>(friendDTOS, HttpStatus.OK);
    }

    @DeleteMapping("/deleteFriend")      //친구 삭제
    public ResponseEntity<String> removeFriend(@RequestParam Long memId, @RequestParam Long friendId) {
       Member member1 = new Member();
       member1.setMemberId(memId);
       Member member2 = new Member();
       member2.setMemberId(friendId);
       memberServiceImp.remove(member1, member2);
       return new ResponseEntity<>("친구삭제 성공", HttpStatus.OK);
    }


}

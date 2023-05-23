package com.straight.bluewave.application.controller;

import com.straight.bluewave.domain.member.dto.MemberRequestDTO;
import com.straight.bluewave.domain.member.dto.MemberResponseDTO;
import com.straight.bluewave.domain.member.dto.TokenDTO;
import com.straight.bluewave.domain.member.dto.TokenRequestDTO;
import com.straight.bluewave.domain.member.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")         //회원가입
    public ResponseEntity<MemberResponseDTO> signup(@RequestBody MemberRequestDTO memberRequestDto) {
        return ResponseEntity.ok(authService.signup(memberRequestDto));
    }

    @PostMapping("/login")      //로그인
    public ResponseEntity<TokenDTO> login(@RequestBody MemberRequestDTO memberRequestDto, HttpServletResponse response) {
        TokenDTO tokenDTO = authService.login(memberRequestDto);

        Cookie cookie = new Cookie("token", tokenDTO.getRefreshToken());        //RefreshToken을 쿠키에 저장
        cookie.setMaxAge(3600);     //초 단위 시간
        cookie.setPath("/api");        //쿠기 경로 적용하기
        response.addCookie(cookie);

        response.setHeader("Authorization", "Bearer " + tokenDTO.getAccessToken());     //AccessToken을 헤더에 담아 응답

        return ResponseEntity.ok(tokenDTO);
        //return ResponseEntity.ok(authService.login(memberRequestDto));
    }

    @PostMapping("/logout")     //로그아웃
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("token", null);
        cookie.setMaxAge(0);        //쿠키 만료시간을 0으로 설정
        cookie.setPath("/api");
        response.addCookie(cookie);

        response.setHeader("Authorization", "");

        return ResponseEntity.ok("로그아웃 성공");
    }


    @PostMapping("/reissue")        //재발급
    public ResponseEntity<TokenDTO> reissue(@RequestBody TokenRequestDTO tokenRequestDto, HttpServletResponse response) {
        TokenDTO tokenDTO = authService.reissue(tokenRequestDto);

        Cookie cookie = new Cookie("token", tokenDTO.getRefreshToken());
        cookie.setPath("/api");
        cookie.setMaxAge(3600);

        response.setHeader("Authorization", "Bearer " + tokenDTO.getAccessToken());


        return ResponseEntity.ok(tokenDTO);
        //return ResponseEntity.ok(authService.reissue(tokenRequestDto));
    }
}

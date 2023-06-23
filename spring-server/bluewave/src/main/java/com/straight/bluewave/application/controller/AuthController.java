package com.straight.bluewave.application.controller;

import com.straight.bluewave.domain.member.dto.MemberRequestDTO;
import com.straight.bluewave.domain.member.dto.MemberResponseDTO;
import com.straight.bluewave.domain.member.dto.TokenDTO;
import com.straight.bluewave.domain.member.dto.TokenRequestDTO;
import com.straight.bluewave.domain.member.repository.RefreshTokenRepository;
import com.straight.bluewave.domain.member.service.AuthService;
import com.straight.bluewave.global.oauth.naver.NaverLoginParams;
import com.straight.bluewave.global.oauth.service.OAuthLoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Log4j2
public class AuthController {
    private final AuthService authService;

    private final OAuthLoginService oAuthLoginService;


    @PostMapping("/signup")         //회원가입
    public ResponseEntity<MemberResponseDTO> signup(@RequestBody MemberRequestDTO memberRequestDto) {
        return ResponseEntity.ok(authService.signup(memberRequestDto));
    }

    @GetMapping("/exist/{member_email}")        //회원가입 아이디 중복검사
    public ResponseEntity<Boolean> checkEmailDuplicate(@PathVariable String member_email) {
        return ResponseEntity.ok(authService.checkEmailDuplicate(member_email));
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

    @PostMapping("/naver")
    public ResponseEntity<TokenDTO> loginNaver(@RequestBody NaverLoginParams params, HttpServletResponse response) {
        TokenDTO tokenDTO = oAuthLoginService.login(params);

        Cookie cookie = new Cookie("token", tokenDTO.getRefreshToken());        //RefreshToken을 쿠키에 저장
        cookie.setMaxAge(3600);     //초 단위 시간
        cookie.setPath("/api");        //쿠기 경로 적용하기
        response.addCookie(cookie);

        response.setHeader("Authorization", "Bearer " + tokenDTO.getAccessToken());

        return ResponseEntity.ok(tokenDTO);
    }

    @PostMapping("/logout")     //로그아웃
    public ResponseEntity<String> logout(HttpServletResponse response, HttpServletRequest request) {
        authService.logout(request);

        Cookie cookie = new Cookie("token", null);
        cookie.setMaxAge(0);        //쿠키 만료시간을 0으로 설정
        cookie.setPath("/api");
        response.addCookie(cookie);

        response.setHeader("Authorization", "");

        return new ResponseEntity<>("로그아웃 성공", HttpStatus.OK);
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

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

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<MemberResponseDTO> signup(@RequestBody MemberRequestDTO memberRequestDto) {
        return ResponseEntity.ok(authService.signup(memberRequestDto));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDTO> login(@RequestBody MemberRequestDTO memberRequestDto) {
        return ResponseEntity.ok(authService.login(memberRequestDto));
    }

    @PostMapping("/reissue")
    public ResponseEntity<TokenDTO> reissue(@RequestBody TokenRequestDTO tokenRequestDto) {
        return ResponseEntity.ok(authService.reissue(tokenRequestDto));
    }
}

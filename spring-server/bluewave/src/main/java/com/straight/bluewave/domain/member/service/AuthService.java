package com.straight.bluewave.domain.member.service;

import com.straight.bluewave.domain.member.dto.MemberResponseDTO;
import com.straight.bluewave.domain.member.dto.MemberRequestDTO;
import com.straight.bluewave.domain.member.dto.TokenDTO;
import com.straight.bluewave.domain.member.dto.TokenRequestDTO;
import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.member.entity.RefreshToken;
import com.straight.bluewave.domain.member.jwt.TokenProvider;
import com.straight.bluewave.domain.member.repository.MemberRepository;
import com.straight.bluewave.domain.member.repository.RefreshTokenRepository;
import com.straight.bluewave.global.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;

@Service
@RequiredArgsConstructor
@Log4j2
public class AuthService {
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    public MemberResponseDTO signup(MemberRequestDTO memberRequestDto) {
        if (memberRepository.existsByMemberEmail(memberRequestDto.getMember_email())) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다");
        }

        Member member = memberRequestDto.toMember(passwordEncoder);
        return MemberResponseDTO.of(memberRepository.save(member));
    }

    @Transactional
    public TokenDTO login(MemberRequestDTO memberRequestDto) {
        // 1. Login ID/PW 를 기반으로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken = memberRequestDto.toAuthentication();

        // 2. 실제로 검증 (사용자 비밀번호 체크) 이 이루어지는 부분
        //    authenticate 메서드가 실행이 될 때 CustomUserDetailsService 에서 만들었던 loadUserByUsername 메서드가 실행됨
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenDTO tokenDto = tokenProvider.generateTokenDto(authentication);

        // 4. RefreshToken 저장
        RefreshToken refreshToken = RefreshToken.builder()
                .key(authentication.getName())
                .value(tokenDto.getRefreshToken())
                .build();

        refreshTokenRepository.save(refreshToken);

        // 5. 토큰 발급
        return tokenDto;
    }

    @Transactional
    public TokenDTO reissue(TokenRequestDTO tokenRequestDto) {
        // 1. Refresh Token 검증
        if (!tokenProvider.validateToken(tokenRequestDto.getRefreshToken())) {
            throw new RuntimeException("Refresh Token 이 유효하지 않습니다.");
        }

        // 2. Access Token 에서 Member ID 가져오기
        Authentication authentication = tokenProvider.getAuthentication(tokenRequestDto.getAccessToken());

        // 3. 저장소에서 Member ID 를 기반으로 Refresh Token 값 가져옴
        RefreshToken refreshToken = refreshTokenRepository.findByKey(authentication.getName())
                .orElseThrow(() -> new RuntimeException("로그아웃 된 사용자입니다."));

        // 4. Refresh Token 일치하는지 검사
        if (!refreshToken.getValue().equals(tokenRequestDto.getRefreshToken())) {
            throw new RuntimeException("토큰의 유저 정보가 일치하지 않습니다.");
        }

        // 5. 새로운 토큰 생성
        TokenDTO tokenDto = tokenProvider.generateTokenDto(authentication);

        // 6. 저장소 정보 업데이트
        RefreshToken newRefreshToken = refreshToken.updateValue(tokenDto.getRefreshToken());
        refreshTokenRepository.save(newRefreshToken);

        // 토큰 발급
        return tokenDto;
    }

    @Transactional
    public void logout(HttpServletRequest request) {
        log.info("아이디 : " +  SecurityUtil.getCurrentMemberId());
        log.info("사용자 아이디 : " + String.valueOf(SecurityUtil.getCurrentMemberId()));
        refreshTokenRepository.deleteByKey(String.valueOf(SecurityUtil.getCurrentMemberId()))
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));

    }

    public boolean checkEmailDuplicate(String member_email) {
        return memberRepository.existsByMemberEmail(member_email);
    }
}

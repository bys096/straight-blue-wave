package com.straight.bluewave.global.oauth.service;

import com.straight.bluewave.domain.member.dto.TokenDTO;
import com.straight.bluewave.domain.member.entity.Authority;
import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.member.entity.RefreshToken;
import com.straight.bluewave.domain.member.jwt.TokenProvider;
import com.straight.bluewave.domain.member.repository.MemberRepository;
import com.straight.bluewave.domain.member.repository.RefreshTokenRepository;
import com.straight.bluewave.global.oauth.OAuthInfoResponse;
import com.straight.bluewave.global.oauth.OAuthLoginParams;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OAuthLoginService {

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final MemberRepository memberRepository;
    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    private final RequestOAuthInfoService requestOAuthInfoService;

    public TokenDTO login(OAuthLoginParams params) {
        OAuthInfoResponse oAuthInfoResponse = requestOAuthInfoService.request(params);

        Optional<Member> dbInfo = memberRepository.findByMemberEmail(oAuthInfoResponse.getEmail());

        if(dbInfo.isPresent()) {
            UsernamePasswordAuthenticationToken authenticationToken = oAuthInfoResponse.toAuthentication();

            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

            TokenDTO tokenDto = tokenProvider.generateTokenDto(authentication);

            RefreshToken refreshToken = RefreshToken.builder()
                    .key(authentication.getName())
                    .value(tokenDto.getRefreshToken())
                    .build();

            refreshTokenRepository.save(refreshToken);

            return tokenDto;
        } else {
            Member member = Member.builder()
                    .memberEmail(oAuthInfoResponse.getEmail())
                    .memberName(oAuthInfoResponse.getName())
                    .memberNick(oAuthInfoResponse.getNickname())
                    .oAuthProvider(oAuthInfoResponse.getOAuthProvider())
                    .authority(Authority.ROLE_USER)
                    .build();
            memberRepository.save(member);

            UsernamePasswordAuthenticationToken authenticationToken = oAuthInfoResponse.toAuthentication();

            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

            TokenDTO tokenDto = tokenProvider.generateTokenDto(authentication);

            RefreshToken refreshToken = RefreshToken.builder()
                    .key(authentication.getName())
                    .value(tokenDto.getRefreshToken())
                    .build();

            refreshTokenRepository.save(refreshToken);

            return tokenDto;
        }
    }
}

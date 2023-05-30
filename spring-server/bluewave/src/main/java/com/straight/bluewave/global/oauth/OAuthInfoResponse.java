package com.straight.bluewave.global.oauth;

import com.straight.bluewave.domain.member.entity.OAuthProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

public interface OAuthInfoResponse {        //AccessToken으로 요청한 외부 API 프로필 응답값을 우리 서비스의 Model로 변환하기 위한 인터페이스

    String getEmail();


    String getName();

    String getNickname();

    OAuthProvider getOAuthProvider();

    public UsernamePasswordAuthenticationToken toAuthentication();

}

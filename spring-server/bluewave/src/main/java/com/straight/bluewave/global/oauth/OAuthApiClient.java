package com.straight.bluewave.global.oauth;

import com.straight.bluewave.domain.member.entity.OAuthProvider;

public interface OAuthApiClient {       //API 요청 후 응답값을 리턴해주는 인터페이스

    OAuthProvider oAuthProvider();      //Client의 타입 반환
    String requestAccessToken(OAuthLoginParams params);     //Authorization Code 를 기반으로 인증 API 를 요청해서 Access Token 을 획득
    OAuthInfoResponse requestOauthInfo(String accessToken);     //Access Token 을 기반으로 Email, Nickname, Name이 포함된 프로필 정보를 획득
}

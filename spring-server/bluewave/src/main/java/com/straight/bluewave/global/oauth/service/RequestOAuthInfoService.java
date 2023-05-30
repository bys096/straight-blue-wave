package com.straight.bluewave.global.oauth.service;

import com.straight.bluewave.domain.member.entity.OAuthProvider;
import com.straight.bluewave.global.oauth.OAuthApiClient;
import com.straight.bluewave.global.oauth.OAuthInfoResponse;
import com.straight.bluewave.global.oauth.OAuthLoginParams;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class RequestOAuthInfoService {      //외부 API 요청의 중복되는 로직을 공통화한 클래스
    private final Map<OAuthProvider, OAuthApiClient> clients;

    public RequestOAuthInfoService(List<OAuthApiClient> clients) {      //NaverApiClient를 List<OAuthApiClient>를 주입 받아서 Map으로 만듬
        this.clients = clients.stream().collect(
                Collectors.toUnmodifiableMap(OAuthApiClient::oAuthProvider, Function.identity())
        );
    }

    public OAuthInfoResponse request(OAuthLoginParams params) {     //OAuthLoginParams 객체를 매개변수로 받고, 소셜 로그인 공급자에 따라 OAuthApiClient를 선택하여 액세스 토큰을 요청하고, 해당 액세스 토큰을 사용하여 OAuth 정보를 요청
        OAuthApiClient client = clients.get(params.oAuthProvider());
        String accessToken = client.requestAccessToken(params);
        return client.requestOauthInfo(accessToken);
    }

}

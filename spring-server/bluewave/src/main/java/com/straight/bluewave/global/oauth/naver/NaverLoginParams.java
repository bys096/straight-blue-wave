package com.straight.bluewave.global.oauth.naver;

import com.straight.bluewave.domain.member.entity.OAuthProvider;
import com.straight.bluewave.global.oauth.OAuthLoginParams;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Log4j2
@Getter
@NoArgsConstructor
public class NaverLoginParams implements OAuthLoginParams {         //네이버 API 요청에 필요한 authorizationCode, state를 갖고 있는 클래스
    private String authorizationCode;
    private String state;

    @Override
    public OAuthProvider oAuthProvider() {
        return OAuthProvider.NAVER;
    }

    @Override
    public MultiValueMap<String, String> makeBody() {
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        log.info("Received authorization code : " + authorizationCode);
        log.info("Received state : " + state);
        body.add("code", authorizationCode);
        body.add("state", state);
        return body;
    }

}

package com.straight.bluewave.global.oauth;

import com.straight.bluewave.domain.member.entity.OAuthProvider;
import org.springframework.util.MultiValueMap;

public interface OAuthLoginParams {         //요청에 필요한 데이터를 갖고 있는 파라미터(인터페이스)

    OAuthProvider oAuthProvider();
    MultiValueMap<String, String> makeBody();
}

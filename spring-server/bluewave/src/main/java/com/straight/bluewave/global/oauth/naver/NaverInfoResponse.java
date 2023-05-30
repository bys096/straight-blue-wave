package com.straight.bluewave.global.oauth.naver;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.straight.bluewave.domain.member.entity.OAuthProvider;
import com.straight.bluewave.global.oauth.OAuthInfoResponse;
import lombok.Getter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

public class NaverInfoResponse implements OAuthInfoResponse {

    @JsonProperty("response")
    private Response response;

    @Getter
    @JsonIgnoreProperties(ignoreUnknown = true)
    static class Response {
        private String email;

        private String nickname;

        private String name;

    }

    @Override
    public String getEmail() {
        return response.email;
    }

    @Override
    public String getNickname() {
        return response.nickname;
    }

    @Override
    public String getName() {
        return response.name;
    }


    @Override
    public OAuthProvider getOAuthProvider() {
        return OAuthProvider.NAVER;
    }

    @Override
    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(getEmail(), null);
    }
}

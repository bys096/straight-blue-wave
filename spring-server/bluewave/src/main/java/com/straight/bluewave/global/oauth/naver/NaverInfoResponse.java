package com.straight.bluewave.global.oauth.naver;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.straight.bluewave.domain.member.entity.OAuthProvider;
import com.straight.bluewave.global.oauth.OAuthInfoResponse;
import lombok.Getter;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
@Log4j2
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

        log.info("검증할 id : " + getEmail());

        return new UsernamePasswordAuthenticationToken(getEmail(), "");
    }
}

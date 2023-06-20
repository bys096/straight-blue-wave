package com.straight.bluewave.domain.member.dto;

import com.straight.bluewave.domain.member.entity.Authority;
import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.member.entity.OAuthProvider;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MemberRequestDTO {

    private String member_email;

    private String member_pw;

    private String member_name;

    private String member_nick;

    private String profile_photo;

    public Member toMember(PasswordEncoder passwordEncoder) {
        return Member.builder()
                .memberEmail(member_email)
                .memberPw(passwordEncoder.encode(member_pw))
                .memberName(member_name)
                .memberNick(member_nick)
                .profilePhoto(profile_photo)
                .authority(Authority.ROLE_USER)
                .oAuthProvider(OAuthProvider.BLUEWAVE)
                .build();
    }

    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(member_email, member_pw);
    }
}

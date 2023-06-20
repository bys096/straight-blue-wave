package com.straight.bluewave.domain.member.dto;

import com.straight.bluewave.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MemberResponseDTO {

    private Long member_id;
    private String member_email;

    private String member_name;

    private String member_nick;

    private String profile_photo;

    public static MemberResponseDTO of(Member member) {

        return MemberResponseDTO.builder()
                .member_email(member.getMemberEmail())
                .member_id(member.getMemberId())
                .member_name(member.getMemberName())
                .member_nick(member.getMemberNick())
                .profile_photo(member.getProfilePhoto())
                .build();

        //return new MemberResponseDTO(member.getMemberEmail());
    }
}

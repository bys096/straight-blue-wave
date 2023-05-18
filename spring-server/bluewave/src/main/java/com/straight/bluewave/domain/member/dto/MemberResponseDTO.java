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

    private String member_email;

    public static MemberResponseDTO of(Member member) {
        return new MemberResponseDTO(member.getMemberEmail());
    }
}

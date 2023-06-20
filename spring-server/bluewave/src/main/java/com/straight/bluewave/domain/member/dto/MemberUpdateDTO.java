package com.straight.bluewave.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MemberUpdateDTO {
    private Long member_id;
    private String member_email;

    private String member_name;

    private String member_nick;

    private String profile_photo;
}

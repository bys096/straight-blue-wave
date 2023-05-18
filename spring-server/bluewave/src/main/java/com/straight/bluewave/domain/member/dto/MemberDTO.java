package com.straight.bluewave.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MemberDTO {

    private Long member_id;

    private String member_email;

    private String member_pw;

    private String member_name;

    private String member_nick;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}

package com.straight.bluewave.domain.member.service;

import com.straight.bluewave.domain.member.dto.MemberDTO;
import com.straight.bluewave.domain.member.entity.Member;

public interface MemberService {

    default Member dtoToEntity(MemberDTO dto) {
        Member entity = Member.builder()
                .memberId(dto.getMember_id())
                .memberEmail(dto.getMember_email())
                .memberPw(dto.getMember_pw())
                .memberName(dto.getMember_name())
                .memberNick(dto.getMember_nick())
                .build();
        return entity;
    }

    default MemberDTO entityToDto(Member entity) {
        MemberDTO dto = MemberDTO.builder()
                .member_id(entity.getMemberId())
                .member_email(entity.getMemberEmail())
                .member_pw(entity.getMemberPw())
                .member_name(entity.getMemberName())
                .member_nick(entity.getMemberNick())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
        return dto;
    }

    MemberDTO read(Long id);

    void modify(MemberDTO member, Long id);

    void remove(Long id);
}

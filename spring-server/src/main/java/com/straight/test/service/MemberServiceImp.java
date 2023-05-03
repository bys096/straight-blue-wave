package com.straight.test.service;

import com.straight.test.domain.Member;
import com.straight.test.domain.dto.MemberDTO;
import com.straight.test.domain.dto.PageRequestDTO;
import com.straight.test.domain.dto.PageResultDTO;

public interface MemberServiceImp {
    default Member dtoToEntity(MemberDTO dto) {
        Member entity = Member.builder()
                .id(dto.getId())
                .userId(dto.getUser_id())
                .userPw(dto.getUser_pw())
                .userName(dto.getUser_name())
                .userGender(dto.getUser_gender())
                .userBirth(dto.getUser_birth())
                .userEmail(dto.getUser_email())
                .build();
        return entity;
    }

    default MemberDTO entityToDto(Member entity) {
        MemberDTO dto = MemberDTO.builder()
                .id(entity.getId())
                .user_id(entity.getUserId())
                .user_pw(entity.getUserPw())
                .user_name(entity.getUserName())
                .user_gender(entity.getUserGender())
                .user_email(entity.getUserEmail())
                .user_birth(entity.getUserBirth())
                .build();
        return dto;
    }

    MemberDTO read(String user_id);

    void modify(MemberDTO member);

    void remove(Long id);
}

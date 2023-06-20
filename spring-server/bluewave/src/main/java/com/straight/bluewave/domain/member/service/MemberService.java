package com.straight.bluewave.domain.member.service;

import com.straight.bluewave.domain.mapping.entity.FriendMapping;
import com.straight.bluewave.domain.member.dto.FriendDTO;
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
                .profilePhoto(dto.getProfile_photo())
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
                .profile_photo(entity.getProfilePhoto())
                .build();
        return dto;
    }

    default FriendDTO entityToDTO(FriendMapping entity) {
        FriendDTO dto = FriendDTO.builder()
                .frId(entity.getFrId())
                .friendName(entity.getFriend().getMemberName())
                .friendId(entity.getFriend().getMemberId())
                .build();
        return dto;
    }
}

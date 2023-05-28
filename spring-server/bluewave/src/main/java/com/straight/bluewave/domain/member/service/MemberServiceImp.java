package com.straight.bluewave.domain.member.service;

import com.straight.bluewave.domain.member.dto.MemberDTO;
import com.straight.bluewave.domain.member.dto.MemberResponseDTO;
import com.straight.bluewave.domain.member.dto.MemberUpdateDTO;
import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.member.repository.MemberRepository;
import com.straight.bluewave.global.util.SecurityUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberServiceImp implements MemberService{

    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;

    @Transactional
    public MemberResponseDTO findMemberInfoByEmail(String memberEmail) {
        return memberRepository.findByMemberEmail(memberEmail)
                .map(MemberResponseDTO::of)
                .orElseThrow(() -> new RuntimeException("유저 정보가 없습니다."));
    }

    @Transactional
    public MemberResponseDTO findMemberInfoById(Long memberId) {
        return memberRepository.findById(memberId)
                .map(MemberResponseDTO::of)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
    }



    @Transactional
    public void modify(MemberUpdateDTO dto) {
        Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId())
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));

        member.updateMember(dto,passwordEncoder);

    }

    @Transactional
    public void delete() {
        memberRepository.deleteById(SecurityUtil.getCurrentMemberId());
    }




    public List<Member> getAllMembers() {

        return memberRepository.findAll();
    }


}

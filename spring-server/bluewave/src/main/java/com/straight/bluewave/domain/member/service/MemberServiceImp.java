package com.straight.bluewave.domain.member.service;

import com.straight.bluewave.domain.member.dto.MemberDTO;
import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberServiceImp implements MemberService{

    private final MemberRepository memberRepository;

    public Member join(MemberDTO m) {
        Member member = Member.builder()
                .memberEmail(m.getMember_email())
                .memberPw(m.getMember_pw())
                .memberName(m.getMember_name())
                .memberNick(m.getMember_nick())
                .build();
        memberRepository.save(member);
        return member;
    }

    public MemberDTO login(MemberDTO m) {
        Optional<Member> result = memberRepository.findByUserEmailAndUserPw(m.getMember_email(), m.getMember_pw());

        return result.isPresent() ? entityToDto(result.get()) : null;
    }
    @Override
    public void modify(MemberDTO member, Long id) {
        Optional<Member> result = memberRepository.findById(id);

        if(result.isPresent()) {
            Member entity = result.get();

            memberRepository.save(entity);
        }

    }

    @Override
    public void remove(Long id) {

        memberRepository.deleteById(id);
    }

    public List<Member> getAllMembers() {

        return memberRepository.findAll();
    }

    @Override
    public MemberDTO read(Long id) {
        Optional<Member> result = memberRepository.findById(id);

        return result.isPresent() ? entityToDto(result.get()) : null;
    }
}

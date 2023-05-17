package com.straight.bluewave.domain.member.repository;

import com.straight.bluewave.domain.member.entity.Member;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class MemberRepositoryTest {

    @Autowired
    MemberRepository memberRepository;

    @Test
    void insertMember() {
        Member member = Member.builder()
                .memberName("testUser1")
                .build();
        memberRepository.save(member);
    }
}
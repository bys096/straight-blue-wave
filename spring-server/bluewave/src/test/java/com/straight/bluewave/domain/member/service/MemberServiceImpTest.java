package com.straight.bluewave.domain.member.service;

import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.member.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class MemberServiceImpTest {

    @Autowired
    MemberRepository memberRepository;
    /*@Test
    void delete() {
        Optional<Member> member = memberRepository.findById(2L);
        System.out.println("delete 전");
        memberRepository.delete(member.get());
    }*/
}
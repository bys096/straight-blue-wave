package com.straight.test.service;

import com.straight.test.domain.Member;
import com.straight.test.repository.SpringDataJpaMemberRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class MemberServiceTest {

   /* Member m1, m2, m3;

    List<Member> list = new ArrayList<Member>();
    @BeforeEach
    void 테스트시작() {
        m1 = new Member();
        m1.setName("test1");
        memberRepository.save(m1);
        list.add(m1);
        m2 = new Member();
        m2.setName("test2");
        memberRepository.save(m2);
        list.add(m2);

        m3 = new Member();
        m3.setName("test3");
//        m3.setPhone("01082882");
        memberRepository.save(m3);
        list.add(m3);
    }

    @AfterEach
    void 테스트후삭제() {
        memberRepository.deleteAll();
    }

    @Autowired SpringDataJpaMemberRepository memberRepository;

    @Test
    void 회원가입() {
        List<Member> findList = memberRepository.findAll();
        assertThat(list).usingRecursiveComparison().isEqualTo(findList);
    }
*/
//    @Test
//    void 회원탈퇴() {
//    }
}
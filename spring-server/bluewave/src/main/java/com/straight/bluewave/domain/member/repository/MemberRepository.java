package com.straight.bluewave.domain.member.repository;

import com.straight.bluewave.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByMemberEmail(String memberEmail);


    boolean existsByMemberEmail(String memberEmail);    //중복 가입 방지
}

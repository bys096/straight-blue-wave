package com.straight.bluewave.domain.member.repository;

import com.straight.bluewave.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
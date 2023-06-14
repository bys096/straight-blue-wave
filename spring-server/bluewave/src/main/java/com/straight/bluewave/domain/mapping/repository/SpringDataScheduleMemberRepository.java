package com.straight.bluewave.domain.mapping.repository;

import com.straight.bluewave.domain.mapping.entity.ScheduleMemberMapping;
import com.straight.bluewave.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SpringDataScheduleMemberRepository extends JpaRepository<ScheduleMemberMapping, Long> {

    Optional<ScheduleMemberMapping> findByMember(Member member);
}

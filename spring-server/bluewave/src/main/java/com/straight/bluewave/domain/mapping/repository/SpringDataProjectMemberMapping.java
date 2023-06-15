package com.straight.bluewave.domain.mapping.repository;

import com.straight.bluewave.domain.mapping.entity.ProjectMemberMapping;
import com.straight.bluewave.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SpringDataProjectMemberMapping extends JpaRepository<ProjectMemberMapping, Long> {

    Optional<ProjectMemberMapping> findByMember(Member member);
}

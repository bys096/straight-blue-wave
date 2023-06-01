package com.straight.bluewave.domain.mapping.repository;

import com.straight.bluewave.domain.mapping.entity.ScheduleMemberMapping;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpringDataScheduleMemberRepository extends JpaRepository<ScheduleMemberMapping, Long> {
}

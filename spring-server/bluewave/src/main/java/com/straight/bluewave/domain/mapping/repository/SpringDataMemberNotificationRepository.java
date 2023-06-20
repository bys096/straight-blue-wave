package com.straight.bluewave.domain.mapping.repository;

import com.straight.bluewave.domain.mapping.entity.MemberNotificationMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SpringDataMemberNotificationRepository extends JpaRepository<MemberNotificationMapping, Long> {
    @Query("select n from MemberNotificationMapping n where n.member.memberId = :memberId")
    List<MemberNotificationMapping> findAllByMember(@Param("memberId") Long memberId);
}

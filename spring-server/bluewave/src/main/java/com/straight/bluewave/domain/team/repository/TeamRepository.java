package com.straight.bluewave.domain.team.repository;

import com.straight.bluewave.domain.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TeamRepository {
    Page<Object[]> searchTeamPage(Long teamId, String type, String keyword, Pageable pageable);

    public List<Member> searchTeamMemberList(Long n);
}

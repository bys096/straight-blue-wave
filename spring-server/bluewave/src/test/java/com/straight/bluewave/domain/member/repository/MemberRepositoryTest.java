package com.straight.bluewave.domain.member.repository;

import com.straight.bluewave.application.dto.PageRequestDTO;
import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.team.dto.TeamPageRequestDTO;
import com.straight.bluewave.domain.team.repository.TeamRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;


import java.util.List;

//@SpringBootTest
@SpringBootTest
class MemberRepositoryTest {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    TeamRepository teamRepository;

    @Test
    void insertMember() {
        Member member = Member.builder()
                .memberName("testUser2")
                .build();
        memberRepository.save(member);
    }

//    public MemberRepositoryTest() { super(Member.class); }
    @Test
    void joinSelect() {

        List<Member> l= teamRepository.searchTeamMemberList(2L);
        for(Member x : l) {
            System.out.println("UserName: " + x.getMemberName());
        }
    }

    @Test
    void selectTeam() {
        TeamPageRequestDTO pageRequestDTO = new TeamPageRequestDTO();
        Page<Object[]> result = teamRepository.searchTeamPage(
//                1L,
//                pageRequestDTO.getType(),
//                pageRequestDTO.getKeyword(),
                pageRequestDTO,
                pageRequestDTO.getPageable(Sort.by("mem_id").descending())
        );
    }
}
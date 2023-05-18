package com.straight.bluewave.domain.member.repository;

import com.straight.bluewave.domain.mapping.entity.TeamMemberMapping;
import com.straight.bluewave.domain.mapping.repository.SpringDataTeamMemberRepository;
import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.team.dto.TeamPageRequestDTO;
import com.straight.bluewave.domain.team.entity.Team;
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

    @Autowired
    SpringDataTeamMemberRepository dataTeamMemberRepository;

    @Test
    void insertMember() {
        for(int i = 0; i < 50; i++) {
        Member member = Member.builder()
                .memberName("User" + i)
                .build();
        memberRepository.save(member);
        }

    }

    @Test
    void insertTeamMember() {
        for(Long i = 10L; i < 50L; i++) {
            Member member = Member.builder().memberId(i).build();
            Team team = Team.builder().teamId(1L).build();
            TeamMemberMapping teamMember = TeamMemberMapping.builder().
                    team(team)
                    .member(member)
                    .build();
            dataTeamMemberRepository.save(teamMember);

        }
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
        PageRequestDTO pageRequestDTO = new PageRequestDTO();
        Page<Object[]> result = teamRepository.searchTeamPage(
                1L,
                pageRequestDTO.getType(),
                pageRequestDTO.getKeyword(),
                pageRequestDTO.getPageable(Sort.by("mem_id").descending())
        );
    }
}
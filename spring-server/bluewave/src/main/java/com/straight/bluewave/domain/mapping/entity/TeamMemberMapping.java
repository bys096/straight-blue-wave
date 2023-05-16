package com.straight.bluewave.domain.mapping.entity;

import com.straight.bluewave.application.entity.BaseEntity;
import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.team.entity.Team;

import javax.persistence.*;

@Entity
//@IdClass(TeamMemberId.class)  복합키 방식 -> 매핑 id를 두는 방식으로 변경
public class TeamMemberMapping extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tm_id")
    private Long teamMemberId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mem_id")
    private Member member;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "team_id")
    private Team team;
}

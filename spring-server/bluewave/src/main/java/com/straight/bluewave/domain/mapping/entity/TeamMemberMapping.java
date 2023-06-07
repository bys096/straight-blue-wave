package com.straight.bluewave.domain.mapping.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.straight.bluewave.application.entity.BaseEntity;
import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.team.entity.Team;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
//@IdClass(TeamMemberId.class)  복합키 방식 -> 매핑 id를 두는 방식으로 변경
public class TeamMemberMapping extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tm_id")
    private Long teamMemberId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mem_id")
    @JsonIgnore
    private Member member;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "team_id")
    @JsonIgnore
    private Team team;

    @Column(name = "tm_position")       //ex)매니저, 팀장
    private String teamPosition;

    @Column(name = "tm_name")       //팀원 이름
    private String teamName;

}

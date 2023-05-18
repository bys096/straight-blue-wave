package com.straight.bluewave.domain.team.entity;


import com.straight.bluewave.application.entity.BaseEntity;
import com.straight.bluewave.domain.mapping.entity.TeamMemberMapping;
import com.straight.bluewave.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Team extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_id")
    private Long teamId;

    @Column(name = "team_name")
    private String teamName;

    @Column(name = "team_desc")
    private String teamDesc;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mem_id")
    private Member member;                  // 관리자

    @OneToMany(mappedBy = "team", fetch = FetchType.LAZY)
    private List<TeamMemberMapping> members;

    public void changeTeamName(String teamName){
        this.teamName = teamName;
    }

    public void changeTeamDesc(String teamDesc) {
        this.teamDesc = teamDesc;
    }


}

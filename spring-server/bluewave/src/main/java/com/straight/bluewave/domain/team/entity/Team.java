package com.straight.bluewave.domain.team.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.straight.bluewave.application.entity.BaseEntity;
import com.straight.bluewave.domain.mapping.entity.TeamMemberMapping;
import com.straight.bluewave.domain.mapping.entity.TeamProjectMapping;
import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.project.entity.Project;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@SQLDelete(sql = "UPDATE team SET deleted_at = current_timestamp WHERE team_id = ?")
@Where(clause = "deleted_at is null")
public class Team extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_id")
    private Long teamId;

    @Column(name = "team_name")
    private String teamName;

    @Column(name = "team_desc")
    private String teamDesc;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mem_id")
    @JsonIgnore
    private Member member;

    @OneToMany(mappedBy = "team", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<TeamMemberMapping> members;

    @OneToMany(mappedBy = "team", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<TeamProjectMapping> projects;

    public void changeTeamName(String teamName){
        this.teamName = teamName;
    }

    public void changeTeamDesc(String teamDesc) {
        this.teamDesc = teamDesc;
    }

    public void setTeamId(Long teamId) {
        this.teamId = teamId;
    }

}

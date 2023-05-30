package com.straight.bluewave.domain.mapping.entity;

import com.straight.bluewave.domain.project.entity.Project;
import com.straight.bluewave.domain.team.entity.Team;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeamProjectMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tm_id")
    private Long teamProjectId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "prj_id")
    private Project project;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "team_id")
    private Team team;
}

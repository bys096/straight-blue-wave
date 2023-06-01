package com.straight.bluewave.domain.mapping.entity;

import com.straight.bluewave.domain.project.entity.Project;
import com.straight.bluewave.domain.schedule.entity.Schedule;
import com.straight.bluewave.domain.team.entity.Team;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectScheduleMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pr_id")
    private Long projectScheduleId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "prj_id")
    private Project project;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "schedule_id")
    private Schedule schedule;
}

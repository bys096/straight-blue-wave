package com.straight.bluewave.domain.mapping.entity;

import com.straight.bluewave.application.entity.BaseEntity;
import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.project.entity.Project;

import javax.persistence.*;

@Entity
public class ProjectMemberMapping extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pj_id")
    private Long prjMemberId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mem_id")
    private Member member;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "prj_id")
    private Project project;

    @Column(name = "prj_role")          //ex)백엔드, 프론트엔드
    private String prjRole;
}

package com.straight.bluewave.domain.schedule.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.straight.bluewave.application.entity.BaseEntity;
import com.straight.bluewave.domain.project.entity.Project;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Schedule extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long scheduleId;

    @Column(name = "schedule_title")
    private String scheduleTitle;

    @Column(name = "schedule_description")
    private String scheduleDescription;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "meeting_format")
    private String meetingFormat;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prj_id")
    @JsonIgnore
    private Project project;

//    private Long post_id;

    public void changeChTitle(String scheduleTitle){
        this.scheduleTitle = scheduleTitle;
    }

    public void changeChDesc(String scheduleDescription){
        this.scheduleDescription = scheduleDescription;
    }

    public void changeChStart(Date startDate){
        this.startDate = startDate;
    }

    public void changeChEnd(Date endDate){
        this.endDate = endDate;
    }

    public void changeChFormat(String meetingFormat){
        this.meetingFormat = meetingFormat;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}

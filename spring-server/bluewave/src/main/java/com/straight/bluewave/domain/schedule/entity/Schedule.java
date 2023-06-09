package com.straight.bluewave.domain.schedule.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.straight.bluewave.application.entity.BaseEntity;
import com.straight.bluewave.domain.mapping.entity.ScheduleMemberMapping;
import com.straight.bluewave.domain.post.entity.Post;
import com.straight.bluewave.domain.project.entity.Project;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

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

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "post_id")
//    private Post post;

    @OneToMany(mappedBy = "schedule")
    private Set<ScheduleMemberMapping> scheduleMemberMappings;

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

//    public void setPost(Post post) {
//        this.post = post;
//    }

//    public void addMapping(ScheduleMemberMapping mapping) {
//        scheduleMemberMappings.add(mapping);
//        mapping.setSchedule(this);
//    }
}

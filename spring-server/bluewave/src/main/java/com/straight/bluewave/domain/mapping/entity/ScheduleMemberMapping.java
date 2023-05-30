package com.straight.bluewave.domain.mapping.entity;

import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.post.entity.Post;
import com.straight.bluewave.domain.schedule.entity.Schedule;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleMemberMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sm_id")
    private Long smId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "schedule_id")
    private Schedule schedule;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mem_id")
    private Member member;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "post_id")
    private Post post;

    @Column(name = "participant_status")
    private String participantStatus;

    @Column(name = "state_change_time")
    private LocalDateTime stateChangeTime;

    @Column(name = "request_data")
    private String requestData;

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }

    public Schedule getSchedule() {
        return schedule;
    }
}

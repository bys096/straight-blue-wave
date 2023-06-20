package com.straight.bluewave.domain.notification.entity;

import com.straight.bluewave.domain.notification.dto.NotificationDTO;
import com.straight.bluewave.domain.post.entity.Post;
import com.straight.bluewave.domain.schedule.entity.Schedule;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;

    @Column(name = "notification_type")
    private int notificationType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schedule_id")
    private Schedule schedule;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    public void setPost(Post post) {
        this.post = post;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }

}

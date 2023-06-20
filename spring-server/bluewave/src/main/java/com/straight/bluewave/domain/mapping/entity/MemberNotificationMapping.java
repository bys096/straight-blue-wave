package com.straight.bluewave.domain.mapping.entity;

import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.notification.entity.Notification;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberNotificationMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mn_id")
    private Long mnId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "notification_id")
    private Notification notification;

    @Column
    private boolean confirmation;


    public Long getMnId() {
        return mnId;
    }

    public boolean isConfirmation() {
        return confirmation;
    }

    public Long getMember() {
        return member.getMemberId();
    }

    public Long getNotification(){
        return notification.getNotificationId();
    }
}

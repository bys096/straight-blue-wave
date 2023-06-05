package com.straight.bluewave.domain.notification.entity;

import com.straight.bluewave.application.entity.BaseEntity;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(force = true)
@Getter
public class Notification extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notiId;

    @JoinColumn(name = "mem_id")
    private Long memId;

    @JoinColumn(name = "schedule_id")
    private Long scheduleId;

    @Column(name = "ntc_message")
    private String ntcMessage;

    @Column(name = "read_or_not", nullable = false)
    private boolean readOrNot;

    @Column(name = "post_link")
    private String postLink;

    @Column(name = "noti_status")
    private String notiStatus;


    public void changePostLink(String postLink){
        this.postLink = postLink;
    }

    public void changeReadOrNot(boolean readOrNot) {
        this.readOrNot = readOrNot;
    }

    public void changeNotiStatus(String notiStatus){
        this.notiStatus = notiStatus;
    }

}

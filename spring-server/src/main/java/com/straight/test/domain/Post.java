package com.straight.test.domain;

import com.straight.test.domain.dto.PostDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@DynamicInsert
@DynamicUpdate
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long post_id;

//    private Long stage_id; 임시 제외

    @JoinColumn(name = "mem_id")
    private Long mem_id;

    @JoinColumn(name = "brd_id")
    private Long brd_id;

    @Column(name = "post_content")
    private String post_content;

    @Column(name = "post_name")
    private String post_name;

    @Column(name = "post_createAt", updatable = false)
    private LocalDateTime post_createAt;

    @Column(name = "post_modify")
    private LocalDateTime post_modify;

    @Column(name = "meeting_date")
    private Date meeting_date;

    @JoinColumn(name = "attendees_id")
    private Long attendees_id;

    @Column(name = "file_status")
    private boolean file_status;

    @Column(name = "voting_status")
    private boolean voting_status;

    public void changePost(PostDTO dto){
        this.mem_id = dto.getMem_id();
        this.brd_id = dto.getBrd_id();
        this.post_content = dto.getPost_content();
        this.post_name = dto.getPost_name();
        this.meeting_date = dto.getMeeting_date();
        this.attendees_id = dto.getAttendees_id();
    }

    public Post(PostDTO dto){
        this.post_id = dto.getPost_id();
        this.mem_id = dto.getMem_id();
        this.brd_id = dto.getBrd_id();
        this.post_content = dto.getPost_content();
        this.post_name = dto.getPost_name();
        this.meeting_date = dto.getMeeting_date();
        this.attendees_id = dto.getAttendees_id();
    }
}

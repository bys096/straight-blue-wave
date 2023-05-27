package com.straight.bluewave.domain.post.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.straight.bluewave.application.entity.BaseEntity;
import com.straight.bluewave.domain.board.entity.Board;
import com.straight.bluewave.domain.post.dto.PostDTO;
import com.straight.bluewave.domain.schedule.entity.Schedule;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@DynamicInsert
@DynamicUpdate
public class Post extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long post_id;

//    private Long stage_id; 임시 제외

    @JoinColumn(name = "mem_id")
    private Long mem_id;

    @Column(name = "post_content")
    private String post_content;

    @Column(name = "post_name")
    private String post_name;


/*  BaseEntity 상속했으므로 주석처리
    @Column(name = "post_createAt", updatable = false)
    private LocalDateTime post_createAt;
*/
    @Column(name = "post_modify")
    private LocalDateTime post_modify;
/*
    @Column(name = "meeting_date")
    private Date meeting_date;
*/

    @JoinColumn(name = "attendees_id")
    private Long attendees_id;

    @Column(name = "file_status")
    private boolean file_status;

    @Column(name = "voting_status")
    private boolean voting_status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brd_id")
    private Board board;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Schedule> schedule;

    public Post(Board board, PostDTO dto) {
    }

    public void changePost(PostDTO dto){
        this.mem_id = dto.getMem_id();
        this.post_content = dto.getPost_content();
        this.post_name = dto.getPost_name();
        this.attendees_id = dto.getAttendees_id();
    }

    public void setBoard(Board board){
        this.board = board;
    }

    public void setPostId(Long post_id){
        this.post_id = post_id;
    }

}
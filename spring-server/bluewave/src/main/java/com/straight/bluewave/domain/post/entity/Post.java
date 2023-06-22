package com.straight.bluewave.domain.post.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.straight.bluewave.application.entity.BaseEntity;
import com.straight.bluewave.domain.board.entity.Board;
import com.straight.bluewave.domain.mapping.entity.ScheduleMemberMapping;
import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.notification.entity.Notification;
import com.straight.bluewave.domain.post.dto.PostDTO;
import com.straight.bluewave.domain.reply.entity.Reply;
import com.straight.bluewave.domain.schedule.entity.Schedule;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@DynamicInsert
@DynamicUpdate
//@SQLDelete(sql = "UPDATE post SET deleted_at = current_timestamp WHERE post_id = ?")
//@Where(clause = "deleted_at is null")
public class Post extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long post_id;

//    private Long stage_id; 임시 제외


    @Column(name = "post_content", length = 10000)
    private String post_content;

    @Column(name = "post_name")
    private String post_name;


/*  BaseEntity 상속했으므로 주석처리
    @Column(name = "post_createAt", updatable = false)
    private LocalDateTime post_createAt;
*/
    @Column(name = "post_modify")
    private LocalDateTime post_modify;

    @Column(name = "meeting_date")
    private Date meeting_date;

    @Column(name = "attendees_id")
    private Long attendees_id;


//    @Column(name = "file_status")
//    private boolean file_status;

//    @Column(name = "voting_status")
//    private boolean voting_status;

    /*@Column(name = "deleted_at")
    private LocalDateTime deletedAt;*/

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mem_id")
    private Member member;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "brd_id")
    private Board board;

//    @JsonIgnore
//    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Schedule> schedule;

    @JsonIgnore
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ScheduleMemberMapping> scheduleMemberMappings;

    // 게시글 삭제시 댓글 삭제
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reply> replies;

    public Post(Board board, PostDTO dto) {
    }

    public void changePost(PostDTO dto){
        this.post_content = dto.getPost_content();
        this.post_name = dto.getPost_name();
        this.meeting_date = dto.getMeeting_date();
        this.attendees_id = dto.getAttendees_id();
    }

    public void setBoard(Board board){
        this.board = board;
    }

    public void setMember(Member member){
        this.member = member;
    }

    public void setPostId(Long postId){
        this.post_id = postId;
    }

}
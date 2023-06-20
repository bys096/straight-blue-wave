package com.straight.bluewave.domain.reply.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.straight.bluewave.application.entity.BaseEntity;
import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.post.entity.Post;
import com.straight.bluewave.domain.reply.dto.ReplyDTO;
import lombok.*;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Reply extends BaseEntity {

    @Id @Column(name = "reply_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long replyId;

    @Column(name = "reply_content", nullable = false)
    private String replyContent;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "mem_id")
    private Member member;

    // CascadeType.ALL = 모든 상황에서의 영속성 관리
    // 게시글 삭제시
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="post_id")
    private Post post;



    @OneToMany(mappedBy = "parentReply", fetch = FetchType.LAZY)
    private List<Reply> childReplies;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_reply_id")
    private Reply parentReply;




//     Casecade.ALL = 부모 댓글 삭제시 자식 댓글 함께 삭제
//    @Builder.Default

    /*
    수정 가능 목록
    1. 댓글 내용
    2. 수정 여부 확인용 -> true(수정됨)/false(수정되지 않음)
    3. 수정 날짜 (BaseEntity에서 자동으로 됨)
     */
    public void updateContent(ReplyDTO dto) {
        this.replyContent = dto.getReply_content();
//        this.replyModify = true;
    }

    // post entity 변경 작업은 Post에서
//    public void setPost(Post post) {
//        this.post = post;
//        post.getReplies().add(this);
//    }
//
//    public void setMember(Member member) {
//        this.member = member;
//        member.getReplies().add(this);
//    }
}

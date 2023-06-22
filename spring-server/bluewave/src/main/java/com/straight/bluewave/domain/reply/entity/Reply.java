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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mem_id")
    private Member member;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="post_id")
    private Post post;


    @Builder.Default
    @OneToMany(mappedBy = "parent", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reply> children = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Reply parent;

    public static Reply createReply(String replyContent, Post post, Member member, Reply parent) {
        Reply reply = new Reply();
        reply.replyContent = replyContent;
        reply.member = member;
        reply.post = post;
        reply.parent = parent;
        return reply;
    }

    /*
    수정 가능 목록
    1. 댓글 내용
    2. 수정 여부 확인용 -> true(수정됨)/false(수정되지 않음)
    3. 수정 날짜 (BaseEntity에서 자동으로 됨)
     */
    public void updateContent(ReplyDTO dto) {
        this.replyContent = dto.getReplyContent();
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

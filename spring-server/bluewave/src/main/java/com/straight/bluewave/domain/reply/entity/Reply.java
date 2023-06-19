package com.straight.bluewave.domain.reply.entity;


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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long replyId;

    @Column(name = "reply_content", nullable = false)
    private String replyContent;

    // 수정 여부 updateAt과 명확한 구분을 위해 modify로 명명
    @Column(name = "reply_modify")
    private boolean replyModify;


    // 생성일자, 수정일자는 BaseEntity에 구현되어있음.


    // 아래 칼럼은 FK

    @JoinColumn(name ="mem_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Long memberId;

    @JoinColumn(name ="post_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Long post_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="parent_id")
    private Long parentReply;



//     Casecade.ALL = 부모 댓글 삭제시 자식 댓글 함께 삭제
    @Builder.Default
    @OneToMany(mappedBy = "parent_reply", orphanRemoval = true)
    private List<Reply> childComments = new ArrayList<>();


    /*
    수정 가능 목록
    1. 댓글 내용
    2. 수정 여부 확인용 -> true(수정됨)/false(수정되지 않음)
    3. 수정 날짜 (BaseEntity에서 자동으로 됨)
     */
    public void update(ReplyDTO dto) {
        this.replyContent = dto.getReply_content();
//        this.replyModify = true;
    }

    public void changeModify(boolean truly) {
        this.replyModify = truly; // 수정시 true로 변경
    }
}

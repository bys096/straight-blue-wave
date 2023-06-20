package com.straight.bluewave.domain.mapping.entity;

import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.reply.entity.Reply;
import jdk.jfr.Enabled;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberReplyMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mr_id")
    private Long memberReplyId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mem_id")
    @JsonIgnore
    private Member member;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "reply_id")
    @JsonIgnore
    private Reply reply;
}

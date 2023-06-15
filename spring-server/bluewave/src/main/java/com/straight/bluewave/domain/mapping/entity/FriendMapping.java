package com.straight.bluewave.domain.mapping.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.straight.bluewave.application.entity.BaseEntity;
import com.straight.bluewave.domain.member.entity.Member;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class FriendMapping extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fr_id")
    private Long frId;

    @ManyToOne(fetch = FetchType.EAGER)         //친추 건 아이디
    @JoinColumn(name = "mem_id")
    @JsonIgnore
    private Member member;

    @ManyToOne(fetch = FetchType.EAGER)     //친추 받은 아이디
    @JoinColumn(name = "friend_id")
    @JsonIgnore
    private Member friend;

    @Column(name = "fr_name")       //친구 이름
    private String friendName;

}

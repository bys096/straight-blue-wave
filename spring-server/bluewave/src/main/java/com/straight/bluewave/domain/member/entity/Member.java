package com.straight.bluewave.domain.member.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.straight.bluewave.application.entity.BaseEntity;
import com.straight.bluewave.domain.mapping.entity.FriendMapping;
import com.straight.bluewave.domain.mapping.entity.ProjectMemberMapping;
import com.straight.bluewave.domain.mapping.entity.ScheduleMemberMapping;
import com.straight.bluewave.domain.mapping.entity.TeamMemberMapping;
import com.straight.bluewave.domain.member.dto.MemberUpdateDTO;
import com.straight.bluewave.domain.project.entity.Project;
import com.straight.bluewave.domain.reply.entity.Reply;
import com.straight.bluewave.domain.team.entity.Team;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
//@SQLDelete(sql = "UPDATE member SET deleted_at = current_timestamp WHERE mem_id = ?")
//@Where(clause = "deleted_at is null")
public class Member extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mem_id")
    private Long memberId;

    @Column(name = "mem_email" ,unique = true)
    private String memberEmail;

    @Column(name = "mem_pw")
    private String memberPw;

    @Column(name = "mem_name")
    private String memberName;

    @Column(name = "mem_nick")
    private String memberNick;

    /*@Column(name = "deleted_at")
    private LocalDateTime deletedAt;*/

    @Enumerated(EnumType.STRING)
    private Authority authority;

    @Enumerated(EnumType.STRING)
    private OAuthProvider oAuthProvider;

    public void updateMember(MemberUpdateDTO dto) {
        if(dto.getMember_name() != null) this.memberName = dto.getMember_name();
        if (dto.getMember_nick() != null) this.memberNick = dto.getMember_nick();
    }

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Team> team;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)     //참조되는 쪽에서 mappedBy
    private List<TeamMemberMapping> teams;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProjectMemberMapping> projects;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ScheduleMemberMapping> scheduleMemberMappings;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FriendMapping> friends1;

    @OneToMany(mappedBy = "friend", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FriendMapping> friends2;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reply> replies;

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }


/*
    - 중간 엔티티 없이, 매핑 테이블을 생성하는 코드
    다만, 팀 가입일 등의 정보를 표시할 수 없고, 확장성이 떨어져 주석 처리
    @ManyToMany
    @JoinTable(name = "member_team",
                joinColumns = @JoinColumn(name = "mem_id"),
                inverseJoinColumns = @JoinColumn(name = "team_id"))
    private List<Team> teams;
*/

}

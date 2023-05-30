package com.straight.bluewave.domain.member.entity;

import com.straight.bluewave.application.entity.BaseEntity;
import com.straight.bluewave.domain.mapping.entity.ProjectMemberMapping;
import com.straight.bluewave.domain.mapping.entity.TeamMemberMapping;
import com.straight.bluewave.domain.member.dto.MemberUpdateDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
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

    @Enumerated(EnumType.STRING)
    private Authority authority;

    @Enumerated(EnumType.STRING)
    private OAuthProvider oAuthProvider;

    public void updateMember(MemberUpdateDTO dto) {
        if(dto.getMember_name() != null) this.memberName = dto.getMember_name();
        if (dto.getMember_nick() != null) this.memberNick = dto.getMember_nick();
    }

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)     //참조되는 쪽에서 mappedBy
    private List<TeamMemberMapping> teams;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<ProjectMemberMapping> projects;

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

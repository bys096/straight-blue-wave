package com.straight.bluewave.domain.project.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.straight.bluewave.domain.board.entity.Board;
import com.straight.bluewave.application.entity.BaseEntity;
import com.straight.bluewave.domain.mapping.entity.TeamProjectMapping;
import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.schedule.entity.Schedule;
import com.straight.bluewave.domain.team.entity.Team;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Project extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "prj_id")
    private Long prjId;

    @Column(name = "prj_name")
    private String prjName;

/*  공통 엔티티 생성했으므로 주석처리
    @Column(name = "creation_date", updatable = false)
    private Date creationDate;
*/


/*  SQL count 함수로 대체 가능하므로 주석처리
    @Column(name = "member_number")
    @ColumnDefault("1")
    private int memberNumber;
*/

    /*  추후 이미지 테이블을 만들 것이므로 주석처리
        @Column(name = "prj_thumbnail")
        private String prjThumbnail;
    */

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    @JsonIgnore
    private Team team;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Board> boards;

    @OneToMany(mappedBy = "project", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval=true)
    private List<TeamProjectMapping> teamProjectMappings;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Schedule> schedule;

    //socket.io Room
    @Column(columnDefinition = "BINARY(16)")
    private UUID prjRoom;

    public void changePrjName(String prjName){
        this.prjName = prjName;
    }


    public void setPrjId(Long prjId) {
        this.prjId = prjId;
    }

    public void setTeam(Team team){
        this.team = team;
    }
}
package com.straight.bluewave.domain.project.entity;


import com.straight.bluewave.domain.board.entity.Board;
import com.straight.bluewave.application.entity.BaseEntity;
import com.straight.bluewave.domain.team.entity.Team;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter

//@DynamicInsert
//@DynamicUpdate
public class Project extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long prjId;

    @Column(name = "prj_name")
    private String prjName;

    @OneToMany(mappedBy = "project")

    private List<Board> boards;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;


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


}
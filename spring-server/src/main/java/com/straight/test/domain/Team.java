package com.straight.test.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@DynamicInsert
@DynamicUpdate
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tno;

    @Column(name = "team_name")
    private String teamName;

    @Column(name = "team_member")
    private int teamMember;

    @CreatedDate
    @Column(name = "team_regdate", updatable = false)
    private LocalDateTime teamRegDate;

    @Column(name = "team_writer")
    private String teamWriter;

    public void changeTeamName(String teamName) {
        this.teamName = teamName;
    }
}

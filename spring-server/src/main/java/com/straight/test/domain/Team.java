package com.straight.test.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@DynamicInsert
@DynamicUpdate
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tmId;

    @Column(name = "tm_name")
    private String tmName;

    @Column(name = "tm_intro")
    private String tmIntro;

    @CreatedDate
    @Column(name = "creation_date", updatable = false)
    private LocalDateTime creationDate;

    @Column(name = "tm_number")
    private int tmNumber;

    @Column(name = "tm_thumbnail")
    private String tmThumbnail;

    public void changeTeamName(String tmName) {
        this.tmName = tmName;
    }

    public void changeTeamIntro(String tmIntro) {
        this.tmIntro = tmIntro;
    }
}

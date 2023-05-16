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
import java.sql.Date;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@DynamicInsert
@DynamicUpdate
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long prjId;

    @Column(name = "prj_name")
    private String prjName;

    @CreatedDate
    @Column(name = "creation_date", updatable = false)
    private Date creationDate;

    @Column(name = "member_number")
    @ColumnDefault("1")
    private int memberNumber;

    @Column(name = "prj_thumbnail")
    private String prjThumbnail;

    @OneToMany(mappedBy = "project")
    private List<Board> boards;

    public void changePrjName(String prjName){
        this.prjName = prjName;
    }

    public void changePrjThumbnail(String prjThumbnail){
        this.prjThumbnail = prjThumbnail;
    }
}

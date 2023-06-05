package com.straight.bluewave.domain.board.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.straight.bluewave.domain.board.dto.BoardDTO;
import com.straight.bluewave.domain.post.entity.Post;
import com.straight.bluewave.domain.project.entity.Project;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "board")
@AllArgsConstructor
@NoArgsConstructor
@Builder


public class Board{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long brdId;

    @Column(name = "brd_name")
    private String brdName;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> posts;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prj_id")
    private Project project;



    public void changeBrdName(String brdName) {
        this.brdName = brdName;
    }


    public void setProject(Project project) {
        this.project = project;
    }

    public void setBrdId(Long brdId){
        this.brdId = brdId;
    }
}
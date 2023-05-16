package com.straight.bluewave.domain.board.entity;


import com.straight.bluewave.domain.post.entity.Post;
import com.straight.bluewave.domain.project.entity.Project;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
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

    private Long prjId;

    @Column(name = "brd_name")
    private String brdName;

    @OneToMany(mappedBy = "board")
    private List<Post> posts;

    @ManyToOne(fetch = FetchType.LAZY)
    private Project project;

}
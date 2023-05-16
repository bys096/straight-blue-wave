package com.straight.test.domain;

import com.straight.test.domain.dto.BoardDTO;
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

public class Board {

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

    public Board(Project project, BoardDTO dto){

    }

    public void changeBrdName(String brdName) {
        this.brdName = brdName;
    }

//    public Board(BoardDTO dto){
//        this.brdId = dto.getBrd_id();
//        this.prjId = dto.getPrj_id();
//        this.brdName = dto.getBrd_name();
//    }

}

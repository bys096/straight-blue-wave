package com.straight.bluewave.domain.project.repository;

import com.straight.bluewave.domain.board.entity.Board;
import com.straight.bluewave.domain.project.entity.Project;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
class ProjectRepositoryTest {

    @Autowired
    private ProjectRepository projectRepository;

    @Test
    void prjBuildTest() {
        List<Board> board = new ArrayList<Board>();

        Project prj = Project.builder()
                .prjName("test1")
                .boards(board)
                .build();
        projectRepository.save(prj);
    }




}
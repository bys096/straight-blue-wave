package com.straight.bluewave.application.controller;

import com.straight.bluewave.domain.board.service.BoardServiceImp;
import com.straight.bluewave.domain.project.dto.ProjectDTO;
import com.straight.bluewave.domain.project.entity.Project;
import com.straight.bluewave.domain.project.service.ProjectServiceImp;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/project")
@RequiredArgsConstructor
@Log4j2
public class ProjectController {
    private final ProjectServiceImp projectService;
    private final BoardServiceImp boardServiceImp;

    // 프로젝트 추가
    @PostMapping("/create")
    public Project createProject(@RequestBody ProjectDTO dto){
        Project project = projectService.createProject(dto);
        return project;
    }


    // 프로젝트 수정
    @PutMapping("/modify/{prj_id}")
    public Long modifyProject(@PathVariable Long prj_id, @RequestBody ProjectDTO dto){
        return projectService.modify(prj_id, dto);
    }

    // 프로젝트 삭제
    @DeleteMapping("/delete/{prj_id}")
    public ResponseEntity<Void> deleteBoard(@PathVariable("prj_id") Long prj_id) {
        projectService.remove(prj_id);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }


    // 프로젝트 리스트
    @GetMapping("/list")
    public ResponseEntity<List<Project>> getAllUsers() {
        List<Project> users = projectService.findAll();
        return new ResponseEntity<List<Project>>(users, HttpStatus.OK);
    }
}

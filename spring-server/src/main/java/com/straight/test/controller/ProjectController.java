package com.straight.test.controller;

import com.straight.test.domain.Post;
import com.straight.test.domain.Project;
import com.straight.test.domain.dto.BoardDTO;
import com.straight.test.domain.dto.PageRequestDTO;
import com.straight.test.domain.dto.PostDTO;
import com.straight.test.domain.dto.ProjectDTO;
import com.straight.test.service.ProjectService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/api/project")
@RequiredArgsConstructor
@Log4j2
public class ProjectController {
    private final ProjectService projectService;

    @PostMapping("/create")
    public Project createProject(@RequestBody ProjectDTO dto){
        Project project = projectService.createProject(dto);
        return project;
    }

    @PutMapping("/modify/{prj_id}")
    public Long modifyProject(@PathVariable Long prj_id, @RequestBody ProjectDTO dto){
        return projectService.modify(prj_id, dto);
    }

    @DeleteMapping("/delete/{prj_id}")
    public ResponseEntity<Void> deleteBoard(@PathVariable("prj_id") Long prj_id) {
        projectService.remove(prj_id);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }


    @GetMapping("/list")
    public ResponseEntity<List<Project>> getAllUsers() {
        List<Project> users = projectService.findAll();
        return new ResponseEntity<List<Project>>(users, HttpStatus.OK);
    }
}

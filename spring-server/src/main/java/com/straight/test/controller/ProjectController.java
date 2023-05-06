package com.straight.test.controller;

import com.straight.test.domain.Project;
import com.straight.test.domain.dto.PageRequestDTO;
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
@RequestMapping("/project")
@RequiredArgsConstructor
@Log4j2
public class ProjectController {
    private final ProjectService projectService;

    //프로젝트 생성 - 완
    @PostMapping("/create/{user_id}")
    public Project createProject(@PathVariable Long user_id, ProjectDTO project, HttpServletRequest request){
        HttpSession session = (HttpSession) request.getSession();
//        String id = (String) session.getAttribute("loginId");
        log.info("user_id : " + user_id);
        Project prj =  projectService.createProject(project);
        return prj;
    }

    //프로젝트명, 썸네일 수정 - 된건가?
    @PostMapping("/modify/{prj_id}")
    public Project modifyProject(@PathVariable ProjectDTO project){
        Project prj = projectService.modify(project);
        return prj;
    }

    //프로젝트 삭제 - 완료
    @PostMapping("/delete/{prj_id}")
    public ResponseEntity<Void> deleteProject(@PathVariable("prj_id") Long prj_id) {
        projectService.remove(prj_id);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }



    //프로젝트 목록 - DB재구축 후 확인
    @GetMapping("/list/{tno}")
    public ResponseEntity<List<Project>> getAllUsers() {
        List<Project> users = projectService.findAll();
        return new ResponseEntity<List<Project>>(users, HttpStatus.OK);
    }
}

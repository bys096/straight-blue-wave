package com.straight.bluewave.domain.project.service;

import com.straight.bluewave.domain.mapping.entity.TeamProjectMapping;
import com.straight.bluewave.domain.project.dto.ProjectDTO;
import com.straight.bluewave.domain.project.entity.Project;
import com.straight.bluewave.domain.project.repository.ProjectRepository;
import com.straight.bluewave.domain.team.entity.Team;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectServiceImp implements ProjectService{
    private final ProjectRepository projectRepository;

    public Project createProject(ProjectDTO dto){
        Project project = Project.builder()
                .prjName(dto.getPrj_name())
                .build();

        Team team = new Team();
        team.setTeamId(dto.getTeam_id());
        project.setTeam(team);

        projectRepository.save(project);
        return project;
    }

    @Override
    public ProjectDTO read(Long prj_id) {
        Optional<Project> result = projectRepository.findById(prj_id);
        return result.isPresent() ? entityToDto(result.get()) : null;
    }

    @Override
    public Long modify(Long prj_id, ProjectDTO dto) {
        Optional<Project> result = projectRepository.findById(prj_id);

        Project project = null;
        if (result.isPresent()) {
            project = result.get();
            project.changePrjName(dto.getPrj_name());

            projectRepository.save(project);
        }
        return project.getPrjId();
    }

    @Override
    public void remove(Long prj_id) {
        projectRepository.deleteById(prj_id);
    }

//    @Override
//    public PageResultDTO<ProjectDTO, Project> getPrjList(String user_id, SpringDataJaxb.PageRequestDto resultDTO) {
//        return null;
//    }


    //Project List
    public List<Project> findAll() {
        List<Project> projects = new ArrayList<>();
        projectRepository.findAll().forEach(u -> projects.add(u));
        return projects;
    }

    // Team/project List

    public List<Project> findAllByTeam(Team team) {
        return projectRepository.findProjectsByTeam(team.getTeamId());
    }

}

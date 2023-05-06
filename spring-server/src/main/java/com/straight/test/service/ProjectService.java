package com.straight.test.service;

import com.straight.test.domain.Project;
import com.straight.test.domain.dto.PageRequestDTO;
import com.straight.test.domain.dto.PageResultDTO;
import com.straight.test.domain.dto.ProjectDTO;
import com.straight.test.repository.SpringDataJpaProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectService implements ProjectServiceImp{
    private final SpringDataJpaProjectRepository projectRepository;

    public Project createProject(ProjectDTO dto){    //프로젝트생성
        Project project = Project.builder()
                .prjName(dto.getPrj_name())
                .prjThumbnail(dto.getPrj_thumbnail())
                .memberNumber(1)
                .build();
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
            project.changePrjThumbnail(dto.getPrj_thumbnail());

            projectRepository.save(project);
        }
        return project.getPrjId();
    }

    @Override
    public void remove(Long prj_id) {
        projectRepository.deleteById(prj_id);
    }

    @Override
    public PageResultDTO<ProjectDTO, Project> getPrjList(String user_id, PageRequestDTO resultDTO) {
        return null;
    }


    //Project List
    public List<Project> findAll() {
        List<Project> projects = new ArrayList<>();
        projectRepository.findAll().forEach(u -> projects.add(u));
        return projects;
    }
}

package com.straight.test.service;

import com.straight.test.domain.Project;
import com.straight.test.domain.Team;
import com.straight.test.domain.dto.PageRequestDTO;
import com.straight.test.domain.dto.PageResultDTO;
import com.straight.test.domain.dto.ProejctDTO;
import com.straight.test.domain.dto.TeamDTO;
import com.straight.test.repository.SpringDataJpaProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class ProjectService implements ProjectServiceImp{
    private final SpringDataJpaProjectRepository projectRepository;

    public Project createProject(String id, ProejctDTO dto){    //프로젝트생성
        Project project = Project.builder()
                .prjName(dto.getPrj_name())
                .prjThumbnail(dto.getPrj_thumbnail())
                .build();
        projectRepository.save(project);
        return project;
    }

    @Override
    public ProejctDTO read(Long prj_id) {
        Optional<Project> result = projectRepository.findById(prj_id);
        return result.isPresent() ? entityToDto(result.get()) : null;
    }

    @Override
    public void modify(ProejctDTO dto) {
        Optional<Project> result = projectRepository.findById(dto.getPrj_id());

        if(result.isPresent()){
            Project entity = result.get();
            entity.changePrjName(dto.getPrj_name());
            entity.changePrjThumbnail(dto.getPrj_thumbnail());

            projectRepository.save(entity);
        }
    }

    @Override
    public void remove(Long prj_id) {
        projectRepository.deleteById(prj_id);
    }
}

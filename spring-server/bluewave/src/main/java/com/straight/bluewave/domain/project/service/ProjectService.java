package com.straight.bluewave.domain.project.service;

import com.straight.bluewave.domain.project.dto.ProjectDTO;
import com.straight.bluewave.domain.project.entity.Project;

public interface ProjectService {
    default Project dtoToEntity(ProjectDTO dto){
        Project entity = Project.builder()
                .prjId(dto.getPrj_id())
                .prjName(dto.getPrj_name())
                .prjPhoto(dto.getPrj_photo())
                .build();
        return entity;
    }

    default ProjectDTO entityToDto(Project entity){
        ProjectDTO dto = ProjectDTO.builder()
                .prj_id(entity.getPrjId())
                .prj_name(entity.getPrjName())
                .prj_photo(entity.getPrjPhoto())
                .build();
        return dto;
    }

    ProjectDTO read(Long prj_id);

    Long modify(Long prj_id, ProjectDTO dto);

    void remove(Long prj_id);

//    PageResultDTO<ProjectDTO, Project> getPrjList(String user_id, PageRequestDTO resultDTO);
}

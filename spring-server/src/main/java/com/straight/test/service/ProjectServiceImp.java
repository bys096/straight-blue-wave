package com.straight.test.service;

import com.straight.test.domain.Project;
import com.straight.test.domain.dto.PageRequestDTO;
import com.straight.test.domain.dto.PageResultDTO;
import com.straight.test.domain.dto.ProjectDTO;

public interface ProjectServiceImp {

    default Project dtoToEntity(ProjectDTO dto){
        Project entity = Project.builder()
                .prjId(dto.getPrj_id())
                .prjName(dto.getPrj_name())
                .creationDate(dto.getCreation_date())
                .memberNumber(dto.getMember_number())
                .prjThumbnail(dto.getPrj_thumbnail())
                .build();
        return entity;
    }

    default ProjectDTO entityToDto(Project entity){
        ProjectDTO dto = ProjectDTO.builder()
                .prj_id(entity.getPrjId())
                .prj_name(entity.getPrjName())
                .creation_date(entity.getCreationDate())
                .member_number(entity.getMemberNumber())
                .prj_thumbnail(entity.getPrjThumbnail())
                .build();
        return dto;
    }

    ProjectDTO read(Long prj_id);

    Project modify(ProjectDTO dto);

    void remove(Long prj_id);

    PageResultDTO<ProjectDTO, Project> getPrjList(String user_id, PageRequestDTO resultDTO);
}

package com.straight.test.service;

import com.straight.test.domain.Project;
import com.straight.test.domain.dto.ProejctDTO;

public interface ProjectServiceImp {

    default Project dtoToEntity(ProejctDTO dto){
        Project entity = Project.builder()
                .prjId(dto.getPrj_id())
                .prjName(dto.getPrj_name())
                .creationDate(dto.getCreation_date())
                .memberNumber(dto.getMember_number())
                .prjThumbnail(dto.getPrj_thumbnail())
                .build();
        return entity;
    }

    default ProejctDTO entityToDto(Project entity){
        ProejctDTO dto = ProejctDTO.builder()
                .prj_id(entity.getPrjId())
                .prj_name(entity.getPrjName())
                .creation_date(entity.getCreationDate())
                .member_number(entity.getMemberNumber())
                .prj_thumbnail(entity.getPrjThumbnail())
                .build();
        return dto;
    }

    ProejctDTO read(Long prj_id);

    void modify(ProejctDTO dto);

    void remove(Long prj_id);
}

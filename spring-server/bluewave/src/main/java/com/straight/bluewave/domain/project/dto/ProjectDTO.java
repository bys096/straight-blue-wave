package com.straight.bluewave.domain.project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.sql.Date;
import java.util.UUID;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProjectDTO {

    private Long prj_id;

    private String prj_name;

    private Date creation_date;

    private int member_number;

    private String prj_thumbnail;

    private Long team_id;

    //socket.io Room
    private UUID prjRoom;

    private String prj_photo;
}

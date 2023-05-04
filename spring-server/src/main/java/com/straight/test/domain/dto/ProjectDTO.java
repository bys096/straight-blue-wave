package com.straight.test.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

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
}

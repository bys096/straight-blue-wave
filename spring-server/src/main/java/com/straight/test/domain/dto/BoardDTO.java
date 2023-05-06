package com.straight.test.domain.dto;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class BoardDTO {
    private Long brd_id;

    private String prj_id;

    private String brd_name;

    //임시 그룹 제외
}

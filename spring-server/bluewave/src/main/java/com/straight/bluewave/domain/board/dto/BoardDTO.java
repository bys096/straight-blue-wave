package com.straight.bluewave.domain.board.dto;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class BoardDTO {
    private Long brd_id;

    private Long prj_id;

    private String brd_name;

    //임시 그룹 제외

}

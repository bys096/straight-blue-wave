package com.straight.test.domain.dto;

import lombok.*;

@Setter @Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class BoardDTO {
    private Long brd_id;

    private String prj_id;

    private String brd_name;

}

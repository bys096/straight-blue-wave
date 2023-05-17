package com.straight.bluewave.domain.team.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Builder
@AllArgsConstructor
@Data
public class TeamPageRequestDTO {

    private int page;
    private int size;
    private Long teamId;
    private String type;
    private String keyword;
    private String dateOrder;



    public TeamPageRequestDTO() {
        this.page = 1;
        this.size = 10;
    }

    public Pageable getPageable(Sort sort) {
        return PageRequest.of(page-1, size, sort);
    }


}

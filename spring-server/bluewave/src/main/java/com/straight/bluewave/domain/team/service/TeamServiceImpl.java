package com.straight.bluewave.domain.team.service;

import com.straight.bluewave.application.dto.PageRequestDTO;
import com.straight.bluewave.application.dto.PageResultDTO;
import com.straight.bluewave.domain.mapping.entity.TeamMemberMapping;
import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.team.dto.TeamDTO;
import com.straight.bluewave.domain.team.dto.TeamPageRequestDTO;
import com.straight.bluewave.domain.team.entity.Team;
import com.straight.bluewave.domain.team.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService{

    private final TeamRepository teamRepository;
    @Override
    public PageResultDTO<TeamDTO, Object[]> getList(TeamPageRequestDTO pageRequestDTO) {
        System.out.println(pageRequestDTO.getTeamId());
        System.out.println(pageRequestDTO.getKeyword());
        Function<Object[], TeamDTO> fn = (en -> entityToDTO((Team)en[0], (Member)en[1], (TeamMemberMapping)en[2]));
        Page<Object[]> result = teamRepository.searchTeamPage(
                pageRequestDTO,
                pageRequestDTO.getPageable(Sort.by("bno").descending())

        );
        return new PageResultDTO<>(result, fn);
    }
}

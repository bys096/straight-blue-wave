package com.straight.bluewave.domain.team.service;

import com.straight.bluewave.application.dto.PageResultDTO;
import com.straight.bluewave.domain.team.dto.*;
import com.straight.bluewave.domain.mapping.entity.TeamMemberMapping;
import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.team.entity.Team;
import com.straight.bluewave.domain.team.repository.SpringDataTeamRepository;
import com.straight.bluewave.domain.team.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService{

    private final TeamRepository teamRepository;
    private final SpringDataTeamRepository springDataTeamRepository;


    @Override
    public TeamMemberPageResultDTO<TeamDTO, Object[]> getList(TeamMemberPageRequestDTO pageRequestDTO) {
        System.out.println(pageRequestDTO.getTeamId());
        System.out.println(pageRequestDTO.getKeyword());
        Function<Object[], TeamDTO> fn = (en -> entityToDTO((Team)en[0], (Member)en[1], (TeamMemberMapping)en[2]));
        Page<Object[]> result = teamRepository.searchTeamPage(
                pageRequestDTO,
                pageRequestDTO.getPageable(Sort.by("mem_id").descending())

        );
        return new TeamMemberPageResultDTO<>(result, fn);
    }

    public TeamMemberPageResultDTO<TeamDTO, Object[]> getTeamList(TeamMemberPageRequestDTO pageRequestDTO) {

//        System.out.println(pageRequestDTO.getTeamId());
//        System.out.println(pageRequestDTO.getKeyword());
        Function<Object[], TeamDTO> fn = (en -> entityToDTO((Team)en[0], (Member)en[1], (TeamMemberMapping)en[2]));
        Page<Object[]> result = teamRepository.getTeamList(
                pageRequestDTO,
                pageRequestDTO.getPageable(Sort.by("mem_id").descending())
        );
        return new TeamMemberPageResultDTO<>(result, fn);
    }


    public Team joinTeam(TeamDTO dto) {       //팀생성
        Team team = Team.builder()
                .teamId(dto.getTeamId())
                .teamName(dto.getTeamName())
                .teamDesc(dto.getTeamDesc())
                .build();
        springDataTeamRepository.save(team);
        return team;
    }



    //
    @Override
    public TeamDTO read(Long teamId) {
        Optional<Team> result = springDataTeamRepository.findById(teamId);

        // 바꿔야됨
        return result.isPresent() ? entityToDto(result.get()) : null;
    }

    @Override
    public void modify(TeamDTO dto) {

        Long id = dto.getTeamId();

        Team team = springDataTeamRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 팀이 존재하지 않습니다.")
        );

        team.changeTeamName(dto.getTeamName());
        team.changeTeamDesc(dto.getTeamDesc());
    }

    @Override
    public void remove(Long tm_id) {

        springDataTeamRepository.deleteById(tm_id);
    }
}

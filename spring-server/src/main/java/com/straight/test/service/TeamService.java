package com.straight.test.service;

import com.straight.test.domain.Team;
import com.straight.test.domain.dto.PageRequestDTO;
import com.straight.test.domain.dto.PageResultDTO;
import com.straight.test.domain.dto.TeamDTO;
import com.straight.test.repository.SpringDataJpaTeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class TeamService implements TeamServiceImp{
    private final SpringDataJpaTeamRepository teamRepository;

    public Team joinTeam(String id,TeamDTO dto) {       //팀생성
        Team team = Team.builder()
                .teamName(dto.getTeam_name())
                .teamWriter(id)
                .build();
        teamRepository.save(team);
        return team;
    }

    @Override
    public PageResultDTO<TeamDTO, Team> getList(String user_id, PageRequestDTO requestDTO) {
        Pageable pageable = requestDTO.getPageable(Sort.by("tno").descending());

        Page<Team> result = teamRepository.findAllByTeamWriter(user_id, pageable);

        Function<Team, TeamDTO> fn = (entity -> entityToDto(entity));

        return new PageResultDTO<>(result, fn);
    }

    @Override
    public TeamDTO read(Long tno) {
        Optional<Team> result = teamRepository.findById(tno);

        return result.isPresent() ? entityToDto(result.get()) : null;
    }

    @Override
    public void modify(TeamDTO dto) {
        Optional<Team> result = teamRepository.findById(dto.getTno());

        if(result.isPresent()) {
            Team entity = result.get();

            entity.changeTeamName(dto.getTeam_name());

            teamRepository.save(entity);
        }
    }

    @Override
    public void remove(Long tno) {
        teamRepository.deleteById(tno);
    }
}

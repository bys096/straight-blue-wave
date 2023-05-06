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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class TeamService implements TeamServiceImp{
    private final SpringDataJpaTeamRepository teamRepository;

    public void joinTeam(TeamDTO dto) {       //팀생성
        Team team = Team.builder()
                .tmName(dto.getTm_name())
                .tmIntro(dto.getTm_intro())
                .tmNumber(1)
                .build();
        teamRepository.save(team);
    }

    /*@Override
    public PageResultDTO<TeamDTO, Team> getList(String user_id, PageRequestDTO requestDTO) {
        Pageable pageable = requestDTO.getPageable(Sort.by("tm_id").descending());

        Page<Team> result = teamRepository.findAllByTeamWriter(user_id, pageable);

        Function<Team, TeamDTO> fn = (entity -> entityToDto(entity));

        return new PageResultDTO<>(result, fn);
    }*/

    @Override
    public TeamDTO read(Long tm_id) {
        Optional<Team> result = teamRepository.findById(tm_id);

        return result.isPresent() ? entityToDto(result.get()) : null;
    }

    @Override
    public void modify(TeamDTO dto) {
        Optional<Team> result = teamRepository.findById(dto.getTm_id());

        if(result.isPresent()) {
            Team entity = result.get();

            entity.changeTeamName(dto.getTm_name());
            entity.changeTeamIntro(dto.getTm_intro());

            teamRepository.save(entity);
        }
    }

    @Override
    public void remove(Long tm_id) {

        teamRepository.deleteById(tm_id);
    }

    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

}

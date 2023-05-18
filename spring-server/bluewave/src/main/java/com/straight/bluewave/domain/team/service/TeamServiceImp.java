package com.straight.bluewave.domain.team.service;

import com.straight.bluewave.domain.team.dto.TeamDTO;
import com.straight.bluewave.domain.team.entity.Team;
import com.straight.bluewave.domain.team.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TeamServiceImp implements TeamService{

    private final TeamRepository teamRepository;

    public Team joinTeam(TeamDTO dto) {       //팀생성
        Team team = Team.builder()
                .teamId(dto.getTeam_id())
                .teamName(dto.getTeam_name())
                .teamDesc(dto.getTeam_desc())
                .build();
        teamRepository.save(team);
        return team;
    }

    /*@Override
    public PageResultDTO<TeamDTO, Team> getList(String user_id, PageRequestDTO requestDTO) {
        Pageable pageable = requestDTO.getPageable(Sort.by("tm_id").descending());

        Page<Team> result = teamRepository.findAllByTeamWriter(user_id, pageable);

        Function<Team, TeamDTO> fn = (entity -> entityToDto(entity));

        return new PageResultDTO<>(result, fn);
    }*/

    @Override
    public TeamDTO read(Long team_id) {
        Optional<Team> result = teamRepository.findById(team_id);

        return result.isPresent() ? entityToDto(result.get()) : null;
    }

    @Override
    public void modify(TeamDTO dto) {
        Optional<Team> result = teamRepository.findById(dto.getTeam_id());

        if(result.isPresent()) {
            Team entity = result.get();


            teamRepository.save(entity);
        }
    }

    @Override
    public void remove(Long team_id) {

        teamRepository.deleteById(team_id);
    }

    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

}

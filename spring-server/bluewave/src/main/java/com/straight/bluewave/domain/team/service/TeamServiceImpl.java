package com.straight.bluewave.domain.team.service;

import com.straight.bluewave.application.dto.PageResultDTO;
import com.straight.bluewave.domain.mapping.repository.SpringDataTeamMemberRepository;
import com.straight.bluewave.domain.member.repository.MemberRepository;
import com.straight.bluewave.domain.project.entity.Project;
import com.straight.bluewave.domain.project.repository.ProjectRepository;
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

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService{

    private final TeamRepository teamRepository;

    private final MemberRepository memberRepository;

    private final SpringDataTeamMemberRepository teamMemberRepository;
    private final SpringDataTeamRepository springDataTeamRepository;

    private final ProjectRepository projectRepository;


    @Override
    public TeamMemberPageResultDTO<TeamDTO, Object[]> getList(TeamMemberPageRequestDTO pageRequestDTO) {
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


    public Team joinTeam(TeamDTO dto, Long memberId) {       //팀생성
        Member member = memberRepository.findById(memberId).get();
        Team team = Team.builder()
                .teamName(dto.getTeamName())
                .teamDesc(dto.getTeamDesc())
                .member(member)
                .build();
        springDataTeamRepository.save(team);

        TeamMemberMapping teamMemberMapping = TeamMemberMapping.builder()
                .member(member)
                .team(team)
                .teamName(member.getMemberName())
                .teamPosition("팀장")
                .build();
        teamMemberRepository.save(teamMemberMapping);

        return team;
    }



    //
    @Override
    public TeamDTO read(Long teamId) {
        //Optional<Team> result = springDataTeamRepository.findById(teamId);

        // 바꿔야됨
        //return result.isPresent() ? entityToDto(result.get()) : null;

        Team team = springDataTeamRepository.findById(teamId).orElseThrow(
                () -> new IllegalArgumentException("해당 팀이 존재하지 않습니다.")
        );

        Member member = memberRepository.findById(team.getMember().getMemberId()).get();

        TeamDTO teamDTO = TeamDTO.builder()
                .teamId(team.getTeamId())
                .teamName(team.getTeamName())
                .teamDesc(team.getTeamDesc())
                .memberId(member.getMemberId())
                .memberName(member.getMemberName())
                .createdAt(team.getCreatedAt())
                .updatedAt(team.getUpdatedAt())
                .build();

        return teamDTO;
    }

    @Override
    @Transactional
    public void modify(TeamDTO dto) {

        Long id = dto.getTeamId();

        Team team = springDataTeamRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 팀이 존재하지 않습니다.")
        );

        team.changeTeamName(dto.getTeamName());
        team.changeTeamDesc(dto.getTeamDesc());
    }

    @Override
    @Transactional
    public void remove(Long tm_id) {

        springDataTeamRepository.deleteById(tm_id);
    }

    public void invite(Long memberId, Long teamId) {
        Member member = memberRepository.findById(memberId).get();

        Team team = springDataTeamRepository.findById(teamId).get();

        TeamMemberMapping teamMemberMapping = TeamMemberMapping.builder()
                .member(member)
                .team(team)
                .teamName(member.getMemberName())
                .teamPosition("팀원")
                .build();
        teamMemberRepository.save(teamMemberMapping);
    }

    public List<TeamMemberMapping> getTeamMemberList(Team team) {

        return teamMemberRepository.findAllByTeam(team.getTeamId());
    }
}

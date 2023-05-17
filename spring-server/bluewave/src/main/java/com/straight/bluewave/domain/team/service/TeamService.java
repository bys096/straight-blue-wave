package com.straight.bluewave.domain.team.service;

import com.straight.bluewave.application.dto.PageRequestDTO;
import com.straight.bluewave.application.dto.PageResultDTO;
import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.team.dto.TeamDTO;
import com.straight.bluewave.domain.team.dto.TeamPageRequestDTO;
import com.straight.bluewave.domain.team.entity.Team;

public interface TeamService {
    PageResultDTO<TeamDTO, Object[]> getList(TeamPageRequestDTO pageRequestDTO);

//    default Team dtoToEntity(BoardDTO dto) {
//
//        Member member = Member.builder().email(dto.getWriterEmail()).build();
//
//        Board board = Board.builder()
//                .bno(dto.getBno())
//                .title(dto.getTitle())
//                .content(dto.getContent())
//                .writer(member)
//                .build();
//
//        return board;
//
//    }
    //
    default TeamDTO entityToDTO(Team team, Member member) {

        TeamDTO teamDTO = TeamDTO.builder()
                .teamId(team.getTeamId())
                .teamName(team.getTeamName())
                .memberId(member.getMemberId())
                .memberName(member.getMemberName())
                .build();
        return teamDTO;
    }
}

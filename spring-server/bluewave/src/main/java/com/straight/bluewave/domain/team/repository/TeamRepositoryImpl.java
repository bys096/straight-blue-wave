package com.straight.bluewave.domain.team.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import com.straight.bluewave.domain.mapping.entity.QTeamMemberMapping;
import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.member.entity.QMember;
import com.straight.bluewave.domain.team.dto.TeamPageRequestDTO;
import com.straight.bluewave.domain.team.entity.QTeam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class TeamRepositoryImpl extends QuerydslRepositorySupport implements TeamRepository{

    public TeamRepositoryImpl() { super(Member.class); }

    @Override
    public Page<Object[]> searchTeamPage(TeamPageRequestDTO pageRequestDTO, Pageable pageable) {

        QTeam team = QTeam.team;
        QTeamMemberMapping teamMember = QTeamMemberMapping.teamMemberMapping;
        QMember member = QMember.member;

        JPQLQuery<Member> jpqlQuery = from(member)
                .innerJoin(member.teamMembers, teamMember)
                .innerJoin(teamMember.team, team);

        JPQLQuery<Tuple> tuple = jpqlQuery.select(team, member, teamMember);

        BooleanBuilder booleanBuilder = new BooleanBuilder();

        BooleanExpression teamIdCondition = teamMember.team.teamId.eq(pageRequestDTO.getTeamId());
        if (pageRequestDTO.getKeyword() != null) {
            BooleanExpression keywordCondition = member.memberName.contains(pageRequestDTO.getKeyword());
            booleanBuilder.and(keywordCondition);
        }
        booleanBuilder.and(teamIdCondition);
        String order = pageRequestDTO.getDateOrder()==null ? "default" : pageRequestDTO.getDateOrder();

        OrderSpecifier<LocalDateTime> dateOrderSpecifier;
        OrderSpecifier<String> memberNameOrderSpecifier;

        switch (order) {
            case "dateAsc":
                dateOrderSpecifier = teamMember.createdAt.asc();
                tuple.orderBy(dateOrderSpecifier);
                break;
            case "dateDesc":
                dateOrderSpecifier = teamMember.createdAt.desc();
                tuple.orderBy(dateOrderSpecifier);
                break;
            default:
                memberNameOrderSpecifier = member.memberName.asc();
                tuple.orderBy(memberNameOrderSpecifier);
                break;
        }

        tuple.where(booleanBuilder);
        tuple.offset(pageable.getOffset());
        tuple.limit(pageable.getPageSize());

        List<Tuple> result = tuple.fetch();
        Long count = tuple.fetchCount();


        return new PageImpl<Object[]>(
                result.stream().map(t -> t.toArray()).collect(Collectors.toList()), pageable, count);

    }

    @Override
    public List<Member> searchTeamMemberList(Long n) {

        QTeam team = QTeam.team;
        QTeamMemberMapping teamMember = QTeamMemberMapping.teamMemberMapping;
        QMember member = QMember.member;

        JPQLQuery<Member> jpqlQuery = from(member)
                .innerJoin(member.teamMembers, teamMember)
                .innerJoin(teamMember.team, team);

        BooleanExpression ex1 = teamMember.team.teamId.eq(n);
        jpqlQuery.where(ex1);
        List<Member> list = jpqlQuery.fetch();
        System.out.println("결과 리스트 사이즈:" + list.size());

        return list;
    }
}


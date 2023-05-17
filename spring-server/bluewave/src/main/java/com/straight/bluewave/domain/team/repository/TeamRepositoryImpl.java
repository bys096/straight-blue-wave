package com.straight.bluewave.domain.team.repository;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import com.straight.bluewave.domain.mapping.entity.QTeamMemberMapping;
import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.member.entity.QMember;
import com.straight.bluewave.domain.team.entity.QTeam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public class TeamRepositoryImpl extends QuerydslRepositorySupport implements TeamRepository{

    public TeamRepositoryImpl() { super(Member.class); }

    @Override
    public Page<Object[]> searchTeamPage(Long teamId, String type, String keyword, Pageable pageable) {

        QTeam team = QTeam.team;
        QTeamMemberMapping teamMember = QTeamMemberMapping.teamMemberMapping;
        QMember member = QMember.member;

        JPQLQuery<Member> jpqlQuery = from(member)
                .innerJoin(member.teamMembers, teamMember)
                .innerJoin(teamMember.team, team);

        JPQLQuery<Tuple> tuple = jpqlQuery.select(team, member);


        BooleanExpression teamIdCondition = teamMember.team.teamId.eq(teamId);
        tuple.where(teamIdCondition);


//        System.out.println("결과 리스트 사이즈:" + list.size());

        tuple.orderBy(teamMember.member.memberId.desc());


        Sort sort = pageable.getSort();
//        sort.stream().forEach(order -> {
//            Order direction = order.isAscending()? Order.ASC: Order.DESC;
//            String prop = order.getProperty();
//            PathBuilder orderByExpression = new PathBuilder(Member.class, "member");
//            tuple.orderBy(new OrderSpecifier(direction, orderByExpression.get(prop)));
//        });

        tuple.offset(pageable.getOffset());
        tuple.limit(pageable.getPageSize());




        List<Tuple> result = tuple.fetch();

        Long count = tuple.fetchCount();




        return new PageImpl<Object[]>(
                result.stream().map(t -> t.toArray()).collect(Collectors.toList()), pageable, count);




//        return new PageImpl<>(list, pageable, list.size());

//        return new PageImpl<>(list.stream().map(m -> new Object[]{m}).collect(Collectors.toList()), pageable, list.size());
//
//        return new PageImpl<>(Object[]) (
//                list.stream().collect(Collectors.toList()), pageable
//                );

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
//        JPQLQuery<Tuple> tuple = jpqlQuery.select(member, team);
//        List<Member> members = jpqlQuery.select(member).fetch();

//
//        List<Tuple> result = tuple.fetch();
//        return new PageImpl<Object[]>(
//                result.stream().map(t -> t.toArray()).collect(Collectors.toList()), pageable);
//
//    }
        return list;
    }
}


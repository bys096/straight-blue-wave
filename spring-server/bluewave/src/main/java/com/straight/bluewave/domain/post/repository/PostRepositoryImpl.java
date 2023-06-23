package com.straight.bluewave.domain.post.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import com.straight.bluewave.domain.board.entity.Board;

import com.straight.bluewave.domain.member.entity.QMember;
import com.straight.bluewave.domain.post.dto.PostRequestDTO;
import com.straight.bluewave.domain.post.entity.Post;

import com.straight.bluewave.domain.post.entity.QPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class PostRepositoryImpl extends QuerydslRepositorySupport implements PostRepository {
    public PostRepositoryImpl() {
        super(Post.class);
    }

    @Override
    public Page<Object[]> searchPostPage(PostRequestDTO pageRequestDTO, Pageable pageable) {

        QPost post = QPost.post;
        QMember member = QMember.member;
        JPQLQuery<Post> jpqlQuery = from(post)
                .innerJoin(member)
                .on(member.eq(post.member))
                .where(post.board.brdId.eq(pageRequestDTO.getBoardId()))
                ;
        JPQLQuery<Tuple> tuple = jpqlQuery.select(post, member);

        BooleanBuilder booleanBuilder = new BooleanBuilder();

        if (pageRequestDTO.getKeyword() != null) {
            BooleanExpression keywordCondition = post.post_name.contains(pageRequestDTO.getKeyword());
            booleanBuilder.and(keywordCondition);
        }
        String order = (pageRequestDTO.getDateOrder() == null ? "default" : pageRequestDTO.getDateOrder());

        OrderSpecifier<LocalDateTime> dateOrderSpecifier;
        OrderSpecifier<Long> postIdOrderSpecifier;

        switch (order) {
            case "dateAsc":
                dateOrderSpecifier = post.createdAt.asc();
                tuple.orderBy(dateOrderSpecifier);
                break;
            case "dateDesc":
                dateOrderSpecifier = post.createdAt.desc();
                tuple.orderBy(dateOrderSpecifier);
                break;
            default:
                dateOrderSpecifier = post.updatedAt.desc();
                tuple.orderBy(dateOrderSpecifier);
                break;
        }

        tuple.where(booleanBuilder);
        tuple.offset(pageable.getOffset());
        tuple.limit(pageable.getPageSize());

        List<Tuple> result = tuple.fetch();
        Long count = tuple.fetchCount();

        return new PageImpl<>(result.stream().map(p -> p.toArray()).collect(Collectors.toList()), pageable, count);

//        return new PageImpl<Object[]>(
//                result.stream().map(t -> t.toArray()).collect(Collectors.toList()), pageable, count);

    }
}

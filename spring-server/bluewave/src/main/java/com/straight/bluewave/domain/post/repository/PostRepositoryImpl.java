package com.straight.bluewave.domain.post.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import com.straight.bluewave.domain.board.entity.QBoard;
import com.straight.bluewave.domain.mapping.entity.QTeamMemberMapping;
import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.member.entity.QMember;
import com.straight.bluewave.domain.post.dto.PostRequestDTO;
import com.straight.bluewave.domain.post.entity.Post;
import com.straight.bluewave.domain.post.entity.QPost;
import com.straight.bluewave.domain.team.entity.QTeam;
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
    public Page<Post> searchPostPage(PostRequestDTO pageRequestDTO, Pageable pageable) {

        QPost post = QPost.post;
        JPQLQuery<Post> jpqlQuery = from(post)
                .where(post.board.brdId.eq(pageRequestDTO.getBoardId()));
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
                jpqlQuery.orderBy(dateOrderSpecifier);
                break;
            case "dateDesc":
                dateOrderSpecifier = post.createdAt.desc();
                jpqlQuery.orderBy(dateOrderSpecifier);
                break;
            default:
                dateOrderSpecifier = post.updatedAt.desc();
                jpqlQuery.orderBy(dateOrderSpecifier);
                break;
        }

        jpqlQuery.where(booleanBuilder);
        jpqlQuery.offset(pageable.getOffset());
        jpqlQuery.limit(pageable.getPageSize());

        List<Post> result = jpqlQuery.fetch();
        Long count = jpqlQuery.fetchCount();

        return new PageImpl<Post>(result, pageable, count);

//        return new PageImpl<Object[]>(
//                result.stream().map(t -> t.toArray()).collect(Collectors.toList()), pageable, count);

    }
}

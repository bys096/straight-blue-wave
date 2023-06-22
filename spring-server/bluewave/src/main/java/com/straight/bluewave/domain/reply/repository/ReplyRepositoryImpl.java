package com.straight.bluewave.domain.reply.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.straight.bluewave.domain.reply.entity.Reply;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.straight.bluewave.domain.reply.entity.QReply.reply;

@Repository
public class ReplyRepositoryImpl implements ReplyRepository {

    private final JPAQueryFactory queryFactory;

    public ReplyRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public List<Reply> findReplyByPostId(Long postId) {
        return queryFactory.selectFrom(reply)
                .leftJoin(reply.parent)
                .fetchJoin()
                .where(reply.post.post_id.eq(postId))
                .orderBy(
                        reply.parent.replyId.asc().nullsFirst(),
                        reply.replyId.desc()
                ).fetch();
    }

}

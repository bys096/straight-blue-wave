package com.straight.bluewave.domain.reply.repository;

import com.straight.bluewave.domain.reply.entity.Reply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface SpringDataReplyRepository extends JpaRepository<Reply, Long> {

    @Query("select r from Reply r left join fetch r.parent where  r.replyId = :replyId")
    Optional<Reply> findReplyByIdWithParent(@Param("replyId")Long replyId);
}

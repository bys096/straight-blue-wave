package com.straight.bluewave.domain.reply.repository;

import com.straight.bluewave.domain.board.entity.Board;
import com.straight.bluewave.domain.reply.entity.Reply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReplyRepository extends JpaRepository<Reply, Long> {

//    @Modifying
//    @Query("DELETE FROM Reply r WHERE r.post_id = :post_id")
//    void deleteByBoardId(@Param("post_id") Long post_id);


//    @Query("SELECT r FROM Reply r WHERE r.memberId = :memId")
//    List<Reply> findAllByMemId(Long memId);

//    @Query("SELECT r FROM Reply r WHERE r.post_id = :post_id")
//    List<Reply> findAllByPostId(@Param("post_id") Long post_id);
}

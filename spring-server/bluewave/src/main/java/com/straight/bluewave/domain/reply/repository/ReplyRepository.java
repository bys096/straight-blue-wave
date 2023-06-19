package com.straight.bluewave.domain.reply.repository;

import com.straight.bluewave.domain.board.entity.Board;
import com.straight.bluewave.domain.reply.entity.Reply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReplyRepository extends JpaRepository<Reply, Long> {

//    @Query("SELETE r" +
//            "FROM reply r" +
//            "WHERE r.memberId =: memberId")
//    List<Reply> findReplyByMem_id(@Param("memberId") Long mem_id);

    @Modifying
    @Query("delete from reply r where r.board.board_id =: board_id")
    void deleteByBoardId(Long boardId);

    List<Reply> getRepliesByBoardOverByReply_id(Board board);
}

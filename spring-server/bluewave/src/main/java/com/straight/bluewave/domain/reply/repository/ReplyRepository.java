package com.straight.bluewave.domain.reply.repository;

import com.straight.bluewave.domain.board.entity.Board;
import com.straight.bluewave.domain.reply.entity.Reply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReplyRepository extends JpaRepository<Reply, Long> {


}

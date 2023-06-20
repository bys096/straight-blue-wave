package com.straight.bluewave.domain.post.repository;

import com.straight.bluewave.domain.post.dto.PostDTO;
import com.straight.bluewave.domain.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface SpringDataPostRepository extends JpaRepository<Post, Long> {
    @Query("SELECT p.post_id, p.post_name, p.file_status FROM Post p")
    List<Object[]> findPostColumns();

    @Query("SELECT r.post.post_id FROM Reply r WHERE r.replyId = :replyId")
    Long findPostIdByReplyId(@Param("replyId") Long replyId);


}

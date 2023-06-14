package com.straight.bluewave.domain.post.repository;

import com.straight.bluewave.domain.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface SpringDataPostRepository extends JpaRepository<Post, Long> {
    @Query("SELECT p.post_id, p.post_name, p.file_status FROM Post p")
    List<Object[]> findPostColumns();



}

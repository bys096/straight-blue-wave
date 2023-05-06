package com.straight.test.repository;

import com.straight.test.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface SpringDataJpaPostRepository extends JpaRepository<Post, Long> {
    @Query("SELECT p.post_id, p.post_name, p.post_createAt, p.file_status FROM Post p")
    List<Object[]> findPostColumns();
}

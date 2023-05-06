package com.straight.test.repository;

import com.straight.test.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface SpringDataJpaPostRepository extends JpaRepository<Post, Long> {

}

package com.straight.bluewave.domain.post.repository;

import com.straight.bluewave.domain.post.dto.PostRequestDTO;
import com.straight.bluewave.domain.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PostRepository {

    Page<Post> searchPostPage(PostRequestDTO pageRequestDTO, Pageable pageable);
}

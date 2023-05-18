package com.straight.bluewave.domain.post.service;


import com.straight.bluewave.domain.post.dto.PostDTO;
import com.straight.bluewave.domain.post.entity.Post;

public interface PostService {
    default Post dtoToEntity(PostDTO dto) {
        Post entity = Post.builder()
                .post_id(dto.getPost_id())
                .mem_id(dto.getMem_id())
                .post_content(dto.getPost_content())
                .post_name(dto.getPost_name())
                .attendees_id(dto.getAttendees_id())
                .file_status(dto.isFile_status())
                .voting_status(dto.isVoting_status())
                .build();
        return entity;
    }

    default PostDTO entityToDto(Post entity) {
        PostDTO dto = PostDTO.builder()
                .post_id(entity.getPost_id())
                .mem_id(entity.getMem_id())
                .post_content(entity.getPost_content())
                .post_name(entity.getPost_name())
                .attendees_id(entity.getAttendees_id())
                .file_status(entity.isFile_status())
                .voting_status(entity.isVoting_status())
                .build();
        return dto;
    }


    PostDTO read(Long post_id);

    Long modify(Long post_id, PostDTO dto);

    void remove(Long post_id);
}

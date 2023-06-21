package com.straight.bluewave.domain.post.service;


import com.straight.bluewave.domain.board.entity.Board;
import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.post.dto.PostDTO;
import com.straight.bluewave.domain.post.dto.PostRequestDTO;
import com.straight.bluewave.domain.post.dto.PostResponseDTO;
import com.straight.bluewave.domain.post.entity.Post;
import com.straight.bluewave.domain.team.dto.TeamDTO;
import com.straight.bluewave.domain.team.dto.TeamMemberPageRequestDTO;
import com.straight.bluewave.domain.team.dto.TeamMemberPageResultDTO;
import org.springframework.data.domain.Page;

import java.sql.Date;
import java.util.List;

public interface PostService {
    default Post dtoToEntity(PostDTO dto) {
        Post entity = Post.builder()
                .post_id(dto.getPost_id())
                .post_content(dto.getPost_content())
                .post_name(dto.getPost_name())
                .meeting_date(dto.getMeeting_date())
                .attendees_id(dto.getAttendees_id())
//                .file_status(dto.isFile_status())
//                .voting_status(dto.isVoting_status())
                .build();
        return entity;
    }

    default PostDTO entityToDto(Post entity) {
        PostDTO dto = PostDTO.builder()
                .post_id(entity.getPost_id())
                .post_content(entity.getPost_content())
                .post_name(entity.getPost_name())
                .meeting_date(entity.getMeeting_date())
                .attendees_id(entity.getAttendees_id())
                .file_status(entity.isFile_status())
//                .voting_status(entity.isVoting_status())
                .build();
        return dto;
    }

    default Post dtoToEntity(PostDTO dto, Board board, Member member){
        return Post.builder()
                .post_id(dto.getPost_id())
                .post_content(dto.getPost_content())
                .post_name(dto.getPost_name())
                .meeting_date(dto.getMeeting_date())
                .attendees_id(dto.getAttendees_id())
                .board(board)
                .member(member)
                .build();
    }



    PostDTO read(Long post_id);

    Long modify(Long post_id, PostDTO dto);

    void remove(Long post_id);

    PostResponseDTO<Post> getPostListWithCondition(PostRequestDTO pageRequestDTO);
}

package com.straight.test.service;

import com.straight.test.domain.Post;
import com.straight.test.domain.dto.PostDTO;
import com.straight.test.domain.dto.ProjectDTO;
import com.straight.test.repository.SpringDataJpaPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService implements PostServiceImp{

    private final SpringDataJpaPostRepository postRepository;

    public Post createPost(PostDTO dto){
        Post post = Post.builder()
                .post_id(dto.getPost_id())
                .mem_id(dto.getMem_id())
                .brd_id(dto.getBrd_id())
                .post_content(dto.getPost_content())
                .post_name(dto.getPost_name())
                .meeting_date(dto.getMeeting_date())
                .attendees_id(dto.getAttendees_id())
                .file_status(dto.isFile_status())
                .voting_status(dto.isVoting_status())
                .build();
        postRepository.save(post);
        return post;
    }

    @Override
    public PostDTO read(Long post_id) {
        Optional<Post> result = postRepository.findById(post_id);
        return result.isPresent() ? entityToDto(result.get()) : null;
    }

    @Override
    public Long modify(Long post_id, PostDTO dto) {
        Post post = postRepository.findById(post_id).orElseThrow(
                () -> new IllegalArgumentException("해당 id가 존재하지 않습니다.")
        );
        post.changePost(dto);
        postRepository.save(post);
        return post.getPost_id();
    }


    @Override
    public void remove(Long post_id) {
        postRepository.deleteById(post_id);
    }

    public List<Post> findAll(){
        List<Post> posts = new ArrayList<>();
        postRepository.findAll().forEach(u -> posts.add(u));
        return posts;
    }

}

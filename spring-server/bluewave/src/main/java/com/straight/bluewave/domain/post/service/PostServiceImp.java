package com.straight.bluewave.domain.post.service;

import com.straight.bluewave.domain.board.entity.Board;
import com.straight.bluewave.domain.board.repository.BoardRepository;
import com.straight.bluewave.domain.post.dto.PostDTO;
import com.straight.bluewave.domain.post.entity.Post;
import com.straight.bluewave.domain.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostServiceImp implements PostService{
    private final PostRepository postRepository;
    private final BoardRepository boardRepository;

    public Post createPost(PostDTO dto){

        Board board = boardRepository.findById(dto.getBrd_id())
                .orElseThrow(() -> new IllegalArgumentException("Board not found with ID: " + dto.getBrd_id()));

        Post post = Post.builder()
                .post_id(dto.getPost_id())
                .mem_id(dto.getMem_id())
                .post_content(dto.getPost_content())
                .post_name(dto.getPost_name())
                .attendees_id(dto.getAttendees_id())
                .file_status(dto.isFile_status())
                .voting_status(dto.isVoting_status())
                .board(board)
                .build();

        Post posts = new Post(board, dto);

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

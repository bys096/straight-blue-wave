package com.straight.bluewave.application.controller;

import com.straight.bluewave.application.dto.PageResultDTO;
import com.straight.bluewave.domain.post.dto.PostDTO;
import com.straight.bluewave.domain.post.dto.PostRequestDTO;
import com.straight.bluewave.domain.post.dto.PostResponseDTO;
import com.straight.bluewave.domain.post.entity.Post;
import com.straight.bluewave.domain.post.repository.SpringDataPostRepository;
import com.straight.bluewave.domain.post.service.PostServiceImp;
import com.straight.bluewave.domain.team.dto.TeamMemberPageRequestDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/post")
@RequiredArgsConstructor
@Log4j2
public class PostController {
    private final PostServiceImp postService;
    private final SpringDataPostRepository postRepository;

    @PostMapping("/create")
    public Post createPost(@RequestBody PostDTO dto){
        Post post = postService.createPost(dto);
        return post;
    }

    @PutMapping("/modify/{post_id}")
    public Long modifyPost(@PathVariable Long post_id, @RequestBody PostDTO dto){
        return postService.modify(post_id, dto);
    }

    @DeleteMapping("/delete/{post_id}")
    public ResponseEntity<Void> deletePost(@PathVariable("post_id") Long post_id) {
        postService.remove(post_id);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    // board id에 관한 리스트 반환, 조건 검색 추가
    @PostMapping("/list")
    public PostResponseDTO<PostDTO, Object[]> getBoard(@RequestBody PostRequestDTO pageRequestDTO) {
        return postService.getPostListWithCondition(pageRequestDTO);
//        return null;
    }

    @GetMapping("/calender")
    public List<Object[]> getPostColumns() {
        return postRepository.findPostColumns();
    }

}
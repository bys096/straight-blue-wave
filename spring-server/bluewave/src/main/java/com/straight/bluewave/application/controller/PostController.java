package com.straight.bluewave.application.controller;

import com.straight.bluewave.domain.post.dto.PostDTO;
import com.straight.bluewave.domain.post.entity.Post;
import com.straight.bluewave.domain.post.repository.PostRepository;
import com.straight.bluewave.domain.post.service.PostServiceImp;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
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
    private final PostRepository postRepository;

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

    @GetMapping("/list")
    public List<Post> getBoard() {
        return postService.findAll();
    }



    @GetMapping("/calender")
    public List<Object[]> getPostColumns() {
        return postRepository.findPostColumns();
    }

}
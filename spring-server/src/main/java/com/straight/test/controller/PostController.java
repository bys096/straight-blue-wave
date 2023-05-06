package com.straight.test.controller;

import com.straight.test.domain.Board;
import com.straight.test.domain.Post;
import com.straight.test.domain.dto.PostDTO;
import com.straight.test.domain.dto.ProjectDTO;
import com.straight.test.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/post")
@RequiredArgsConstructor
@Log4j2
public class PostController {
    private final PostService postService;

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
}

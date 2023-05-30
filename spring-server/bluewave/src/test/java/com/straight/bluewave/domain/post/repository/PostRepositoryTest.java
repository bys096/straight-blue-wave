package com.straight.bluewave.domain.post.repository;

import com.straight.bluewave.domain.board.entity.Board;
import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.post.entity.Post;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PostRepositoryTest {

    @Autowired
    PostRepository postRepository;

    @Autowired
    SpringDataPostRepository springDataPostRepository;

    @Test
    void 포스트입력() {
        Board board = Board.builder().brdId(2L).build();
        for(int i = 51; i < 100; i++) {
            Post post = Post.builder()
                    .board(board)
                    .post_name("포스트 " + i)
                    .build();
            springDataPostRepository.save(post);
        }
    }

}
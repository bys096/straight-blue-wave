package com.straight.bluewave.domain.post.service;

import com.straight.bluewave.domain.board.entity.Board;
import com.straight.bluewave.domain.board.repository.BoardRepository;
import com.straight.bluewave.domain.mapping.entity.TeamMemberMapping;
import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.post.dto.PostDTO;
import com.straight.bluewave.domain.post.dto.PostRequestDTO;
import com.straight.bluewave.domain.post.dto.PostResponseDTO;
import com.straight.bluewave.domain.post.entity.Post;
import com.straight.bluewave.domain.post.repository.PostRepository;
import com.straight.bluewave.domain.post.repository.SpringDataPostRepository;
import com.straight.bluewave.domain.team.dto.TeamDTO;
import com.straight.bluewave.domain.team.entity.Team;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Date;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostServiceImp implements PostService{
    private final SpringDataPostRepository springDataPostRepository;
    private final PostRepository postRepository;
    private final BoardRepository boardRepository;

    public Post createPost(PostDTO dto){

        Post post = Post.builder()
                .post_id(dto.getPost_id())
                .mem_id(dto.getMem_id())
                .post_content(dto.getPost_content())
                .post_name(dto.getPost_name())
                .meeting_date(dto.getMeeting_date())
                .attendees_id(dto.getAttendees_id())
                .file_status(dto.isFile_status())
//                .voting_status(dto.isVoting_status())
                .build();

        Board board = new Board();
        board.setBrdId(dto.getBrd_id());
        post.setBoard(board);

        springDataPostRepository.save(post);
        return post;
    }

    @Override
    public PostDTO read(Long post_id) {
        Optional<Post> result = springDataPostRepository.findById(post_id);
        return result.isPresent() ? entityToDto(result.get()) : null;
    }

    @Override
    @Transactional
    public Long modify(Long post_id, PostDTO dto) {
        Post post = springDataPostRepository.findById(post_id).orElseThrow(
                () -> new IllegalArgumentException("해당 id가 존재하지 않습니다.")
        );
        post.changePost(dto);
        springDataPostRepository.save(post);
        return post.getPost_id();
    }


    @Override
    @Transactional
    public void remove(Long post_id) {
        springDataPostRepository.deleteById(post_id);
    }

    @Override
    public PostResponseDTO<Post> getPostListWithCondition(PostRequestDTO pageRequestDTO) {
        Page<Post> result = postRepository.searchPostPage(
                pageRequestDTO, pageRequestDTO.getPageable(Sort.by("post_id").descending())
        );
        PostResponseDTO<Post> response = new PostResponseDTO<Post>(result);
        Board board = boardRepository.findById(pageRequestDTO.getBoardId()).get();
        response.setBoardName(board.getBrdName());
        response.setBoardId(board.getBrdId());
        response.setPrjId(board.getProject().getPrjId());
        return response;
    }
}

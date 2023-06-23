package com.straight.bluewave.domain.post.service;

import com.straight.bluewave.domain.board.entity.Board;
import com.straight.bluewave.domain.board.repository.BoardRepository;
import com.straight.bluewave.domain.mapping.entity.TeamMemberMapping;
import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.member.repository.MemberRepository;
import com.straight.bluewave.domain.post.dto.PostDTO;
import com.straight.bluewave.domain.post.dto.PostRequestDTO;
import com.straight.bluewave.domain.post.dto.PostResponseDTO;
import com.straight.bluewave.domain.post.entity.Post;
import com.straight.bluewave.domain.post.repository.PostRepository;
import com.straight.bluewave.domain.post.repository.SpringDataPostRepository;
import com.straight.bluewave.domain.team.dto.TeamDTO;
import com.straight.bluewave.domain.team.dto.TeamMemberPageResultDTO;
import com.straight.bluewave.domain.team.entity.Team;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
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
    private final MemberRepository memberRepository;

    public Post createPost(PostDTO dto){

        Post post = Post.builder()
                .post_id(dto.getPost_id())
                .post_content(dto.getPost_content())
                .post_name(dto.getPost_name())
                .meeting_date(dto.getMeeting_date())
                .attendees_id(dto.getAttendees_id())
//                .file_status(dto.isFile_status())
//                .voting_status(dto.isVoting_status())
                .build();

        Board board = new Board();
        board.setBrdId(dto.getBrd_id());
        post.setBoard(board);

        Member member = new Member();
        member.setMemberId(dto.getMem_id());
        post.setMember(member);

//        Board board = boardRepository.findById(dto.getBrd_id()).get();
//        Member member = memberRepository.findById(dto.getMem_id()).get();
//        Post post = dtoToEntity(dto, board, member);

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
    public PostResponseDTO<PostDTO ,Object[]> getPostListWithCondition(PostRequestDTO pageRequestDTO) {
        Function<Object[], PostDTO> fn = (en -> entityToDto((Post)en[0], (Member)en[1]));
        Page<Object[]> result = postRepository.searchPostPage(
                pageRequestDTO, pageRequestDTO.getPageable(Sort.by("post_id").descending())
        );
        return new PostResponseDTO<>(result, fn);
    }
}

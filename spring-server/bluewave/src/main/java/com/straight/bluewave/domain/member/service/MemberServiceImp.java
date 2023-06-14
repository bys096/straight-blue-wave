package com.straight.bluewave.domain.member.service;

import com.straight.bluewave.domain.mapping.entity.FriendMapping;
import com.straight.bluewave.domain.mapping.entity.ProjectMemberMapping;
import com.straight.bluewave.domain.mapping.entity.ScheduleMemberMapping;
import com.straight.bluewave.domain.mapping.entity.TeamMemberMapping;
import com.straight.bluewave.domain.mapping.repository.SpringDataFriendRepository;
import com.straight.bluewave.domain.mapping.repository.SpringDataProjectMemberMapping;
import com.straight.bluewave.domain.mapping.repository.SpringDataScheduleMemberRepository;
import com.straight.bluewave.domain.mapping.repository.SpringDataTeamMemberRepository;
import com.straight.bluewave.domain.member.dto.FriendDTO;
import com.straight.bluewave.domain.member.dto.MemberDTO;
import com.straight.bluewave.domain.member.dto.MemberResponseDTO;
import com.straight.bluewave.domain.member.dto.MemberUpdateDTO;
import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.member.repository.MemberRepository;
import com.straight.bluewave.domain.team.entity.Team;
import com.straight.bluewave.domain.team.repository.SpringDataTeamRepository;
import com.straight.bluewave.global.util.SecurityUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberServiceImp implements MemberService{

    private final MemberRepository memberRepository;

    private final SpringDataTeamRepository teamRepository;

    private final SpringDataFriendRepository friendRepository;

    private final SpringDataTeamMemberRepository teamMemberRepository;

    private final SpringDataProjectMemberMapping projectMemberRepository;

    private final SpringDataScheduleMemberRepository scheduleMemberRepository;

    private final PasswordEncoder passwordEncoder;

    @Transactional
    public MemberResponseDTO findMemberInfoByEmail(String memberEmail) {
        return memberRepository.findByMemberEmail(memberEmail)
                .map(MemberResponseDTO::of)
                .orElseThrow(() -> new RuntimeException("유저 정보가 없습니다."));
    }

    @Transactional
    public MemberResponseDTO findMemberInfoById(Long memberId) {
        return memberRepository.findById(memberId)
                .map(MemberResponseDTO::of)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
    }



    @Transactional
    public void modify(MemberUpdateDTO dto) {
        Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId())
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));

        member.updateMember(dto);

    }

    @Transactional
    public void delete() {
        Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId()).get();

        Optional<Team> result1 = teamRepository.findByMember(member);

        if(result1.isPresent()) {
            Team team = teamRepository.findByMember(member).get();
            team.setMember(null);
        }

        /*Optional<TeamMemberMapping> result2 = teamMemberRepository.findByMember(member);

        if(result2.isPresent()) {
            TeamMemberMapping teamMemberMapping = teamMemberRepository.findByMember(member).get();
            teamMemberMapping.setMember(null);
        }

        Optional<FriendMapping> result3 = friendRepository.findByMember(member);

        if(result3.isPresent()) {
            FriendMapping friendMapping1 = friendRepository.findByMember(member).get();
            friendMapping1.setMember(null);
        }

        Optional<FriendMapping> result4 = friendRepository.findByFriend(member);

        if(result4.isPresent()) {
            FriendMapping friendMapping2 = friendRepository.findByFriend(member).get();
            friendMapping2.setFriend(null);
        }

        Optional<ProjectMemberMapping> result5 = projectMemberRepository.findByMember(member);

        if(result5.isPresent()) {
            ProjectMemberMapping projectMemberMapping = projectMemberRepository.findByMember(member).get();
            projectMemberMapping.setMember(null);
        }

        Optional<ScheduleMemberMapping> result6 = scheduleMemberRepository.findByMember(member);
        if(result6.isPresent()) {
            ScheduleMemberMapping scheduleMemberMapping = scheduleMemberRepository.findByMember(member).get();
            scheduleMemberMapping.setMember(null);
        }*/

        memberRepository.deleteById(SecurityUtil.getCurrentMemberId());
    }




    public List<Member> getAllMembers() {

        return memberRepository.findAll();
    }

    public void addFriend(Long memId, Long friendId) {
        Member member1 = memberRepository.findById(memId).get();

        Member member2 = memberRepository.findById(friendId).get();

        FriendMapping fri1 = FriendMapping.builder()
                .member(member1)
                .friend(member2)
                .friendName(member2.getMemberName())
                .build();

       friendRepository.save(fri1);

        FriendMapping fri2 = FriendMapping.builder()
                .member(member2)
                .friend(member1)
                .friendName(member1.getMemberName())
              .build();
        friendRepository.save(fri2);
    }

    public List<FriendDTO> getFriendList(Member member) {
        List<FriendMapping> friendMappings = friendRepository.findAllFriend(member.getMemberId());

        List<FriendDTO> friendDTOS = new ArrayList<>();
        for(FriendMapping friendMapping : friendMappings) {
            FriendDTO friendDTO = entityToDTO(friendMapping);
            friendDTOS.add(friendDTO);
        }

        return friendDTOS;
    }

    @Transactional
    public void remove(Member member1, Member member2) {

        friendRepository.removeMemId(member1.getMemberId(), member2.getMemberId());
        friendRepository.removeFriId(member2.getMemberId(), member1.getMemberId());

    }


}

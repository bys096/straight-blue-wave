package com.straight.test.repository;

import com.straight.test.domain.Member;
import com.straight.test.domain.dto.MemberDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
public interface SpringDataJpaMemberRepository extends JpaRepository<Member, Long>{

//    List<Member> findFirst2ByUsernameLikeOrderByIDDesc(String name);
//    Long deleteByName(String name);


//
//    @Query("select m from Member m where m.user_id=:user_id and m.user_pw=:user_pw")
//    Optional<Member> getLoginInfo(@Param("user_id") String user_id, @Param("user_pw") String user_pw);

    Optional<Member> findByUserIdAndUserPw(String userId, String userPw);

    default MemberDTO entityToDto(Member entity) {
        MemberDTO dto = MemberDTO.builder()
                .id(entity.getId())
                .user_id(entity.getUserId())
                .user_pw(entity.getUserPw())
                .user_name(entity.getUserName())
                .user_class(entity.getUserClass())
                .user_gender(entity.getUserGender())
                .user_email(entity.getUserEmail())
                .user_birth(entity.getUserBirth())
                .build();
        return dto;
    }

    Optional<Member> findByUserId(String userId);

}

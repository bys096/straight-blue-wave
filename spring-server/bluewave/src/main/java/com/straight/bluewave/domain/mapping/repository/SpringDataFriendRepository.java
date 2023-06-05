package com.straight.bluewave.domain.mapping.repository;

import com.straight.bluewave.domain.mapping.entity.FriendMapping;
import com.straight.bluewave.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import java.util.List;

public interface SpringDataFriendRepository extends JpaRepository<FriendMapping, Long> {

    @Query("select f from FriendMapping f where f.member.memberId = :memId")
    List<FriendMapping> findAllFriend(@Param("memId")Long memId);

    @Modifying
    @Query("delete from FriendMapping f where f.member.memberId = :memId and f.friend.memberId = :friendId")
    void removeMemId(@Param("memId")Long memId, @Param("friendId")Long friendId);

    @Modifying
    @Query("delete from FriendMapping f where f.member.memberId = :memId and f.friend.memberId = :friendId")
    void removeFriId(@Param("memId")Long friendId, @Param("friendId")Long memId);

}

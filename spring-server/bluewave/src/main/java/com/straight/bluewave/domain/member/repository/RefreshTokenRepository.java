package com.straight.bluewave.domain.member.repository;

import com.straight.bluewave.domain.member.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByKey(String key);

    Optional<RefreshToken> deleteByKey(String key);
}

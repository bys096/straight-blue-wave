package com.straight.bluewave.domain.member.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "refresh_token")
@Entity
@Builder
public class RefreshToken {
    @Id
    @Column(name = "rt_key")
    private String key;         //MemberID값이 들어감

    @Column(name = "rt_value")
    private String value;

    public RefreshToken updateValue(String token) {
        this.value = token;
        return this;
    }
}

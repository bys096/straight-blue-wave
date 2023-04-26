package com.straight.test.domain;

import lombok.*;
import javax.persistence.*;
import java.sql.Date;

@Entity
@Getter
@Table(name = "member")
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "user_id")
    private String userId;
    @Column(name = "user_pw")
    private String userPw;
    @Column(name = "user_name")
    private String userName;
    @Column(name = "user_class")
    private String userClass;
    @Column(name = "userGender")
    private String userGender;
    @Column(name = "user_birth")
    private Date userBirth;
    @Column(name = "user_email")
    private String userEmail;

    public void changeName(String userName) {
        this.userName = userName;
    }

    public void changePw(String userPw) {
        this.userPw = userPw;
    }

}

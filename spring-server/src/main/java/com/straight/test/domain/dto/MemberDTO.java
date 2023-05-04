package com.straight.test.domain.dto;

import lombok.*;

import javax.persistence.Column;
import java.sql.Date;

@Setter @Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class MemberDTO {
    private Long id;

    private String user_id;

    private String user_pw;

    private String user_name;

    private String user_gender;

    private String user_email;

    private Date user_birth;
}

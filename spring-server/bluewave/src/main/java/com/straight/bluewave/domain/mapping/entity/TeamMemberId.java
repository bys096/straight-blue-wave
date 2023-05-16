package com.straight.bluewave.domain.mapping.entity;

import java.io.Serializable;
import java.util.Objects;


// ** 안쓰는 코드

public class TeamMemberId implements Serializable {

    private Long member_id;
    private Long team_id;

    @Override
    public boolean equals(Object o) {
        if(this == o) return true;
        if(o == null || getClass() != o.getClass()) return false;
        TeamMemberId that = (TeamMemberId) o;
        return Objects.equals(member_id, that.member_id) &&
                Objects.equals(team_id, that.team_id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(member_id, team_id);
    }

}

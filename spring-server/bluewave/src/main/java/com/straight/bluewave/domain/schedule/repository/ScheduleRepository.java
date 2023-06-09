package com.straight.bluewave.domain.schedule.repository;

import com.straight.bluewave.domain.schedule.entity.Schedule;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface ScheduleRepository extends JpaRepositoryImplementation<Schedule, Long> {

    @Query("SELECT s FROM Schedule s WHERE s.project.prjId = :prjId")
    List<Schedule> findSchedulesByProject(@Param("prjId") Long prjId);



//      post, schedule join 해당하는 project만 보기
//    @Query("SELECT sc, po FROM Schedule sc LEFT JOIN sc.post po WHERE sc.project.prjId = :prjId")
//    List<Object[]> findSchedulesByProject(@Param("prjId") Long prjId);


}

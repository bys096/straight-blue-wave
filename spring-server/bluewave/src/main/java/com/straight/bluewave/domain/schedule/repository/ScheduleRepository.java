package com.straight.bluewave.domain.schedule.repository;

import com.straight.bluewave.domain.schedule.entity.Schedule;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface ScheduleRepository extends JpaRepositoryImplementation<Schedule, Long> {

//    @Query("SELECT s FROM Schedule s WHERE s.project.prjId = :prjId")

//    @Query("SELECT s, s.project, s.post FROM Schedule s WHERE s.project.prjId = :prjId")
//    List<Object[]> findSchedulesByProject(@Param("prjId") Long prjId);




    @Query("SELECT sc, po FROM Schedule sc LEFT JOIN sc.post po WHERE sc.project.prjId = :prjId")
    List<Object[]> findSchedulesByProject(@Param("prjId") Long prjId);

//    @Query("SELECT pr FROM Project pr LEFT JOIN FETCH pr.boards b LEFT JOIN FETCH b.posts po LEFT JOIN FETCH pr.schedule sc WHERE pr.prjId = :prjId")
//    List<Object[]> findSchedulesByProject(@Param("prjId") Long prjId);

}

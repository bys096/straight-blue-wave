package com.straight.bluewave.application.controller;

import com.straight.bluewave.domain.project.dto.ProjectDTO;
import com.straight.bluewave.domain.project.entity.Project;
import com.straight.bluewave.domain.schedule.dto.ScheduleDTO;
import com.straight.bluewave.domain.schedule.entity.Schedule;
import com.straight.bluewave.domain.schedule.repository.ScheduleRepository;
import com.straight.bluewave.domain.schedule.service.ScheduleServiceImp;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schedule")
@RequiredArgsConstructor
@Log4j2
public class ScheduleController {
    private final ScheduleServiceImp scheduleServiceImp;
    private final ScheduleRepository scheduleRepository;

    @PostMapping("/create")
    public Schedule createSchedule(@RequestBody ScheduleDTO dto){
        Schedule schedule = scheduleServiceImp.createSchedule(dto);
        return schedule;
    }

    @PutMapping("/modify/{schedule_id}")
    public Long modifySchedule(@PathVariable Long schedule_id, @RequestBody ScheduleDTO dto){
        return scheduleServiceImp.modify(schedule_id, dto);
    }

    @DeleteMapping("/delete/{schedule_id}")
    public void deleteSchedule(@PathVariable Long schedule_id) {
        scheduleServiceImp.remove(schedule_id);
    }

    //일정 조회 (특정 프로젝트에 속한 일정만 조회)
    @GetMapping("/list/{prjId}")
    public ResponseEntity<List<Object[]>> getSchedulesByProject(@PathVariable("prjId") Long prjId) {
        List<Object[]> schedules = scheduleServiceImp.findAllByProject(prjId);
        return new ResponseEntity<>(schedules, HttpStatus.OK);
    }

//    @GetMapping("/list/{prjId}")
//    public ResponseEntity<List<Object[]>> getSchedulesByProject(@PathVariable("prjId") Long prjId){
//        Project project = new Project();
//        project.setPrjId(prjId);
//        List<Object[]> schedules = scheduleServiceImp.findAllByProject(project);
//        return new ResponseEntity<>(schedules, HttpStatus.OK);
//    }

//    public ResponseEntity<List<Schedule>> getSchedulesByProject(@PathVariable("prjId") Long prjId){
//        Project project = new Project();
//        project.setPrjId(prjId);
//        List<Schedule> schedules = scheduleServiceImp.findAllByProject(project);
//        return new ResponseEntity<>(schedules, HttpStatus.OK);
//    }
}

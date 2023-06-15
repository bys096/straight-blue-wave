package com.straight.bluewave.domain.schedule.service;

import com.straight.bluewave.domain.post.entity.Post;
import com.straight.bluewave.domain.project.entity.Project;
import com.straight.bluewave.domain.schedule.dto.ScheduleDTO;
import com.straight.bluewave.domain.schedule.entity.Schedule;
import com.straight.bluewave.domain.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ScheduleServiceImp implements ScheduleService{
    private final ScheduleRepository scheduleRepository;

    public Schedule createSchedule(ScheduleDTO dto){
        Schedule schedule = Schedule.builder()
                .scheduleId(dto.getSchedule_id())
                .scheduleTitle(dto.getSchedule_title())
                .scheduleDescription(dto.getSchedule_description())
                .startDate(dto.getStart_date())
                .endDate(dto.getEnd_date())
                .meetingFormat(dto.getMeeting_format())
                .build();

        Project project = new Project();
        project.setPrjId(dto.getPrj_id());
        schedule.setProject(project);

//        Post post = new Post();
//        post.setPostId(dto.getPost_id());
//        schedule.setPost(post);

        scheduleRepository.save(schedule);
        return schedule;
    }

    @Override
    public ScheduleDTO read(Long schedule_id) {
        Optional<Schedule> result = scheduleRepository.findById(schedule_id);
        return result.isPresent() ? entityToDto(result.get()) : null;
    }

    @Override
    @Transactional
    public Long modify(Long schedule_id, ScheduleDTO dto) {
        Optional<Schedule> result = scheduleRepository.findById(schedule_id);

        Schedule schedule = null;

        if(result.isPresent()){
            schedule = result.get();

            schedule.changeChTitle(dto.getSchedule_title());
            schedule.changeChDesc(dto.getSchedule_description());
            schedule.changeChStart(dto.getStart_date());
            schedule.changeChEnd(dto.getEnd_date());
            schedule.changeChFormat(dto.getMeeting_format());

            scheduleRepository.save(schedule);
        }
        return schedule.getScheduleId();
    }

    @Override
    @Transactional
    public void remove(Long schedule_id) {
        scheduleRepository.deleteById(schedule_id);
    }

    public List<Schedule> findAllByProject(Project project) {
        return scheduleRepository.findSchedulesByProject(project.getPrjId());
    }

    //      post, schedule join 해당하는 project만 보기
//    public List<Object[]> findAllByProject(Long prjId) {
//        return scheduleRepository.findSchedulesByProject(prjId);
//    }


}

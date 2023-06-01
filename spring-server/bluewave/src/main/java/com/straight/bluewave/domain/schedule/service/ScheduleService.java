package com.straight.bluewave.domain.schedule.service;

import com.straight.bluewave.domain.schedule.dto.ScheduleDTO;
import com.straight.bluewave.domain.schedule.entity.Schedule;

public interface ScheduleService {
    default Schedule dtoToEntity(ScheduleDTO dto){
        Schedule entity = Schedule.builder()
                .scheduleId(dto.getSchedule_id())
                .scheduleTitle(dto.getSchedule_title())
                .scheduleDescription(dto.getSchedule_description())
                .startDate(dto.getStart_date())
                .endDate(dto.getEnd_date())
                .meetingFormat(dto.getMeeting_format())
                .build();
        return entity;
    }

    default ScheduleDTO entityToDto(Schedule entity){
        ScheduleDTO dto = ScheduleDTO.builder()
                .schedule_id(entity.getScheduleId())
                .schedule_title(entity.getScheduleTitle())
                .schedule_description(entity.getScheduleDescription())
                .start_date(entity.getStartDate())
                .end_date(entity.getEndDate())
                .meeting_format(entity.getMeetingFormat())
                .build();
        return dto;
    }

    ScheduleDTO read(Long schedule_id);

    Long modify(Long schedule_id, ScheduleDTO dto);

    void remove(Long schedule_id);

}

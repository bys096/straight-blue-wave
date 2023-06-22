package com.straight.bluewave.domain.notification.service;

import com.straight.bluewave.domain.mapping.entity.MemberNotificationMapping;
import com.straight.bluewave.domain.mapping.repository.SpringDataMemberNotificationRepository;
import com.straight.bluewave.domain.member.entity.Member;
import com.straight.bluewave.domain.member.repository.MemberRepository;
import com.straight.bluewave.domain.notification.dto.MemberNotificationMappingDTO;
import com.straight.bluewave.domain.notification.dto.NotificationDTO;
import com.straight.bluewave.domain.notification.entity.Notification;
import com.straight.bluewave.domain.notification.repository.NotificationReposiroty;
import com.straight.bluewave.domain.post.entity.Post;
import com.straight.bluewave.domain.post.repository.SpringDataPostRepository;
import com.straight.bluewave.domain.schedule.entity.Schedule;
import com.straight.bluewave.domain.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationServiceImp implements NotificationService{

    private final NotificationReposiroty notificationReposiroty;
    private final SpringDataMemberNotificationRepository mnRepository;
    private final MemberRepository memberRepository;
    private final SpringDataPostRepository postRepository;
    private final ScheduleRepository scheduleRepository;


    public void storageNotification(NotificationDTO dto, Long memberId) {

        Notification notification;
        if(dto.getPost_id() != null) {
            Post post = postRepository.findById(dto.getPost_id()).get();
            notification =  notificationReposiroty.save(dtoToEntity(dto, post));
        } else {
            Schedule schedule = scheduleRepository.findById(dto.getSchedule_id()).get();
            notification = notificationReposiroty.save(dtoToEntity(dto, schedule));
        }




        Member member = memberRepository.findById(memberId).get();
        MemberNotificationMapping mnMapping = MemberNotificationMapping.builder()
                .member(member)
                .notification(notification)
                .confirmation(false)
                .build();

        mnRepository.save(mnMapping);

//        return notification;
    }

    @Override
    public NotificationDTO read(Long notification_id) {
        Optional<Notification> result = notificationReposiroty.findById(notification_id);
        return result.isPresent() ? entityToDto(result.get()) : null;
    }

    @Override
    public void remove(Long notification_id) {
        notificationReposiroty.deleteById(notification_id);
    }

    @Override
    public List<MemberNotificationMappingDTO> getNotificationByMember(Long memberId) {
        List<MemberNotificationMapping> notifications = mnRepository.findAllByMember(memberId);
        List<MemberNotificationMappingDTO> dtos = new ArrayList<>();
        for (MemberNotificationMapping mn : notifications) {
            MemberNotificationMappingDTO dto = new MemberNotificationMappingDTO();
            dto.setMn_id(mn.getMnId());
            dto.setConfirmation(mn.isConfirmation());
            dto.setMember_id(mn.getMember());
            dto.setNotification_id(mn.getNotification());
            dtos.add(dto);
        }
        return dtos;
    }
}

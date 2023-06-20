package com.straight.bluewave.domain.notification.repository;

import com.straight.bluewave.domain.notification.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface NotificationReposiroty extends JpaRepository<Notification, Long> {

}

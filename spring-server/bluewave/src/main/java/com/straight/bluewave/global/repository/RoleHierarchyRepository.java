package com.straight.bluewave.global.repository;

import com.straight.bluewave.global.entity.RoleHierarchy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleHierarchyRepository extends JpaRepository<RoleHierarchy, Long> {
    RoleHierarchy findByChildName(String roleName);
}

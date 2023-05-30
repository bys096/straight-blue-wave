package com.straight.bluewave.global.config.hierarchy.repository;

import com.straight.bluewave.global.config.hierarchy.entity.RoleHierarchy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleHierarchyRepository extends JpaRepository<RoleHierarchy, Long> {
    RoleHierarchy findByChildName(String roleName);
}

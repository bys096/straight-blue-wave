package com.straight.bluewave.global.config.hierarchy.service;

import com.straight.bluewave.global.config.hierarchy.entity.RoleHierarchy;
import com.straight.bluewave.global.config.hierarchy.repository.RoleHierarchyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Iterator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleHierarchyServiceImpl {


    private final RoleHierarchyRepository roleHierarchyRepository;

    @Transactional
    public String findAllHierarchy() {
        List<RoleHierarchy> roleHierarchies = roleHierarchyRepository.findAll();

        Iterator<RoleHierarchy> itr = roleHierarchies.iterator();
        StringBuilder concatedRoles = new StringBuilder();
        while (itr.hasNext()) {
            RoleHierarchy roleHierarchy = itr.next();
            if(roleHierarchy.getParentName() != null) {
                concatedRoles.append(roleHierarchy.getParentName().getChildName());
                concatedRoles.append(" > ");
                concatedRoles.append(roleHierarchy.getChildName());
                concatedRoles.append("\n");
            }
        }
        return concatedRoles.toString();
    }

}

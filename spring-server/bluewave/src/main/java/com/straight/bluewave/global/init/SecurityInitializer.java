package com.straight.bluewave.global.init;

import com.straight.bluewave.global.service.RoleHierarchyServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
@Slf4j
public class SecurityInitializer implements ApplicationRunner {


    private final RoleHierarchyServiceImpl roleHierarchyService;

    private final RoleHierarchyImpl roleHierarchy;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        String allHierarchy = roleHierarchyService.findAllHierarchy();
        log.info("----------------" + allHierarchy);
        roleHierarchy.setHierarchy(allHierarchy);
    }
}

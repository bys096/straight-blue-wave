package com.straight.bluewave;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class BluewaveApplication {

	public static void main(String[] args) {
		SpringApplication.run(BluewaveApplication.class, args);
	}

}

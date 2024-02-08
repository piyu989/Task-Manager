package com.ser;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class EurekaServcerApplication {

	public static void main(String[] args) {
		SpringApplication.run(EurekaServcerApplication.class, args);
	}

}

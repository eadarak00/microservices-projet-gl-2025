package sn.uasz.m1.gl.ms_register_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class MsRegisterServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(MsRegisterServerApplication.class, args);
	}

}

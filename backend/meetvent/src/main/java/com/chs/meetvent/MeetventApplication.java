package com.chs.meetvent;

import com.chs.meetvent.domain.AppUser;
import com.chs.meetvent.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;

@SpringBootApplication
public class MeetventApplication {

	public static void main(String[] args) {
		SpringApplication.run(MeetventApplication.class, args);
	}

}

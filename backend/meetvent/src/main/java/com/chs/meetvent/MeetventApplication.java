package com.chs.meetvent;

import com.chs.meetvent.domain.AppUser;
import com.chs.meetvent.domain.Role;
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

	@Bean
	CommandLineRunner run(UserService userService) {
		return args -> {
			userService.saveRole(new Role(null, "ROLE_USER"));
			userService.saveRole(new Role(null, "ROLE_MANAGER"));
			userService.saveRole(new Role(null, "ROLE_ADMIN"));
			userService.saveRole(new Role(null, "ROLE_SUPER_ADMIN"));

			userService.saveUser(new AppUser(null, "User1", "user1", "1234", new ArrayList<>()));
			userService.saveUser(new AppUser(null, "User2", "user2", "2234", new ArrayList<>()));
			userService.saveUser(new AppUser(null, "User3", "user3", "3234", new ArrayList<>()));
			userService.saveUser(new AppUser(null, "User4", "user4", "4234", new ArrayList<>()));

			userService.addRoleToUser("user1", "ROLE_USER");
			userService.addRoleToUser("user2", "ROLE_MANAGER");
			userService.addRoleToUser("user3", "ROLE_ADMIN");
			userService.addRoleToUser("user3", "ROLE_USER");
			userService.addRoleToUser("user3", "ROLE_MANAGER");
		};
	}

}

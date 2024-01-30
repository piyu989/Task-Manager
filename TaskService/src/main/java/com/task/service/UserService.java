package com.task.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import com.task.model.UserDto;

@FeignClient(url="http://localhost:8080",name="USER-SERVICE")
public interface UserService {
	@GetMapping("/api/user/profile")
	public UserDto getUserProfile(@RequestHeader("Authorization") String jwt);
}

package com.sub.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import com.sub.model.Task;


@FeignClient(url = "http://localhost:8082/api/tasks",name = "TASK-SERVICE")
public interface TaskService {
	@GetMapping("/{id}")
	public Task getTaskById(@PathVariable Long id,
		@RequestHeader("Authorization") String jwt) throws Exception;

	@PutMapping("/{id}/complete")
	public Task completeTask(@PathVariable Long id) throws Exception;

}

package com.task.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class HomeController {

	@GetMapping("/tasks")
	public ResponseEntity<String> getAssignedTask(){
		return new ResponseEntity<>("welcome to task service",HttpStatus.OK);
	}
	
}

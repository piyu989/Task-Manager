package com.task.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.task.model.Task;
import com.task.model.TaskStatus;
import com.task.model.UserDto;
import com.task.service.TaskService;
import com.task.service.UserService;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin
public class TaskController {	
	
	@Autowired
	private TaskService taskService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping
	public ResponseEntity<Task> createTask(@RequestBody Task task,@RequestHeader("Authorization") String jwt) throws Exception{
		UserDto user=userService.getUserProfile(jwt);
		Task createdTask=taskService.create(task, user.getRole());
		
		return new ResponseEntity<>(createdTask,HttpStatus.CREATED);
		
	}
	

	@GetMapping("/{id}")
	public ResponseEntity<Task> getTaskById(@PathVariable Long id,
											@RequestHeader("Authorization") String jwt) throws Exception{
		
		Task task=taskService.getTaskById(id);
		if(task==null) throw new RuntimeException("Task is not available of this id");
		
		return new ResponseEntity<>(task,HttpStatus.OK);
		
	}
	
	
	@GetMapping("/user/{user}")
	public ResponseEntity<List<Task>> getAssignedUsersTask(@RequestParam(required = false) TaskStatus status,
											@RequestHeader("Authorization") String jwt) throws Exception{
		
		UserDto user=userService.getUserProfile(jwt);
		List<Task> tasks=taskService.assignedUsersTask(user.getId(), status);
		
		return new ResponseEntity<>(tasks,HttpStatus.OK);
		
	}
	
	@GetMapping
	public ResponseEntity<List<Task>> getAllTask(@RequestParam(required = false) TaskStatus status,
											@RequestHeader("Authorization") String jwt) throws Exception{
//		UserDto user=userService.getUserProfile(jwt);
		List<Task> tasks=taskService.getAllTask(status);
		
		return new ResponseEntity<>(tasks,HttpStatus.OK);
		
	}
	
	@PutMapping("/user/{id}/assigned/{userId}")
	public ResponseEntity<Task> assignedTaskToUser(
											@PathVariable Long id,
											@PathVariable Long userId,
											@RequestHeader("Authorization") String jwt) throws Exception{
		
		Task tasks=taskService.assignedToUser(userId, id);
		
		return new ResponseEntity<>(tasks,HttpStatus.OK);
		
	}
	
	
	@PutMapping("/{id}")
	public ResponseEntity<Task> updateTask(
											@PathVariable Long id,
											@RequestBody Task task,
											@RequestHeader("Authorization") String jwt) throws Exception{
		
		UserDto user=userService.getUserProfile(jwt);
		Task tasks=taskService.updateTask(id, task, user.getId());
		
		return new ResponseEntity<>(tasks,HttpStatus.OK);
		
	}
	
	@PutMapping("/{id}/complete")
	public ResponseEntity<Task> completeTask(@PathVariable Long id) throws Exception{
		
		Task tasks=taskService.completeTask(id);
		
		return new ResponseEntity<>(tasks,HttpStatus.OK);
		
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteTask(@PathVariable Long id) throws Exception{
		taskService.deleleTask(id);		
		return new ResponseEntity<>("deleted",HttpStatus.OK);
		
	}
	
	
	
}

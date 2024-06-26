package com.task.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.task.model.Task;
import com.task.model.TaskStatus;
import com.task.repository.TaskRepository;

@Service
public class TaskServiceImpl implements TaskService {
	
	@Autowired
	private TaskRepository taskRepo;

	@Override
	public Task create(Task task, String requestRole) throws Exception {
		// TODO Auto-generated method stub
		if(requestRole.equals("ROLE_CUSTOMER")) {
			throw new Exception("Only Admin can Assigned Task");
		}
		task.setStatus(TaskStatus.PENDING);
		task.setCreatedAt(LocalDateTime.now());
		return taskRepo.save(task);
	}
	
	@Override
	public Task getTaskById(Long id) throws Exception {
		// TODO Auto-generated method stub
		return taskRepo.findById(id).orElseThrow(() -> new Exception("task not found "+id));
	}

	@Override
	public List<Task> getAllTask(TaskStatus status) {
		// TODO Auto-generated method stub
		List<Task> allTask=taskRepo.findAll();
		
		List<Task> filteredTask=allTask.stream().filter(
				task-> status==null||task.getStatus().name().equalsIgnoreCase(status.toString())
				).collect(Collectors.toList());
		return filteredTask;
	}

	@Override
	public Task updateTask(Long id, Task updateTask, Long userId) throws Exception {
		// TODO Auto-generated method stub
		Task existingTask=taskRepo.findById(id).orElseThrow();
		
		if(updateTask.getDescription()!=null)existingTask.setDescription(updateTask.getDescription());
		if(updateTask.getDeadline()!=null)existingTask.setDeadline(updateTask.getDeadline());
		if(updateTask.getTitle()!=null)existingTask.setTitle(updateTask.getTitle());
		if(updateTask.getStatus()!=null)existingTask.setStatus(updateTask.getStatus());
		
		return taskRepo.save(existingTask);
	}

	@Override
	public void deleleTask(Long id) throws Exception {
		// TODO Auto-generated method stub
		taskRepo.findById(id).orElseThrow(()->new Exception("task not found for deletion"));
		taskRepo.deleteById(id);
	}

	@Override
	public Task assignedToUser(Long userId, Long taskId) throws Exception {
		// TODO Auto-generated method stub
		
		try {			
			Task existingTask=taskRepo.findById(taskId).orElseThrow();
			existingTask.setAssignedUserId(userId);
			existingTask.setStatus(TaskStatus.ASSIGNED);
			
			return taskRepo.save(existingTask);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
		
	}

	@Override
	public List<Task> assignedUsersTask(Long userId, TaskStatus status) {
		
		try {			
			// TODO Auto-generated method stub
			List<Task> allTask=taskRepo.findByAssignedUserId(userId);
			
			List<Task> filteredTask=allTask.stream().filter(
					task-> status==null||task.getStatus().name().equalsIgnoreCase(status.toString())
					).collect(Collectors.toList());
			return filteredTask;
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}

	@Override
	public Task completeTask(Long taskId) throws Exception {
		// TODO Auto-generated method stub
		Task task=getTaskById(taskId);
		task.setStatus(TaskStatus.DONE);
		return taskRepo.save(task);
	}

	
	
}

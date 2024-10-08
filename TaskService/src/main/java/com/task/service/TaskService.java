package com.task.service;

import java.util.List;

import com.task.model.Task;
import com.task.model.TaskStatus;

public interface TaskService {
	Task create(Task task,String requestRole) throws Exception;
	Task getTaskById(Long id) throws Exception;
	List<Task> getAllTask(TaskStatus status);
	Task updateTask(Long id,Task updateTask,Long userId)throws Exception;
	void deleleTask(Long id)throws Exception;
	Task assignedToUser(Long userId,Long taskId)throws Exception ;
	List<Task> assignedUsersTask(Long userId,TaskStatus status);
	Task completeTask(Long taskId) throws Exception;
}

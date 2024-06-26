package com.sub.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sub.model.Submission;
import com.sub.model.Task;
import com.sub.repository.SubmissionRepository;

@Service
public class SubmissionServiceImpl implements SubmissionService {

	@Autowired
	private SubmissionRepository repo;
	
	@Autowired
	private TaskService taskService;
	
	@Autowired
	private UserService userService;
	
	@Override
	public Submission submitTask(Long taskId, String githubLink, Long userId,String jwt) throws Exception {
		// TODO Auto-generated method stub
		Task task=taskService.getTaskById(taskId, jwt);
		
		if(task!=null) {
			Submission submission=new Submission();
			submission.setTaskId(taskId);
			submission.setUserId(userId);
			submission.setGithubLink(githubLink);
			submission.setSubmissionDate(LocalDateTime.now());
			return repo.save(submission);
		}
		throw new Exception("task not found with this id: "+taskId);
	}

	@Override
	public Submission getTaskById(Long submissionId) throws Exception {
		// TODO Auto-generated method stub
		return repo.findById(submissionId).orElseThrow(() -> new Exception("task submission not found with this id"));
	}

	@Override
	public List<Submission> getAllTaskSubmission() {
		// TODO Auto-generated method stub
		return repo.findAll();
	}

	@Override
	public List<Submission> getTaskSubmissionByTaskId(Long taskId) {
		// TODO Auto-generated method stub
		return repo.findByTaskId(taskId);
	}

	@Override
	public Submission acceptDeclineSubmission(Long id, String status) throws Exception {
		// TODO Auto-generated method stub
		Submission submission=getTaskById(id);
		submission.setStatus(status);
		if(status.equals("ACCEPT")) {
			taskService.completeTask(submission.getTaskId());
		}
		return repo.save(submission);
	}
	
}

package com.sub.service;

import java.util.List;

import com.sub.model.Submission;

public interface SubmissionService {
	Submission submitTask(Long taskId,String githubLink,Long userId,String jwt) throws Exception;
	
	Submission getTaskById(Long submissionId) throws Exception;
	
	List<Submission> getAllTaskSubmission();
	
	List<Submission> getTaskSubmissionByTaskId(Long taskId);
	
	Submission acceptDeclineSubmission(Long id, String status) throws Exception;
}

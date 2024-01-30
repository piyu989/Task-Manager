package com.end.service;

import java.util.List;

import com.end.model.User;

public interface UserService {
	public User getUserProfile(String jwt);
	public List<User> getAllUser();
}

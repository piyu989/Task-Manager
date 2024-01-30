package com.end.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.end.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
	public User findByEmail(String email);
}

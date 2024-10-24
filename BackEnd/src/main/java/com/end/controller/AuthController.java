package com.end.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.end.config.JwtProvider;
import com.end.model.LoginRequest;
import com.end.model.User;
import com.end.repository.UserRepository;
import com.end.response.AuthResponse;
import com.end.service.CustomerUserServiceImpl;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

	@Autowired
	private UserRepository repo;
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private CustomerUserServiceImpl customerUserDetails;
	
	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> createUserHandle(@RequestBody User user) throws Exception {
		String email=user.getEmail();
		String password=user.getPassword();		
		User isEmailExist=repo.findByEmail(email);
		user.setRole("USER");
		
		if(isEmailExist!=null) {
			throw new UsernameNotFoundException("Email is already registered with another account");
		}
		
		User temp=new User();
		temp.setEmail(user.getEmail());
		temp.setFullName(user.getFullName());
		temp.setRole(user.getRole());
		temp.setPassword(passwordEncoder.encode(user.getPassword()));
		
		repo.save(temp);
		
		Authentication authentication=new UsernamePasswordAuthenticationToken(email,password);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		String token=JwtProvider.generateToken(authentication);
		
		AuthResponse authResponse=new AuthResponse();
		authResponse.setJwt(token);
		authResponse.setMessage("Registered succesfully");
		authResponse.setStatus(true);
		
		return new ResponseEntity<>(authResponse,HttpStatus.OK);
	
	}
	
	private Authentication authenticate(String username,String password) {
		UserDetails details=customerUserDetails.loadUserByUsername(username);
		
		System.out.println(details+"--");
		
		if(details==null) {
			System.out.println("sign in details is null "+details);
			throw new BadCredentialsException("wrong details");
		}
		if(!passwordEncoder.matches(password, details.getPassword())) {
			System.out.println("wrong details entered "+details);
			throw new BadCredentialsException("Invalid username or password	");
		}
		
		return new UsernamePasswordAuthenticationToken(username,null,details.getAuthorities());
		
	}
	
	@PostMapping("/signin")
	public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest loginRequest){
		String username=loginRequest.getEmail();
		String password=loginRequest.getPassword();
		
		System.out.println(username+" ----------- "+password);
		
		Authentication authentication=authenticate(username,password);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		String token=JwtProvider.generateToken(authentication);
		AuthResponse authResponse=new AuthResponse();
		
		authResponse.setMessage("login success");
		authResponse.setJwt(token);
		authResponse.setStatus(true);
		
		return new ResponseEntity<>(authResponse,HttpStatus.OK);
		
		
	}
	
}

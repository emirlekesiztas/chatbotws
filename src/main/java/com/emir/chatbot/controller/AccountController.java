package com.emir.chatbot.controller;

import com.emir.chatbot.dto.LoginRequest;
import com.emir.chatbot.dto.RegistrationRequest;
import com.emir.chatbot.dto.TokenResponse;
import com.emir.chatbot.entity.User;
import com.emir.chatbot.repository.UserRepository;
import com.emir.chatbot.security.JwtTokenUtil;
import com.emir.chatbot.service.Impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;


@RestController
@RequestMapping("/api/token")
@CrossOrigin(origins = "*", allowedHeaders = "*",exposedHeaders = "*", maxAge = 3600)
public class AccountController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private UserServiceImpl userService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest loginRequest) throws AuthenticationException{
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword()));
        final User user = userRepository.findByUserName(loginRequest.getUsername());
        final String token = jwtTokenUtil.generateToken(user);
        return ResponseEntity.ok(new TokenResponse(user.getUserName(),token));
    }
    @PostMapping(value = "/register")
    public ResponseEntity<Boolean> register(@RequestBody RegistrationRequest request) throws AuthenticationException{
        Boolean response = userService.register(request);
        return ResponseEntity.ok(response);
    }
}

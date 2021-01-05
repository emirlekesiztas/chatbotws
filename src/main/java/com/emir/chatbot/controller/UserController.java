package com.emir.chatbot.controller;

import com.emir.chatbot.dto.UserDto;
import com.emir.chatbot.service.Impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*",exposedHeaders = "*", maxAge = 3600)
public class UserController {
    private final UserServiceImpl userService;
    @GetMapping("/getusers")
    public ResponseEntity<List<UserDto>> getUsers(){
        return ResponseEntity.ok(userService.getAll());
    }
    @GetMapping("/{userName}")
    public ResponseEntity<UserDto> getByUsername(@RequestBody @PathVariable String userName){
            return ResponseEntity.ok(userService.getByUsername(userName));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable @RequestBody Long id){
        return ResponseEntity.ok(userService.deleteUser(id));
    }
}

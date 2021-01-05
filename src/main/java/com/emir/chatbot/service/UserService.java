package com.emir.chatbot.service;

import com.emir.chatbot.dto.UserDto;

import java.util.List;

public interface UserService {
    List<UserDto> getAll();
    Boolean deleteUser(Long id);
    UserDto saveUser(UserDto userDto);
    UserDto getByUsername(String userName);

}

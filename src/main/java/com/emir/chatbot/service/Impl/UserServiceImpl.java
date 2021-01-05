package com.emir.chatbot.service.Impl;

import com.emir.chatbot.dto.RegistrationRequest;
import com.emir.chatbot.dto.UserDto;
import com.emir.chatbot.entity.User;
import com.emir.chatbot.repository.UserRepository;
import com.emir.chatbot.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Arrays;
import java.util.List;

@Service
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final BCryptPasswordEncoder encoder;

    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper, BCryptPasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.encoder = encoder;
    }

    @Override
    public List<UserDto> getAll() {
        List<User> data = userRepository.findAll();
        return Arrays.asList(modelMapper.map(data,UserDto[].class));
    }

    @Override
    public Boolean deleteUser(Long id) {
        userRepository.deleteById(id);
        return Boolean.TRUE;
    }

    @Override
    public UserDto saveUser(UserDto userDto) {
       User userDb = modelMapper.map(userDto,User.class);
       userDb = userRepository.save(userDb);
       return modelMapper.map(userDb,UserDto.class);
    }
    public Boolean register(RegistrationRequest request){
        try{
            User user = new User();
            user.setEmail(request.getEmail());
            user.setUserName(request.getUsername());
            user.setPassword(encoder.encode(request.getPassword()));
            userRepository.save(user);
            return Boolean.TRUE;
        }catch (Exception e){
            log.error("REGISTRATION=>",e);
            return Boolean.FALSE;
        }
    }

    @Override
    public UserDto getByUsername(String userName) {
        User userDb = userRepository.findByUserName(userName);
        return modelMapper.map(userDb,UserDto.class);
    }
}

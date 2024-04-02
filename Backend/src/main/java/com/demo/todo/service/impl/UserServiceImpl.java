package com.demo.todo.service.impl;

import com.demo.todo.dto.UserDto;
import com.demo.todo.model.User;
import com.demo.todo.repository.UserRepository;
import com.demo.todo.service.interfaces.UserService;
import com.demo.todo.util.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private final String SUCCESS_MESSAGE = "Success";

    @Override
    public ApiResponse getUserById(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.map(user -> {
            return new ApiResponse(HttpStatus.OK.value(), SUCCESS_MESSAGE, new UserDto(user));
        }).orElseGet(() -> new ApiResponse(HttpStatus.NOT_FOUND.value(), "User Not found", null));
    }

    @Override
    public ApiResponse getAllUsers() {
        return new ApiResponse(HttpStatus.OK.value(), SUCCESS_MESSAGE, userRepository.findAll());
    }

    @Override
    public ApiResponse save(UserDto userDto) {
        User user;
        if(userDto.getId() != null) {
            user = userRepository.findById(userDto.getId()).orElseThrow(() -> new RuntimeException("User Not Found"));
        }  else {
            user = new User();
        }
        user.setId(userDto.getId());
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user.setImgSrc(userDto.getImgSrc());

        return new ApiResponse(HttpStatus.CREATED.value(), SUCCESS_MESSAGE, userRepository.save(user));
    }


    @Override
    public ApiResponse deleteUser(Long id) {

        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()) {
            userRepository.delete(user.get());
            return new ApiResponse(HttpStatus.OK.value(),SUCCESS_MESSAGE, true);
        } else {
            return new ApiResponse(HttpStatus.BAD_REQUEST.value(), SUCCESS_MESSAGE, false);
        }

    }

}

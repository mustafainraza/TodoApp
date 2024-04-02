package com.demo.todo.service.interfaces;

import com.demo.todo.dto.UserDto;
import com.demo.todo.util.ApiResponse;

public interface UserService {
    ApiResponse getUserById(Long id);

    ApiResponse getAllUsers();

    ApiResponse save(UserDto userDto);

    ApiResponse deleteUser(Long id);
}

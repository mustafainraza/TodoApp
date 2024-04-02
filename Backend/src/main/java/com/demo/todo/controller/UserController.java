package com.demo.todo.controller;

import com.demo.todo.dto.UserDto;
import com.demo.todo.service.interfaces.UserService;
import com.demo.todo.util.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class UserController {

    private UserService service;

    @GetMapping("/")
    public ResponseEntity<ApiResponse> getAllUsers() {
        ApiResponse apiResponse = service.getAllUsers();
        return ResponseEntity.status(apiResponse.getCode()).body(apiResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getUserById(@PathVariable Long id) {
        ApiResponse apiResponse = service.getUserById(id);
        return ResponseEntity.status(apiResponse.getCode()).body(apiResponse);
    }

    @PostMapping("/")
    public ResponseEntity<ApiResponse> createUser(@RequestBody UserDto userDto) {
        ApiResponse apiResponse = service.save(userDto);
        return ResponseEntity.status(apiResponse.getCode()).body(apiResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable Long id) {
        ApiResponse apiResponse = service.deleteUser(id);
        return ResponseEntity.status(apiResponse.getCode()).body(apiResponse);
    }

    // @PatchMapping("/")
  //  public ResponseEntity<ApiResponse> editUser(@RequestBody UserDto userDto) {
    //    ApiResponse apiResponse = service.editUser(userDto);
     //   return ResponseEntity.status(apiResponse.getCode()).body(apiResponse);
   // }

}

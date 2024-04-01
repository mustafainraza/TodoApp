package com.demo.todo.controller;

import com.demo.todo.dto.TaskDto;
import com.demo.todo.service.interfaces.TaskService;
import com.demo.todo.util.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/task")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class TaskController {
    private TaskService service;

    @GetMapping("/")
    public ResponseEntity<ApiResponse> getAllTasks(){
        ApiResponse apiResponse = service.getAllTasks();
        return ResponseEntity.status(apiResponse.getCode()).body(apiResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getTask(@PathVariable Long id){
         ApiResponse apiResponse =  service.getTask(id);
        return ResponseEntity.status(apiResponse.getCode()).body(apiResponse);
    }
    @GetMapping("/search")
    public ResponseEntity<ApiResponse> searchTasks(@RequestParam String query){
        ApiResponse apiResponse = service.search(query);
        return ResponseEntity.status(apiResponse.getCode()).body(apiResponse);
    }
    @PostMapping("/")
    public ResponseEntity<ApiResponse> createTask(@RequestBody TaskDto taskDto){
        ApiResponse apiResponse =  service.save(taskDto);
        return ResponseEntity.status(apiResponse.getCode()).body(apiResponse);
    }


    @DeleteMapping("/{id}")

    public ResponseEntity<ApiResponse> deleteTag(@PathVariable Long id){
        ApiResponse apiResponse = service.deleteTask(id);
        return ResponseEntity.status(apiResponse.getCode()).body(apiResponse);
    }
}

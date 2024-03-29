package com.demo.todo.service.interfaces;

import com.demo.todo.dto.TaskDto;
import com.demo.todo.util.ApiResponse;

public interface TaskService {
    public ApiResponse getAllTasks();
    public ApiResponse getTask(Long id);

    public ApiResponse save(TaskDto taskDto);

    public ApiResponse deleteTask(Long id);

    public ApiResponse search(String query);

}

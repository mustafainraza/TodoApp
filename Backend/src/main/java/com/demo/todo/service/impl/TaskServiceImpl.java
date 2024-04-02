package com.demo.todo.service.impl;

import com.demo.todo.dto.ElementarySubTaskDto;
import com.demo.todo.dto.ElementaryTaskDto;
import com.demo.todo.dto.TagDto;
import com.demo.todo.dto.TaskDto;
import com.demo.todo.model.Task;
import com.demo.todo.repository.TagRepository;
import com.demo.todo.repository.TaskRepository;
import com.demo.todo.service.interfaces.TaskService;
import com.demo.todo.util.ApiResponse;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class TaskServiceImpl implements TaskService {
    private final String SUCCESS_MESSAGE = "Success";
    private TaskRepository taskRepository;
    private TagRepository tagRepository;

    @Override
    public ApiResponse getAllTasks() {
        return new ApiResponse(
                HttpStatus.OK.value(),
                SUCCESS_MESSAGE,
                taskRepository.findByParentIsNull().stream()
                    .map(this::mapTaskToDto)
                    .toList()
        );
    }

    @Override
    public ApiResponse getTask(Long id) {
        Optional<Task> taskOptional = taskRepository.findById(id);
        return taskOptional.map(task->{
            ElementaryTaskDto taskDto = mapTaskToDto(task);
            if(task.getParent()==null){
                List<ElementarySubTaskDto> tasksDto = taskRepository.findSubTasks(id).stream()
                        .map(subTask->new ElementarySubTaskDto(
                                subTask.getId(),
                                subTask.getTitle(),
                                subTask.getDescription()
                        ))
                        .toList();
                return new ApiResponse(HttpStatus.OK.value(), SUCCESS_MESSAGE, new TaskDto(taskDto, tasksDto));
            } else {
                return new ApiResponse(HttpStatus.OK.value(), SUCCESS_MESSAGE, new TaskDto(taskDto, Collections.emptyList()));
            }
        }).orElseGet(()->new ApiResponse(HttpStatus.NOT_FOUND.value(), "Task Not Found", null));
    }

    @Override
    @Transactional
    public ApiResponse deleteTask(Long id) {
        Optional<Task> taskOptional = taskRepository.findById(id);
        return taskOptional.map(task->{
                    if(task.getParent()==null){
                        List<Task> tasks = taskRepository.findSubTasks(id);
                        tasks.forEach(subTask->taskRepository.delete(subTask));
                    }
                    taskRepository.delete(task);
                    return new ApiResponse(HttpStatus.OK.value(), SUCCESS_MESSAGE, true);
                }
        ).orElseGet(()->new ApiResponse(HttpStatus.NOT_FOUND.value(), "Task Not Found", false));
    }

    @Override
    public ApiResponse search(String query) {
        return query.length()<4 ?
                new ApiResponse(HttpStatus.NOT_ACCEPTABLE.value(), "Query Too Small", null) :
                new ApiResponse(HttpStatus.OK.value(), SUCCESS_MESSAGE, taskRepository.searchTasks(query));
    }

    @Override
    @Transactional
    public ApiResponse save(TaskDto taskDto) {
        final Long taskId = taskDto.getTask().getId();
        if(taskId != null && taskId>0L){
            Optional<Task> taskOptional = taskRepository.findById(taskId);
            if(taskOptional.isPresent()){
                return saveTask(taskOptional.get(), taskDto);
            }
        } else {
            return saveTask(new Task(), taskDto);
        }
        return new ApiResponse(HttpStatus.BAD_REQUEST.value(), "Cannot Save Or Edit", false);
    }

    private ApiResponse saveTask(Task task, TaskDto dto){
        task.setTitle(dto.getTask().getTitle());
        task.setDescription(dto.getTask().getDescription());
        task.setTags(
                dto.getTask().getTags().stream()
                        .map(tagDto->tagRepository.findById(tagDto.getId()).get())
                        .collect(Collectors.toSet()));
        Map<Long, ElementarySubTaskDto> taskMap = new HashMap<>();
        List<Task> prevSubTasks = taskRepository.findSubTasks(task.getId());
        dto.getSubTasks()
                .forEach(subTask->{
                    Task newSubTask;
                    if(subTask.getId()==null || subTask.getId()<0L){
                        newSubTask = new Task();
                    } else {
                        newSubTask = taskRepository.findById(subTask.getId()).get();
                        taskMap.put(subTask.getId(), subTask);
                    }
                    newSubTask.setParent(task);
                    newSubTask.setTitle(subTask.getTitle());
                    newSubTask.setDescription(subTask.getDescription());
                    taskRepository.save(newSubTask);
                });
        if(!taskMap.isEmpty()){
            for(Task prevSubTask: prevSubTasks){
                if(!taskMap.containsKey(prevSubTask.getId())){
                    taskRepository.delete(prevSubTask);
                }
            }
        }
        taskRepository.save(task);
        return new ApiResponse(HttpStatus.CREATED.value(), SUCCESS_MESSAGE, true);
    }
    private ElementaryTaskDto mapTaskToDto(Task task){
        return new ElementaryTaskDto(
                task.getId(), task.getTitle(), task.getDescription(),
                task.getTags().stream()
                        .map(tag->new TagDto(tag.getId(), tag.getName()))
                        .collect(Collectors.toSet())
        );
    }
}

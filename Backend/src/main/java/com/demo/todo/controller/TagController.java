package com.demo.todo.controller;

import com.demo.todo.dto.TagDto;
import com.demo.todo.service.interfaces.TagService;
import com.demo.todo.util.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tag")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class TagController {
    private TagService service;

    @GetMapping("/all")
    public ResponseEntity<ApiResponse> getAllTags(){
        ApiResponse apiResponse = service.getAllTags();
        return ResponseEntity.status(apiResponse.getCode()).body(apiResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getTag(@PathVariable Long id){
        ApiResponse apiResponse = service.getTag(id);
        return ResponseEntity.status(apiResponse.getCode()).body(apiResponse);
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse> createTask(@RequestBody TagDto tagDto){
        ApiResponse apiResponse =  service.save(tagDto);
        return ResponseEntity.status(apiResponse.getCode()).body(apiResponse);
    }
    @PostMapping("/edit")
    public ResponseEntity<ApiResponse> editTask(@RequestBody TagDto tagDto){
        ApiResponse apiResponse =  service.save(tagDto);
        return ResponseEntity.status(apiResponse.getCode()).body(apiResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteTag(@PathVariable Long id){
        ApiResponse apiResponse = service.delete(id);
        return ResponseEntity.status(apiResponse.getCode()).body(apiResponse);
    }
}

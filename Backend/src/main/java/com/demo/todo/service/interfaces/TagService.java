package com.demo.todo.service.interfaces;

import com.demo.todo.dto.TagDto;
import com.demo.todo.util.ApiResponse;

public interface TagService {
    public ApiResponse getAllTags();
    public ApiResponse getTag(Long id);
    public ApiResponse save(TagDto tagDto);
    public ApiResponse delete(Long id);
}

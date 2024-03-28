package com.demo.todo.service.impl;

import com.demo.todo.dto.TagDto;
import com.demo.todo.model.Tag;
import com.demo.todo.repository.TagRepository;
import com.demo.todo.repository.TaskRepository;
import com.demo.todo.service.interfaces.TagService;
import com.demo.todo.util.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class TagServiceImpl implements TagService {
    private TagRepository tagRepository;
    private final String SUCCESS_MESSAGE = "Success";
    private final String BAD_REQUEST = "Bad Request";

    @Override
    public ApiResponse getAllTags() {
        return new ApiResponse(HttpStatus.OK.value(), SUCCESS_MESSAGE, tagRepository.findAll());
    }

    @Override
    public ApiResponse getTag(Long id) {
        return tagRepository.findById(id).map(
                tag->new ApiResponse(HttpStatus.OK.value(), SUCCESS_MESSAGE, tag)
        ).orElseGet(()->new ApiResponse(HttpStatus.NOT_FOUND.value(), "Not Found", null));
    }

    @Override
    public ApiResponse save(TagDto tagDto) {
        if(tagDto.getId()!=null && tagDto.getId()>0L){
            Optional<Tag> tagOptional = tagRepository.findById(tagDto.getId());
            if(tagOptional.isPresent()){
                Tag tag = tagOptional.get();
                tag.setName(tagDto.getName());
                tagRepository.save(tag);
                return new ApiResponse(HttpStatus.OK.value(), SUCCESS_MESSAGE, tag);
            }
        } else {
            Tag tag = new Tag();
            tag.setName(tag.getName());
            tagRepository.save(tag);
            return new ApiResponse(HttpStatus.CREATED.value(), SUCCESS_MESSAGE, tag);
        }
        return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal Server Error", null);
    }

    @Override
    public ApiResponse delete(Long id) {
        return tagRepository.findById(id).map(tag->{
            if(tagRepository.findTasksByTagId(id).isEmpty()){
                tagRepository.delete(tag);
                return new ApiResponse(HttpStatus.OK.value(), SUCCESS_MESSAGE, true);
            } else {
                return new ApiResponse(HttpStatus.FORBIDDEN.value(), "Referential Integrity Violation",
                        false);
            }
        }).orElseGet(()->new ApiResponse(HttpStatus.NOT_FOUND.value(), "Record Not Found", false));
    }
}

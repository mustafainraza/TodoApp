package com.demo.todo.service.impl;

import com.demo.todo.dto.ElementaryTaskDto;
import com.demo.todo.dto.TagDto;
import com.demo.todo.model.Tag;
import com.demo.todo.repository.TagRepository;
import com.demo.todo.repository.TaskRepository;
import com.demo.todo.service.interfaces.TagService;
import com.demo.todo.util.ApiResponse;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class TagServiceImpl implements TagService {
    private TagRepository tagRepository;
    private final String SUCCESS_MESSAGE = "Success";
    private final String BAD_REQUEST = "Bad Request";

    @Override
    public ApiResponse getAllTags() {
        List<TagDto> tags = tagRepository.findAll().stream()
                .map(tag->new TagDto(tag.getId(), tag.getName()))
                .toList();
        return new ApiResponse(HttpStatus.OK.value(), SUCCESS_MESSAGE, tags);
    }

    @Override
    public ApiResponse getTag(Long id) {
        return tagRepository.findById(id).map(
                tag->new ApiResponse(HttpStatus.OK.value(), SUCCESS_MESSAGE, new TagDto(tag.getId(), tag.getName()))
        ).orElseGet(()->new ApiResponse(HttpStatus.NOT_FOUND.value(), "Not Found", null));
    }

    @Override
    @Transactional
    public ApiResponse save(TagDto tagDto) {
        if(tagDto.getId()!=null && tagDto.getId()>0L){
            Optional<Tag> tagOptional = tagRepository.findById(tagDto.getId());
            if(tagOptional.isPresent()){
                Tag tag = tagOptional.get();
                tag.setName(tagDto.getName());
                tagRepository.save(tag);
                return new ApiResponse(HttpStatus.OK.value(), SUCCESS_MESSAGE, new TagDto(tag.getId(), tag.getName()));
            }
        } else {
            Tag tag = new Tag();
            tag.setName(tagDto.getName());
            tagRepository.save(tag);
            return new ApiResponse(HttpStatus.CREATED.value(), SUCCESS_MESSAGE, new TagDto(tag.getId(), tag.getName()));
        }
        return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal Server Error", null);
    }

    @Override
    @Transactional
    public ApiResponse delete(Long id) {
        return tagRepository.findById(id).map(tag->{
            if(tagRepository.findTasksByTagId(id).isEmpty()){
                tagRepository.delete(tag);
                tagRepository.flush();
                return new ApiResponse(HttpStatus.OK.value(), SUCCESS_MESSAGE, true);
            } else {
                return new ApiResponse(HttpStatus.FORBIDDEN.value(), "Referential Integrity Violation",
                        false);
            }
        }).orElseGet(()->new ApiResponse(HttpStatus.NOT_FOUND.value(), "Record Not Found", false));
    }
}

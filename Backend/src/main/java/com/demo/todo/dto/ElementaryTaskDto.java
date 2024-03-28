package com.demo.todo.dto;


import com.demo.todo.model.Tag;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ElementaryTaskDto {
    private Long id;
    private String title;
    private String description;
    private List<TagDto> tags;
}

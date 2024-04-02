package com.demo.todo.repository;

import com.demo.todo.model.Tag;
import com.demo.todo.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByParentIsNull();

    @Query("SELECT t FROM Task t WHERE t.parent.id = :id")
    List<Task> findSubTasks(@Param("id") long id);

    @Query("SELECT DISTINCT t FROM Task t " +
            "JOIN t.tags tag " +
            "WHERE t.title LIKE %:searchQuery% " +
            "OR t.description LIKE %:searchQuery% " +
            "OR tag.name LIKE %:searchQuery%")
    List<Task> searchTasks(@Param("searchQuery") String searchQuery);
    
}

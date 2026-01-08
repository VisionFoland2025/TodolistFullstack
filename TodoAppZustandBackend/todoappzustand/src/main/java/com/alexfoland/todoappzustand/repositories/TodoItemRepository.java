package com.alexfoland.todoappzustand.repositories;

import com.alexfoland.todoappzustand.model.TodoItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoItemRepository extends JpaRepository<TodoItem, Long> {
    List<TodoItem> findByTitleContainingIgnoreCase(String title);
}
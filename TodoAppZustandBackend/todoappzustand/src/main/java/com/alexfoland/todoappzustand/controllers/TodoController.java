package com.alexfoland.todoappzustand.controllers;


import com.alexfoland.todoappzustand.model.TodoItem;
import com.alexfoland.todoappzustand.repositories.TodoItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:5173")
public class TodoController implements CommandLineRunner {

    private final TodoItemRepository todoItemRepository;

    public TodoController(TodoItemRepository todoItemRepository) {
        this.todoItemRepository = todoItemRepository;
    }

    @GetMapping
    public List<TodoItem> getAllTodos(@RequestParam(required = false) String title) {
        if (title != null && !title.isEmpty()) {
            return todoItemRepository.findByTitleContainingIgnoreCase(title);
        }
        return todoItemRepository.findAll();
    }

    @PostMapping
    public TodoItem add(@RequestBody TodoItem todoItem) {
        return todoItemRepository.save(todoItem);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        todoItemRepository.deleteById(id);
    }

    @DeleteMapping("/all")
    public void deleteAll() {
        todoItemRepository.deleteAll();
    }

    @Override
    public void run(String... args) {
        if (todoItemRepository.count() == 0) {
            todoItemRepository.save(new TodoItem("Изучить React"));
            todoItemRepository.save(new TodoItem("Настроить Zustand"));
        }
    }
}
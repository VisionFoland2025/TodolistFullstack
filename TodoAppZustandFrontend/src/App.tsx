import { useEffect, useState, type FormEvent } from "react";
import { useTodoStore } from "./store/todoStore";

function App() {
  const { todos, fetchTodos, addTodo, deleteTodo, deleteAll } = useTodoStore();

  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      addTodo(input.trim());
      setInput("");
      setSearchTerm("");
    }
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchTodos(searchTerm);
  };

  return (
    <div className='container mt-5'>
      <h1 className='text-center'>Список дел</h1>

      <form onSubmit={handleAdd} className='mb-3'>
        <div className='input-group'>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Введите задачу'
            className='form-control'
          />
          <button type='submit' className='btn btn-primary'>
            Добавить
          </button>
        </div>
      </form>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (window.confirm("Вы уверены, что хотите удалить все задачи?")) {
            deleteAll();
          }
        }}
        className='text-center mb-4'
      >
        <button className='btn btn-danger' type='submit'>
          Удалить все задачи
        </button>
      </form>

      <form onSubmit={handleSearchSubmit} className='mb-3'>
        <div className='input-group'>
          <input
            type='text'
            className='form-control'
            placeholder='Найти задачи'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type='submit' className='btn btn-outline-secondary'>
            Искать
          </button>
        </div>
      </form>

      <ul className='list-group'>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className='list-group-item d-flex justify-content-between align-items-center'
          >
            {todo.title}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                deleteTodo(todo.id);
              }}
            >
              <button type='submit' className='btn btn-danger btn-sm'>
                Удалить
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

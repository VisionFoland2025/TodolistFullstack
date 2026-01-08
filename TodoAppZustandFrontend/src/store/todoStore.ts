import { create } from "zustand";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
  completed?: boolean;
}

interface TodoState {
  todos: Todo[];
  fetchTodos: (title?: string) => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  deleteAll: () => Promise<void>;
}

const API_URL = "http://localhost:8080/api/todos";

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],

  fetchTodos: async (title?: string) => {
    try {
      const res = await axios.get<Todo[]>(API_URL, {
        params: { title: title || undefined },
      });
      set({ todos: res.data });
    } catch (error) {
      console.error("Ошибка при загрузке задач:", error);
    }
  },

  addTodo: async (title: string) => {
    try {
      const res = await axios.post<Todo>(API_URL, { title });
      set((state) => ({ todos: [...state.todos, res.data] }));
    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
    }
  },

  deleteTodo: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      set((state) => ({ todos: state.todos.filter((t) => t.id !== id) }));
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    }
  },

  deleteAll: async () => {
    try {
      await axios.delete(`${API_URL}/all`);
      set({ todos: [] });
    } catch (error) {
      console.error("Ошибка при удалении всех задач:", error);
    }
  },
}));

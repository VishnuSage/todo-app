// src/redux/todoSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  filter: "all",
  searchQuery: "",
  // Remove 'theme' from the state
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        text: action.payload.text,
        completed: false,
        category: action.payload.category,
        dueDate: action.payload.dueDate,
        priority: action.payload.priority,
        subtasks: [],
      };
      state.todos.push(newTodo);
    },
    toggleComplete: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      todo.completed = !todo.completed;
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.newText;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    addSubtask: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.todoId);
      if (todo) {
        todo.subtasks.push({
          id: Date.now(),
          text: action.payload.subtaskText,
          completed: false,
        });
      }
    },
    toggleSubtaskComplete: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.todoId);
      const subtask = todo.subtasks.find((subtask) => subtask.id === action.payload.subtaskId);
      if (subtask) {
        subtask.completed = !subtask.completed;
      }
    },
  },
});

// Export all necessary actions
export const {
  addTodo,
  toggleComplete,
  deleteTodo,
  editTodo,
  setFilter,
  setSearchQuery,
  addSubtask,
  toggleSubtaskComplete,
} = todoSlice.actions;

export default todoSlice.reducer;

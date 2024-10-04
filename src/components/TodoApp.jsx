// src/components/TodoApp.jsx
import React from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import FilterBar from "./FilterBar";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import ProgressBar from "./ProgressBar";

const TodoApp = () => {
  return (
    <div>
      <h1>Sage's To-Do App</h1>
      <ThemeToggle />
      <SearchBar />
      <FilterBar />
      <AddTodo />
      <ProgressBar />
      <TodoList />
    </div>
  );
};

export default TodoApp;

// src/App.jsx
import React from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import FilterTabs from "./components/FilterTabs"; // Import FilterTabs
import SearchBar from "./components/SearchBar";   // Import SearchBar
import ProgressBar from "./components/ProgressBar";
import { Container, Card } from "react-bootstrap";
import { useSelector } from "react-redux"; // Use this to access todo items
import './App.css';

const App = () => {
  // Access todos from the Redux store
  const todos = useSelector((state) => state.todos.todos);

  return (
    <div className="app-background">
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className="p-4 app-card shadow-lg" style={{ maxWidth: '800px', width: '100%' }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="text-center mb-0 w-100">Sage's To-Do App</h1>
          </div>
          <AddTodo />
          <ProgressBar />

          {/* Show search bar and tabs only if there's at least one task */}
          {todos.length > 0 && (
            <>
              <SearchBar />
              <FilterTabs />
            </>
          )}

          <TodoList />
        </Card>
      </Container>
    </div>
  );
};

export default App;
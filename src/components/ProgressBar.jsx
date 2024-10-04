// src/components/ProgressBar.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { ProgressBar as BootstrapProgressBar } from 'react-bootstrap';

const ProgressBar = () => {
  const todos = useSelector((state) => state.todos.todos);
  const completedTodos = todos.filter(todo => todo.completed).length;
  const progress = todos.length > 0 ? (completedTodos / todos.length) * 100 : 0;

  return (
    <div className="my-4">
      <BootstrapProgressBar now={progress} label={`${Math.round(progress)}%`} variant="success" animated />
    </div>
  );
};

export default ProgressBar;

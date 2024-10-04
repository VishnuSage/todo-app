import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, toggleComplete, editTodo, addSubtask, toggleSubtaskComplete } from "../redux/todoSlice";
import { motion } from "framer-motion";
import { Button, ListGroup, Form, Badge } from "react-bootstrap";
import { PencilSquare, Trash, Check } from "react-bootstrap-icons";

const TodoList = () => {
  const todos = useSelector((state) => state.todos.todos);
  const filter = useSelector((state) => state.todos.filter);
  const searchQuery = useSelector((state) => state.todos.searchQuery);
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(null);
  const [newText, setNewText] = useState("");

  // Filter todos based on search query and filter type (all, active, completed)
  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "active") return !todo.completed;
      return true;
    })
    .filter((todo) => todo.text.toLowerCase().includes(searchQuery.toLowerCase()));

  // Handle editing the todo
  const handleEdit = (id) => {
    dispatch(editTodo({ id, newText }));
    setEditId(null); // Reset edit mode after saving
  };

  return (
    <motion.div className="mt-4">
      {/* Handle empty state for no matching todos */}
      {filteredTodos.length === 0 ? (
        <p className="text-center">No tasks to display.</p>
      ) : (
        <ListGroup>
          {filteredTodos.map((todo) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-2 p-3 bg-white shadow-sm rounded"
            >
              <div className="d-flex align-items-center justify-content-between">
                {/* Editable text input for editing todo */}
                {editId === todo.id ? (
                  <Form.Control
                    type="text"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    className="me-2"
                  />
                ) : (
                  <div>
                    {/* Display todo text with strikethrough if completed */}
                    <span className={`me-3 ${todo.completed ? "text-decoration-line-through" : ""}`}>
                      {todo.text}{" "}
                      <Badge bg={todo.priority === "High" ? "danger" : "secondary"}>
                        {todo.priority}
                      </Badge>
                    </span>
                    <small className="text-muted">Due: {todo.dueDate || "N/A"}</small>
                  </div>
                )}

                {/* Action buttons: toggle complete, edit, delete */}
                <div>
                  <Button
                    variant={todo.completed ? "success" : "outline-success"}
                    onClick={() => dispatch(toggleComplete(todo.id))}
                    className="me-2"
                  >
                    <Check />
                  </Button>
                  {editId === todo.id ? (
                    <Button variant="primary" onClick={() => handleEdit(todo.id)} className="me-2">
                      Save
                    </Button>
                  ) : (
                    <Button
                      variant="outline-primary"
                      onClick={() => {
                        setEditId(todo.id);
                        setNewText(todo.text); // Set current text for editing
                      }}
                      className="me-2"
                    >
                      <PencilSquare />
                    </Button>
                  )}
                  <Button variant="outline-danger" onClick={() => dispatch(deleteTodo(todo.id))}>
                    <Trash />
                  </Button>
                </div>
              </div>

              {/* Subtasks section */}
              <div className="mt-2">
                <h6>Subtasks</h6>
                {todo.subtasks.map((subtask) => (
                  <div key={subtask.id} className="d-flex justify-content-between mb-1">
                    <span className={subtask.completed ? "text-decoration-line-through" : ""}>
                      {subtask.text}
                    </span>
                    <Button
                      size="sm"
                      variant={subtask.completed ? "success" : "outline-success"}
                      onClick={() =>
                        dispatch(toggleSubtaskComplete({ todoId: todo.id, subtaskId: subtask.id }))
                      }
                    >
                      {subtask.completed ? "Undo" : "Complete"}
                    </Button>
                  </div>
                ))}
                {/* Add subtask input */}
                <Form.Control
                  type="text"
                  placeholder="Add a subtask..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.target.value.trim()) {
                      dispatch(addSubtask({ todoId: todo.id, subtaskText: e.target.value }));
                      e.target.value = ""; // Clear input field after adding subtask
                    }
                  }}
                />
              </div>
            </motion.div>
          ))}
        </ListGroup>
      )}
    </motion.div>
  );
};

export default TodoList;

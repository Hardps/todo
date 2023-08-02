import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import axios from 'axios';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [username, setUsername] = useState([]);

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    console.log(...todos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

    const saveTasks = async () => {
    try {
      // Send a POST request to the '/addTask' endpoint
      await axios.post("http://localhost:4000/addTask", {
        username,
        tasks,
      });
      console.log("Tasks saved successfully");
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  };

  return (
    <>
    <div className="bg">
      <h1 className="backtext">What's the Plan for Today?</h1>
      <TodoForm 
        onSubmit={addTodo} 
        saveTasks={saveTasks}
      />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
      </div>
    </>
  );
}

export default TodoList;

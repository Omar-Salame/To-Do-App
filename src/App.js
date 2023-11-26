import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [message, setMessage] = useState('');

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/todos');
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (newTodo) {
      try {
        await axios.post('http://127.0.0.1:5000/todos', { title: newTodo });
        setNewTodo('');
        fetchTodos();
        setMessage('Todo added successfully');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        console.error("Error adding todo:", error);
        setMessage('Failed to add todo');
        setTimeout(() => setMessage(''), 3000);
      }
    }
  };

  const deleteTodo = async (index) => {
    let newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    // Ideally, update the backend here
  };

  const toggleImportance = (index) => {
    let newTodos = [...todos];
    newTodos[index].important = !newTodos[index].important;
    setTodos(newTodos);
    // Ideally, update the backend here
  };

  const moveTodo = (index, direction) => {
    let newTodos = [...todos];
    if (direction === 'up' && index > 0) {
      [newTodos[index], newTodos[index - 1]] = [newTodos[index - 1], newTodos[index]];
    } else if (direction === 'down' && index < newTodos.length - 1) {
      [newTodos[index], newTodos[index + 1]] = [newTodos[index + 1], newTodos[index]];
    }
    setTodos(newTodos);
    // Ideally, update the backend here
  };

  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      {message && <p>{message}</p>}
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className={todo.important ? 'important' : ''}>
            {todo.title}
            <button onClick={() => toggleImportance(index)}>Important</button>
            <button onClick={() => deleteTodo(index)}>Delete</button>
            <button onClick={() => moveTodo(index, 'up')}>Up</button>
            <button onClick={() => moveTodo(index, 'down')}>Down</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

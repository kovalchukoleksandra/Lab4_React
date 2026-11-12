import './App.css';
import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import UpdateList from './UpdateList';
import axios from 'axios';

function App() {
  const [tasks, updateTasks] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=4');
        const taskNames = res.data.map((item) => item.title);
        updateTasks(taskNames);
      } catch (err) {
        console.error('Помилка завантаження API:', err);
      }
    };
    fetchTasks();
  }, []);

  const addTask = (newTask) => {
    updateTasks((prev) => [...prev, newTask]);
  };

  const removeTask = (indexToRemove) => {
    updateTasks((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const editTask = (indexToEdit, newText) => {
    updateTasks((prev) => prev.map((task, i) => (i === indexToEdit ? newText : task)));
  };

  return (
    <div className="container">
      <h2>Tasks list ({tasks.length})</h2>
      <UpdateList onAddTask={addTask} />
      <TodoList tasks={tasks} onDelete={removeTask} onEditTask={editTask} />
    </div>
  );
}

export default App;
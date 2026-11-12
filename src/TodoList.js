import React, { useState } from 'react';

function TodoList({ tasks = [], onDelete, onEditTask }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState('');

  const handleStartEdit = (index, currentText) => {
    setEditingIndex(index);
    setEditText(currentText);
  };

  const handleSaveEdit = (index) => {
    if (editText.trim()) {
      onEditTask(index, editText.trim());
      setEditingIndex(null);
    }
  };

  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <li key={index} className="task-item">
          {editingIndex === index ? (
            <div className="edit-form">
              <input 
                type="text" 
                className="edit-input"
                value={editText} 
                onChange={(e) => setEditText(e.target.value)} 
              />
              <div className="btn-group">
                <button className="btn-save" onClick={() => handleSaveEdit(index)}>Зберегти</button>
                <button className="btn-cancel" onClick={() => setEditingIndex(null)}>Скасувати</button>
              </div>
            </div>
          ) : (
            <>
              <span className="task-text">{task}</span>
              <div className="btn-group">
                <button className="btn-edit" onClick={() => handleStartEdit(index, task)}>Редагувати</button>
                <button className="btn-delete" onClick={() => onDelete(index)}>Видалити</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
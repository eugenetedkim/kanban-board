// app/components/kanban/Task.jsx
import React from 'react';

export const Task = ({ task, onDragStart }) => {
  return (
    <div
      className="bg-white p-3 rounded shadow cursor-move hover:shadow-md"
      draggable
      onDragStart={onDragStart}
    >
      <div className="flex justify-between items-start">
        <p>{task.content}</p>
      </div>
    </div>
  );
}
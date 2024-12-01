// app/components/kanban/Column.jsx
import React, { useState } from 'react';
import { TaskList } from './TaskList';

export const Column = ({
  id,
  title,
  tasks,
  onDrop,
  onDragStart,
  onAddTask
}) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskContent, setNewTaskContent] = useState('');

  // Prevent default to allow drop
  const handleDragOver = (e) => {
    e.preventDefault();
  }

  const handleAddTask = () => {
    if (newTaskContent.trim()) {
      onAddTask(newTaskContent.trim());
      setNewTaskContent('');
      setIsAddingTask(false);
    }
  };

  return (
    <div
      className="bg-white-100 p-4 rounded-lg w-80 shadow"
      onDragOver={handleDragOver}
      onDrop={onDrop}
    >
      {/* Column Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold">{title}</h2>
        <button
          onClick={() => setIsAddingTask(true)}
          className="p-1 hover:bg-gray-200 rounded"
        >
          + Add Task
        </button>
      </div>

      {/* Add Task Form */}
      {isAddingTask && (
        <div className="mb-4">
          <input
            type="text"
            value={newTaskContent}
            onChange={(e) => setNewTaskContent(e.target.value)}
            placeholder="Enter task description..."
            className="w-full p-2 border rounded mb-2 bg-white text-black"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddTask}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add
            </button>
            <button
              onClick={() => {
                setIsAddingTask(false);
                setNewTaskContent('');
              }}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Tasks List */}
      <TaskList
        tasks={tasks}
        onDragStart={onDragStart}
      />
    </div>
  );
};
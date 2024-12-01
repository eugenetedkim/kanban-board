// app/components/kanban/TaskList.jsx
import React from 'react';
import { Task } from './Task';

export const TaskList = ({ tasks, onDragStart }) => {
  return (
    <div className="space-y-2">
      {tasks.map(task => (
        <Task
          key={task.id}
          task={task}
          onDragStart={() => onDragStart(task)}
        />
      ))}
    </div>
  );
};
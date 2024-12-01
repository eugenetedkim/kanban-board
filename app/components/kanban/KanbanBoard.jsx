import React, { useState } from "react";
import { Column } from './Column';

export const KanbanBoard = () => {
  // Initial state for our columns
  const [columns, setColumns] = useState({
    todo: {
      id: 'todo',
      title: 'To Do',
      tasks: [
        { id: '1', content: 'Learn React Hooks' },
        { id: '2', content: 'Build practice project'}
      ]
    },
    inProgress: {
      id: 'inProgress',
      title: 'In Progress',
      tasks: [
        { id: '3', content: 'Study React fundamentals'}
      ]
    },
    done: {
      id: 'done',
      title: 'Done',
      tasks: [
        { id: '4', content: 'Set up development environment'}
      ]
    }
  });

  const [draggedTask, setDraggedTask] = useState(null);

  // Handle starting a drag
  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  // Handler for when a task is dropped into a column
  const handleDrop = (columnId) => {
    if (!draggedTask) return;

    setColumns(prevColumns => {
      // Remove from old column
      const updatedColumns = {...prevColumns};
      Object.keys(updatedColumns).forEach(colId => {
        updatedColumns[colId] = {
          ...updatedColumns[colId],
          tasks: updatedColumns[colId].tasks.filter(task =>
            task.id !== draggedTask.id
          )
        };
      });

      // Add to new column
      updatedColumns[columnId] = {
        ...updatedColumns[columnId],
        tasks: [...updatedColumns[columnId].tasks, draggedTask]
      };

      return updatedColumns;
    });

    setDraggedTask(null);
  };

  // Handle adding a new task
  const handleAddTask = (columnId, content) => {
    setColumns(prevColumns => ({
      ...prevColumns,
      [columnId]: {
        ...prevColumns[columnId],
        tasks: [
          ...prevColumns[columnId].tasks,
          { id: Date.now().toString(), content }
        ]
      }
    }));
  }

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-black">Project Tasks</h1>
      <div className="flex flex-row gap-4 overflow-x-auto">
        {Object.values(columns).map(column => (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
            tasks={column.tasks}
            onDrop={() => handleDrop(column.id)}
            onDragStart={handleDragStart}
            onAddTask={(content) => handleAddTask(column.id, content)}
          />
        ))}
      </div>
    </div>
  );
};
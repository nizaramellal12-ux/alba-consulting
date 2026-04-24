import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onDelete, onEdit, onToggle }) => {
  if (tasks.length === 0) {
    return (
      <div className="glass" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p>No tasks found. Create one to get started.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem 
          key={task._id} 
          task={task} 
          onDelete={onDelete} 
          onEdit={onEdit} 
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default TaskList;

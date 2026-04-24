import React from 'react';
import { Trash2, Edit3, CheckCircle, Circle, Calendar, Briefcase } from 'lucide-react';
import { format } from 'date-fns';

const TaskItem = ({ task, onDelete, onEdit, onToggle }) => {
  const isOverdue = task.deadline && new Date(task.deadline) < new Date() && !task.completed;

  return (
    <div className={`task-card glass priority-${task.priority} ${task.completed ? 'completed' : ''}`}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <button 
          onClick={() => onToggle(task)} 
          style={{ background: 'none', padding: 0, marginTop: '4px' }}
        >
          {task.completed ? 
            <CheckCircle color="var(--success)" size={22} /> : 
            <Circle color="var(--text-muted)" size={22} />
          }
        </button>
        <div className="task-info">
          <h3 style={{ 
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? 'var(--text-muted)' : 'var(--text-main)'
          }}>
            {task.title}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
            {task.description}
          </p>
          <div className="task-meta">
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Briefcase size={14} /> {task.category}
            </span>
            {task.deadline && (
              <span style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px',
                color: isOverdue ? 'var(--danger)' : 'var(--text-muted)'
              }}>
                <Calendar size={14} /> {format(new Date(task.deadline), 'MMM d, h:mm a')}
              </span>
            )}
            <span style={{ textTransform: 'capitalize' }}>
              Priority: {task.priority}
            </span>
          </div>
        </div>
      </div>
      
      <div className="task-actions">
        <button onClick={() => onEdit(task)} className="btn-outline" style={{ padding: '0.5rem' }}>
          <Edit3 size={18} />
        </button>
        <button onClick={() => onDelete(task._id)} className="btn-outline" style={{ padding: '0.5rem', color: 'var(--danger)' }}>
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;

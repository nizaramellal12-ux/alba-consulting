import React from 'react';
import { CheckCircle, Clock, List } from 'lucide-react';

const Stats = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  return (
    <div className="stats-bar">
      <div className="stat-card glass">
        <List size={24} color="var(--accent)" />
        <div className="stat-value">{total}</div>
        <div className="stat-label">Total Tasks</div>
      </div>
      <div className="stat-card glass">
        <CheckCircle size={24} color="var(--success)" />
        <div className="stat-value">{completed}</div>
        <div className="stat-label">Completed</div>
      </div>
      <div className="stat-card glass">
        <Clock size={24} color="var(--warning)" />
        <div className="stat-value">{pending}</div>
        <div className="stat-label">Pending</div>
      </div>
    </div>
  );
};

export default Stats;

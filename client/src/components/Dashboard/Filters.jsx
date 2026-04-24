import React from 'react';
import { Filter } from 'lucide-react';

const Filters = ({ filters, setFilters }) => {
  return (
    <div className="glass" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <Filter size={18} color="var(--accent)" />
        <h3 style={{ fontSize: '1.1rem' }}>Filters</h3>
      </div>
      
      <div className="form-group">
        <label>Status</label>
        <select value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})}>
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Priority</label>
        <select value={filters.priority} onChange={(e) => setFilters({...filters, priority: e.target.value})}>
          <option value="">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Category</label>
        <select value={filters.category} onChange={(e) => setFilters({...filters, category: e.target.value})}>
          <option value="">All Categories</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="client projects">Client Projects</option>
        </select>
      </div>
      
      <button 
        className="btn-outline" 
        style={{ width: '100%', fontSize: '0.8rem', padding: '0.5rem' }}
        onClick={() => setFilters({ priority: '', category: '', status: '' })}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Filters;

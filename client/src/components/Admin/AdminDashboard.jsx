import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { ArrowLeft, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get('/tasks/admin');
      setTasks(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  if (loading && tasks.length === 0) return (
    <div className="auth-container">
      <div className="animate-spin" style={{ width: '40px', height: '40px', border: '3px solid var(--accent)', borderTopColor: 'transparent', borderRadius: '50%' }}></div>
    </div>
  );

  return (
    <div className="admin-container animate-fade-in">
      <header className="admin-header">
        <div>
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', textDecoration: 'none', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: '600' }}>
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Admin Control Center</h1>
          <p style={{ color: 'var(--text-muted)' }}>Managing <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>{tasks.length}</span> total tasks across the platform</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-outline" onClick={fetchAllTasks} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RefreshCcw size={18} /> Refresh
          </button>
          <div className="glass" style={{ padding: '0.5rem 1.5rem', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', fontSize: '0.8rem', fontWeight: '700' }}>
            <div className="dot dot-completed"></div> ADMIN ACTIVE
          </div>
        </div>
      </header>

      {error && (
        <div className="glass" style={{ padding: '1rem', color: 'var(--danger)', marginBottom: '2rem', borderLeft: '4px solid var(--danger)' }}>
          {error}
        </div>
      )}

      <div className="admin-table-container glass">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Creator</th>
              <th>Task Details</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Deadline</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                  No tasks found in the system.
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task._id}>
                  <td>
                    <div className="user-info">
                      <span className="user-name">{task.userId?.name || 'Unknown User'}</span>
                      <span className="user-email">{task.userId?.email || 'no-email'}</span>
                    </div>
                  </td>
                  <td>
                    <div className="task-info-cell">
                      <span className="task-title-cell">{task.title}</span>
                      <span className="task-desc-cell">{task.description || 'No description provided'}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)' }}>
                      {task.category}
                    </span>
                  </td>
                  <td>
                    <span className={`badge badge-priority-${task.priority}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.85rem' }}>
                      {task.deadline ? new Date(task.deadline).toLocaleDateString() : '—'}
                    </span>
                  </td>
                  <td>
                    <div className="status-indicator">
                      <div className={`dot ${task.completed ? 'dot-completed' : 'dot-pending'}`}></div>
                      <span style={{ color: task.completed ? 'var(--success)' : 'var(--warning)' }}>
                        {task.completed ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Stats from './Stats';
import TaskList from './TaskList';
import TaskModal from './TaskModal';
import Filters from './Filters';
import { LogOut, Plus, Bell, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({ priority: '', category: '', status: '' });
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [tasks, filters]);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks');
    }
  };

  const applyFilters = () => {
    let result = [...tasks];
    if (filters.priority) result = result.filter(t => t.priority === filters.priority);
    if (filters.category) result = result.filter(t => t.category === filters.category);
    if (filters.status) result = result.filter(t => filters.status === 'completed' ? t.completed : !t.completed);
    setFilteredTasks(result);
  };

  const handleCreateTask = async (taskData) => {
    try {
      if (editingTask) {
        const res = await api.put(`/tasks/${editingTask._id}`, taskData);
        setTasks(tasks.map(t => t._id === editingTask._id ? res.data : t));
      } else {
        const res = await api.post('/tasks', taskData);
        setTasks([...tasks, res.data]);
      }
      setIsModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      console.error('Failed to save task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      console.error('Failed to delete task');
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const res = await api.put(`/tasks/${task._id}`, { completed: !task.completed });
      setTasks(tasks.map(t => t._id === task._id ? res.data : t));
    } catch (err) {
      console.error('Failed to update task');
    }
  };

  const upcomingDeadlines = tasks.filter(t => {
    if (!t.deadline || t.completed) return false;
    const diff = new Date(t.deadline) - new Date();
    return diff > 0 && diff < 86400000 * 2; // Next 48 hours
  });

  return (
    <div className="container animate-fade-in">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem' }}>Welcome back, <span style={{ color: 'var(--accent)' }}>{user?.name}</span></h1>
          <p style={{ color: 'var(--text-muted)' }}>Alba Consulting Management Suite</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {user?.role === 'admin' && (
            <Link to="/admin" className="glass" style={{ padding: '0.5rem', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={20} color="var(--accent)" />
            </Link>
          )}
          {upcomingDeadlines.length > 0 && (
            <div className="glass" style={{ padding: '0.5rem', borderRadius: '50%', cursor: 'pointer', position: 'relative' }}>
              <Bell size={20} color="var(--warning)" />
              <span style={{ position: 'absolute', top: -5, right: -5, background: 'var(--danger)', fontSize: '10px', padding: '2px 5px', borderRadius: '10px' }}>
                {upcomingDeadlines.length}
              </span>
            </div>
          )}
          <button className="btn-outline" onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </header>

      <Stats tasks={tasks} />

      <div className="dashboard-grid">
        <aside>
          <Filters filters={filters} setFilters={setFilters} />
          <button 
            className="btn-primary" 
            style={{ width: '100%', marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            onClick={() => { setEditingTask(null); setIsModalOpen(true); }}
          >
            <Plus size={20} /> Create New Task
          </button>
        </aside>

        <main>
          <TaskList 
            tasks={filteredTasks} 
            onDelete={handleDeleteTask} 
            onEdit={(task) => { setEditingTask(task); setIsModalOpen(true); }}
            onToggle={handleToggleComplete}
          />
        </main>
      </div>

      {isModalOpen && (
        <TaskModal 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleCreateTask} 
          initialData={editingTask}
        />
      )}
    </div>
  );
};

export default Dashboard;

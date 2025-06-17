import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments, createDepartment } from '../store/companySlice';

const Departments = () => {
  const dispatch = useDispatch();
  const { departments, loading, errors } = useSelector((state) => state.company);
  const [form, setForm] = useState({ name: '', description: '' });
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setLocalError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setLocalError('Department name is required');
      return;
    }
    try {
      await dispatch(createDepartment(form)).unwrap();
      setForm({ name: '', description: '' });
      setLocalError('');
    } catch (err) {
      setLocalError(err?.message || 'Failed to add department');
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 32 }}>
      <h1 style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 24 }}>Manage Departments</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 32, background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 600 }}>Department Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #e5e7eb', marginTop: 8 }}
            placeholder="Enter department name"
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 600 }}>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #e5e7eb', marginTop: 8, minHeight: 60 }}
            placeholder="Enter description (optional)"
          />
        </div>
        {localError && <div style={{ color: '#ef4444', marginBottom: 12 }}>{localError}</div>}
        <button
          type="submit"
          disabled={loading?.createDepartment}
          style={{ background: '#7E44EE', color: '#fff', padding: '12px 32px', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 16, cursor: 'pointer' }}
        >
          {loading?.createDepartment ? 'Adding...' : 'Add Department'}
        </button>
      </form>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>Existing Departments</h2>
      {loading?.departments ? (
        <div>Loading departments...</div>
      ) : departments.length === 0 ? (
        <div style={{ color: '#6b7280' }}>No departments found.</div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {departments.map((dept) => (
            <li key={dept.id} style={{ background: '#f9fafb', marginBottom: 12, padding: 16, borderRadius: 8 }}>
              <div style={{ fontWeight: 600, fontSize: 18 }}>{dept.name}</div>
              <div style={{ color: '#6b7280', fontSize: 15 }}>{dept.description}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Departments; 
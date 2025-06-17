// frontend/src/components/AdminUsersPage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Mail, Phone, Shield } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminUsers, deleteAdminUser } from '../store/companySlice';

const AdminUsersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { adminUsers, loading } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, [dispatch]);

  const handleAddAdmin = () => {
    navigate('/admin-users/new');
  };

  const handleEditAdmin = (adminId) => {
    // TODO: Navigate to edit page
    console.log('Edit admin:', adminId);
  };

  const handleDeleteAdmin = (adminId) => {
    if (window.confirm('Are you sure you want to delete this admin user?')) {
      dispatch(deleteAdminUser(adminId));
    }
  };

  const styles = {
    container: {
      padding: '32px',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px'
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: 0
    },
    addButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: '#7E44EE',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '12px 20px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      boxShadow: '0 2px 4px rgba(126, 68, 238, 0.2)'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
      overflow: 'hidden',
      border: '1px solid #e5e7eb'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    thead: {
      backgroundColor: '#f8f9fa',
      borderBottom: '2px solid #e9ecef'
    },
    th: {
      padding: '16px 20px',
      textAlign: 'left',
      fontSize: '14px',
      fontWeight: '700',
      color: '#374151',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    tr: {
      borderBottom: '1px solid #f1f3f4',
      transition: 'background-color 0.2s ease'
    },
    td: {
      padding: '16px 20px',
      fontSize: '14px',
      color: '#374151',
      verticalAlign: 'middle'
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    avatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#7E44EE',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '14px'
    },
    contactInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      color: '#6b7280',
      fontSize: '13px'
    },
    statusBadge: {
      padding: '4px 12px',
      borderRadius: '16px',
      fontSize: '12px',
      fontWeight: '600',
      textAlign: 'center'
    },
    statusActive: {
      backgroundColor: '#d1fae5',
      color: '#065f46'
    },
    statusInactive: {
      backgroundColor: '#fee2e2',
      color: '#991b1b'
    },
    actions: {
      display: 'flex',
      gap: '8px'
    },
    actionButton: {
      padding: '6px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    editButton: {
      backgroundColor: '#dbeafe',
      color: '#1e40af'
    },
    deleteButton: {
      backgroundColor: '#fee2e2',
      color: '#dc2626'
    },
    loading: {
      textAlign: 'center',
      padding: '60px',
      color: '#6b7280'
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px',
      color: '#6b7280'
    }
  };

  if (loading?.adminUsers) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <div>Loading admin users...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Admin Users ({adminUsers.length})</h1>
        <button 
          style={styles.addButton}
          onClick={handleAddAdmin}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#6B2FD9';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#7E44EE';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          <Plus size={20} />
          Add Admin User
        </button>
      </div>

      {/* Table */}
      <div style={styles.card}>
        {adminUsers.length === 0 ? (
          <div style={styles.emptyState}>
            <Shield size={48} style={{ color: '#d1d5db', marginBottom: '16px' }} />
            <h3>No Admin Users Found</h3>
            <p>Get started by adding your first admin user.</p>
            <button style={styles.addButton} onClick={handleAddAdmin}>
              <Plus size={16} />
              Add Admin User
            </button>
          </div>
        ) : (
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.th}>User</th>
                <th style={styles.th}>Contact</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Created</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {adminUsers.map((admin) => (
                <tr 
                  key={admin.id}
                  style={styles.tr}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <td style={styles.td}>
                    <div style={styles.userInfo}>
                      <div style={styles.avatar}>
                        {admin.first_name?.[0]}{admin.last_name?.[0]}
                      </div>
                      <div>
                        <div style={{ fontWeight: '600' }}>
                          {admin.first_name} {admin.last_name}
                        </div>
                        <div style={styles.contactInfo}>
                          <Mail size={14} />
                          {admin.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.contactInfo}>
                      <Phone size={14} />
                      {admin.phone}
                    </div>
                  </td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.statusBadge,
                      ...(admin.is_active ? styles.statusActive : styles.statusInactive)
                    }}>
                      {admin.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={styles.td}>
                    {admin.created_at ? new Date(admin.created_at).toLocaleDateString() : ''}
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actions}>
                      <button
                        style={{...styles.actionButton, ...styles.editButton}}
                        onClick={() => handleEditAdmin(admin.id)}
                        title="Edit Admin"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        style={{...styles.actionButton, ...styles.deleteButton}}
                        onClick={() => handleDeleteAdmin(admin.id)}
                        title="Delete Admin"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminUsersPage;
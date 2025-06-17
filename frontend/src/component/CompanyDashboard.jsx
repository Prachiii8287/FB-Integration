// frontend/src/component/CompanyDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Building2, MapPin, Edit, Shield, Users, BarChart3, UserPlus, UserCog, Settings } from 'lucide-react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCompanyProfile } from '../store/companySlice';
import { fetchEmployees } from '../store/employeeSlice';

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Redux state
  const { user } = useSelector((state) => state.auth);
  const { profile: companyData, loading, errors } = useSelector((state) => state.company);
  const { employees } = useSelector((state) => state.employees);
  
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  useEffect(() => {
    // Only fetch data if user is authenticated and is a parent user
    if (user && user.role === 'PARENT' && user.company) {
      dispatch(fetchCompanyProfile(user.company));
      dispatch(fetchEmployees());
    } else if (user && user.role !== 'PARENT') {
      navigate('/dashboard'); // Redirect non-parent users
    }
  }, [dispatch, user, navigate]);

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: 'Arial, sans-serif',
      padding: '2rem'
    },
    main: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gap: '2rem'
    },
    companySection: {
      backgroundColor: '#7E44EE',
      border: '1px solid rgba(126, 68, 238, 0.2)',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 4px 12px rgba(126, 68, 238, 0.3)',
      position: 'relative'
    },
    companyName: {
      fontSize: '2.2rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '1.5rem'
    },
    companyDetails: {
      display: 'flex',
      gap: '2rem',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    companyDetail: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '1rem'
    },
    editButton: {
      position: 'absolute',
      top: '2rem',
      right: '2rem',
      backgroundColor: 'white',
      color: '#7E44EE',
      border: '2px solid white',
      borderRadius: '8px',
      padding: '0.8rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      cursor: 'pointer',
      fontSize: '0.95rem',
      fontWeight: '600',
      transition: 'all 0.2s ease'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.5rem'
    },
    statCard: {
      backgroundColor: '#7E44EE',
      color: 'white',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 6px 20px rgba(126, 68, 238, 0.3)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      cursor: 'pointer'
    },
    statCardHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(126, 68, 238, 0.4)'
    },
    statHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem'
    },
    statTitle: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: 'white'
    },
    statIcon: {
      opacity: 0.9
    },
    statCount: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '1rem',
      lineHeight: 1
    },
    statCTA: {
      color: 'white',
      fontSize: '0.95rem',
      fontWeight: '500',
      opacity: 0.9
    },
    bottomGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '2rem'
    },
    actionBox: {
      backgroundColor: '#7E44EE',
      border: '1px solid rgba(126, 68, 238, 0.2)',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 4px 12px rgba(126, 68, 238, 0.3)'
    },
    infoBox: {
      backgroundColor: '#7E44EE',
      border: '1px solid rgba(126, 68, 238, 0.2)',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 4px 12px rgba(126, 68, 238, 0.3)'
    },
    boxTitle: {
      fontSize: '1.4rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '1.5rem'
    },
    infoBoxTitle: {
      fontSize: '1.4rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '1.5rem'
    },
    actionButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      width: '100%',
      backgroundColor: 'white',
      border: '2px solid white',
      color: '#7E44EE',
      borderRadius: '8px',
      padding: '1rem',
      marginBottom: '1rem',
      cursor: 'pointer',
      fontSize: '0.95rem',
      fontWeight: '600',
      transition: 'all 0.2s ease',
      textAlign: 'left'
    },
    actionButtonHover: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      transform: 'translateX(2px)'
    },
    infoGrid: {
      display: 'grid',
      gap: '1rem'
    },
    infoItem: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '1rem 1.5rem',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    infoLabel: {
      fontWeight: '600',
      color: '#7E44EE',
      fontSize: '0.95rem',
      flexShrink: 0
    },
    infoValue: {
      color: '#7E44EE',
      fontSize: '0.95rem',
      fontWeight: '500',
      opacity: 0.8
    },
    loading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      fontSize: '1.2rem',
      color: '#7E44EE'
    },
    error: {
      color: '#dc3545',
      textAlign: 'center',
      padding: '2rem',
      fontSize: '1.1rem'
    }
  };

  // Loading state
  if (loading.profile) {
    return <div style={styles.loading}>Loading company data...</div>;
  }

  // Error state
  if (errors.profile) {
    return <div style={styles.error}>Error: {errors.profile}</div>;
  }

  // No company data
  if (!companyData) {
    return <div style={styles.error}>No company data found</div>;
  }

  // Calculate employee statistics from actual data
  const activeEmployees = employees.filter(emp => emp.is_active).length;
  const totalEmployees = employees.length;

  const handleEditProfile = () => {
    // TODO: Implement edit profile functionality
    console.log('Edit profile clicked');
  };

  const handleAddAdmin = () => {
    navigate('/admin-users/new');
  };

  const handleAddEmployee = () => {
    navigate('/employees/new');
  };

  const handleUpdateSettings = () => {
    navigate('/company/settings');
  };

  const handleManageAdmins = () => {
    navigate('/admin-users');
  };

  const handleViewEmployees = () => {
    navigate('/employees');
  };

  const handleManageDepartments = () => {
    navigate('/departments');
  };

  if (user?.role !== 'PARENT') {
    return <Navigate to="/" />;
  }

  return (
    <div style={styles.container}>
      <main style={styles.main}>
        {/* Company Section */}
        <section style={styles.companySection}>
          <button 
            style={styles.editButton}
            onClick={handleEditProfile}
            onMouseEnter={() => setHoveredButton('edit')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <Edit size={16} />
            Edit Profile
          </button>
          <h1 style={styles.companyName}>{companyData.name}</h1>
          <div style={styles.companyDetails}>
            <div style={styles.companyDetail}>
              <Building2 size={18} />
              <span>{companyData.industry_display || companyData.industry}</span>
            </div>
            {companyData.city && companyData.country && (
              <div style={styles.companyDetail}>
                <MapPin size={18} />
                <span>{companyData.city}, {companyData.country}</span>
              </div>
            )}
          </div>
        </section>

        {/* Statistics Cards */}
        <section style={styles.statsGrid}>
          <div 
            style={{
              ...styles.statCard,
              ...(hoveredCard === 'admin' ? styles.statCardHover : {})
            }}
            onMouseEnter={() => setHoveredCard('admin')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={handleManageAdmins}
          >
            <div style={styles.statHeader}>
              <h3 style={styles.statTitle}>Admin Users</h3>
              <Shield size={28} style={styles.statIcon} />
            </div>
            <div style={styles.statCount}>{companyData.admin_count || 0}</div>
            <div style={styles.statCTA}>Manage Admins →</div>
          </div>

          <div 
            style={{
              ...styles.statCard,
              ...(hoveredCard === 'employees' ? styles.statCardHover : {})
            }}
            onMouseEnter={() => setHoveredCard('employees')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={handleViewEmployees}
          >
            <div style={styles.statHeader}>
              <h3 style={styles.statTitle}>Employees</h3>
              <Users size={28} style={styles.statIcon} />
            </div>
            <div style={styles.statCount}>{companyData.employees_count || totalEmployees}</div>
            <div style={styles.statCTA}>View Employees →</div>
          </div>

          <div 
            style={{
              ...styles.statCard,
              ...(hoveredCard === 'departments' ? styles.statCardHover : {})
            }}
            onMouseEnter={() => setHoveredCard('departments')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={handleManageDepartments}
          >
            <div style={styles.statHeader}>
              <h3 style={styles.statTitle}>Departments</h3>
              <BarChart3 size={28} style={styles.statIcon} />
            </div>
            <div style={styles.statCount}>{companyData.departments_count || 0}</div>
            <div style={styles.statCTA}>Manage Departments →</div>
          </div>
        </section>

        {/* Bottom Section */}
        <section style={styles.bottomGrid}>
          {/* Quick Actions */}
          <div style={styles.actionBox}>
            <h3 style={styles.boxTitle}>Quick Actions</h3>
            <button 
              style={{
                ...styles.actionButton,
                ...(hoveredButton === 'admin' ? styles.actionButtonHover : {})
              }}
              onClick={handleAddAdmin}
              onMouseEnter={() => setHoveredButton('admin')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <Shield size={20} />
              Add New Admin User
            </button>
            <button 
              style={{
                ...styles.actionButton,
                ...(hoveredButton === 'employee' ? styles.actionButtonHover : {})
              }}
              onClick={handleAddEmployee}
              onMouseEnter={() => setHoveredButton('employee')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <UserPlus size={20} />
              Add New Employee
            </button>
            <button 
              style={{
                ...styles.actionButton,
                ...(hoveredButton === 'settings' ? styles.actionButtonHover : {})
              }}
              onClick={handleUpdateSettings}
              onMouseEnter={() => setHoveredButton('settings')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <Settings size={20} />
              Update Company Settings
            </button>
          </div>

          {/* Company Information */}
          <div style={styles.infoBox}>
            <h3 style={styles.infoBoxTitle}>Company Information</h3>
            <div style={styles.infoGrid}>
              <div style={styles.infoItem}>
                <div style={styles.infoLabel}>Registration Number:</div>
                <div style={styles.infoValue}>{companyData.registration_number}</div>
              </div>
              <div style={styles.infoItem}>
                <div style={styles.infoLabel}>Website:</div>
                <div style={styles.infoValue}>{companyData.website || '—'}</div>
              </div>
              <div style={styles.infoItem}>
                <div style={styles.infoLabel}>Phone:</div>
                <div style={styles.infoValue}>{companyData.phone || '—'}</div>
              </div>
              {companyData.address && (
                <div style={styles.infoItem}>
                  <div style={styles.infoLabel}>Address:</div>
                  <div style={styles.infoValue}>
                    {[
                      companyData.address,
                      companyData.city,
                      companyData.state,
                      companyData.postal_code,
                      companyData.country
                    ].filter(Boolean).join(', ')}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CompanyDashboard;
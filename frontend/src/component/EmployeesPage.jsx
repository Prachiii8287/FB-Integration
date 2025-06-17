import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Users } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployees, createEmployee } from '../store/employeeSlice';

const EmployeesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { employees, loading } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const styles = {
    container: { padding: '32px', backgroundColor: '#f8f9fa', minHeight: '100vh' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' },
    title: { fontSize: '32px', fontWeight: 'bold', color: '#1f2937', margin: 0 },
    addButton: { display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#7E44EE', color: 'white', border: 'none', borderRadius: '8px', padding: '12px 20px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' },
    card: { backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { padding: '16px', textAlign: 'left', borderBottom: '2px solid #e9ecef', fontWeight: '700', color: '#374151' },
    td: { padding: '16px', borderBottom: '1px solid #f1f3f4' },
    loading: { textAlign: 'center', padding: '60px', color: '#6b7280' }
  };

  if (loading.list) return <div style={styles.container}><div style={styles.loading}>Loading employees...</div></div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Employees ({employees.length})</h1>
        <button style={styles.addButton} onClick={() => navigate('/employees/new')}>
          <Plus size={20} /> Add Employee
        </button>
      </div>
      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Department</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td style={styles.td}>{emp.user?.first_name} {emp.user?.last_name}</td>
                <td style={styles.td}>{emp.department_name}</td>
                <td style={styles.td}>{emp.role}</td>
                <td style={styles.td}>{emp.user?.email}</td>
                <td style={styles.td}>{emp.is_active ? 'Active' : 'Inactive'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AddEmployee = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', department: '', role: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await dispatch(createEmployee({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        department: formData.department,
        role: formData.role
      })).unwrap();
      navigate('/employees');
    } catch (err) {
      setError(err?.message || 'Failed to create employee');
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: { padding: '32px', backgroundColor: '#f8f9fa', minHeight: '100vh' },
    header: { display: 'flex', alignItems: 'center', marginBottom: '32px' },
    backButton: { display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'transparent', border: '1px solid #d1d5db', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', marginRight: '16px' },
    title: { fontSize: '32px', fontWeight: 'bold', color: '#1f2937', margin: 0 },
    card: { backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)', maxWidth: '600px' },
    form: { display: 'flex', flexDirection: 'column', gap: '20px' },
    label: { fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' },
    input: { width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '16px', boxSizing: 'border-box' },
    submitButton: { display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#7E44EE', color: 'white', border: 'none', borderRadius: '8px', padding: '12px 24px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={() => navigate('/employees')}>
          <ArrowLeft size={20} /> Back
        </button>
        <h1 style={styles.title}>Add Employee</h1>
      </div>
      <div style={styles.card}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <label style={styles.label}>First Name</label>
            <input style={styles.input} value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} required />
          </div>
          <div>
            <label style={styles.label}>Last Name</label>
            <input style={styles.input} value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} required />
          </div>
          <div>
            <label style={styles.label}>Email</label>
            <input type="email" style={styles.input} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          </div>
          <div>
            <label style={styles.label}>Department</label>
            <input style={styles.input} value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} required />
          </div>
          <div>
            <label style={styles.label}>Role</label>
            <input style={styles.input} value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} required />
          </div>
          <button type="submit" style={styles.submitButton}>
            <Save size={20} /> Create Employee
          </button>
        </form>
      </div>
    </div>
  );
};

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDept, setNewDept] = useState({ name: '', description: '' });

  useEffect(() => {
    setTimeout(() => {
      setDepartments([
        { id: '1', name: 'Engineering', description: 'Software development and technical operations', employeeCount: 12 },
        { id: '2', name: 'Marketing', description: 'Brand promotion and customer acquisition', employeeCount: 5 },
        { id: '3', name: 'Human Resources', description: 'Employee management and company culture', employeeCount: 3 }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddDepartment = (e) => {
    e.preventDefault();
    setDepartments([...departments, { id: Date.now().toString(), ...newDept, employeeCount: 0 }]);
    setNewDept({ name: '', description: '' });
    setShowAddForm(false);
  };

  const styles = {
    container: { padding: '32px', backgroundColor: '#f8f9fa', minHeight: '100vh' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' },
    title: { fontSize: '32px', fontWeight: 'bold', color: '#1f2937', margin: 0 },
    addButton: { display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#7E44EE', color: 'white', border: 'none', borderRadius: '8px', padding: '12px 20px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' },
    card: { backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)' },
    deptName: { fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' },
    deptDesc: { color: '#6b7280', marginBottom: '16px', lineHeight: '1.5' },
    deptCount: { fontSize: '14px', color: '#7E44EE', fontWeight: '600' },
    form: { display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' },
    input: { padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '16px' },
    textarea: { padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '16px', resize: 'vertical', minHeight: '80px' },
    formButtons: { display: 'flex', gap: '12px' },
    submitBtn: { backgroundColor: '#7E44EE', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 20px', cursor: 'pointer' },
    cancelBtn: { backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 20px', cursor: 'pointer' }
  };

  if (loading) return <div style={styles.container}><div style={{textAlign: 'center', padding: '60px'}}>Loading departments...</div></div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Departments ({departments.length})</h1>
        <button style={styles.addButton} onClick={() => setShowAddForm(!showAddForm)}>
          <Plus size={20} /> Add Department
        </button>
      </div>

      {showAddForm && (
        <div style={styles.card}>
          <h3>Add New Department</h3>
          <form onSubmit={handleAddDepartment} style={styles.form}>
            <input style={styles.input} placeholder="Department Name" value={newDept.name} onChange={(e) => setNewDept({...newDept, name: e.target.value})} required />
            <textarea style={styles.textarea} placeholder="Description" value={newDept.description} onChange={(e) => setNewDept({...newDept, description: e.target.value})} />
            <div style={styles.formButtons}>
              <button type="submit" style={styles.submitBtn}>Create Department</button>
              <button type="button" style={styles.cancelBtn} onClick={() => setShowAddForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div style={styles.grid}>
        {departments.map((dept) => (
          <div key={dept.id} style={styles.card}>
            <div style={styles.deptName}>{dept.name}</div>
            <div style={styles.deptDesc}>{dept.description}</div>
            <div style={styles.deptCount}>{dept.employeeCount} employees</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ===== CompanySettings.jsx =====
// frontend/src/components/CompanySettings.jsx

const CompanySettings = () => {
  const [settings, setSettings] = useState({
    companyName: 'Your Company Name',
    website: 'https://yourcompany.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business St, City, State 12345',
    industry: 'Technology',
    description: 'A leading technology company focused on innovation and excellence.'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  const styles = {
    container: { padding: '32px', backgroundColor: '#f8f9fa', minHeight: '100vh' },
    title: { fontSize: '32px', fontWeight: 'bold', color: '#1f2937', marginBottom: '32px' },
    card: { backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)', maxWidth: '800px' },
    form: { display: 'flex', flexDirection: 'column', gap: '24px' },
    row: { display: 'flex', gap: '16px' },
    formGroup: { display: 'flex', flexDirection: 'column', flex: 1 },
    label: { fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' },
    input: { width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '16px', boxSizing: 'border-box' },
    textarea: { width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '16px', resize: 'vertical', minHeight: '100px', boxSizing: 'border-box' },
    submitButton: { display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#7E44EE', color: 'white', border: 'none', borderRadius: '8px', padding: '12px 24px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', alignSelf: 'flex-start' }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Company Settings</h1>
      <div style={styles.card}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <div style={styles.formGroup}>
              <label style={styles.label}><Building2 size={16} />Company Name</label>
              <input style={styles.input} value={settings.companyName} onChange={(e) => setSettings({...settings, companyName: e.target.value})} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Industry</label>
              <input style={styles.input} value={settings.industry} onChange={(e) => setSettings({...settings, industry: e.target.value})} />
            </div>
          </div>
          
          <div style={styles.row}>
            <div style={styles.formGroup}>
              <label style={styles.label}><Globe size={16} />Website</label>
              <input type="url" style={styles.input} value={settings.website} onChange={(e) => setSettings({...settings, website: e.target.value})} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}><Phone size={16} />Phone</label>
              <input style={styles.input} value={settings.phone} onChange={(e) => setSettings({...settings, phone: e.target.value})} />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}><MapPin size={16} />Address</label>
            <input style={styles.input} value={settings.address} onChange={(e) => setSettings({...settings, address: e.target.value})} />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Company Description</label>
            <textarea style={styles.textarea} value={settings.description} onChange={(e) => setSettings({...settings, description: e.target.value})} />
          </div>

          <button type="submit" style={styles.submitButton}>
            <Save size={20} />Save Settings
          </button>
        </form>
      </div>
    </div>
  );
};

// Export all components
export { EmployeesPage, AddEmployee, DepartmentsPage, CompanySettings };
export default EmployeesPage;
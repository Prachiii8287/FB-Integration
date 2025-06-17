import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const ReviewTimesheet = ({ onBack }) => {
  const [filters, setFilters] = useState({
    employee: '',
    project: '',
    dateRange: 'last7',
    status: ''
  });

  const [timesheetData] = useState([
    { id: 1, employee: 'John Doe', project: 'Project Alpha', task: 'UI Design & Wireframing', hours: 8.5, status: 'Completed' },
    { id: 2, employee: 'Jane Smith', project: 'Project Beta', task: 'Backend API Development', hours: 7.0, status: 'In Progress' },
    { id: 3, employee: 'Emily Davis', project: 'Project Gamma', task: 'Quality Assurance Testing', hours: 6.5, status: 'Rejected' },
    { id: 4, employee: 'Sarah Wilson', project: 'Project Delta', task: 'Client Meeting & Requirements', hours: 4.0, status: 'Completed' },
    { id: 5, employee: 'Mike Johnson', project: 'Project Alpha', task: 'Frontend Bug Fixes', hours: 5.5, status: 'Completed' },
    { id: 6, employee: 'David Brown', project: 'Project Omega', task: 'Database Optimization', hours: 9.0, status: 'In Progress' },
    { id: 7, employee: 'Alice Wong', project: 'Project Gamma', task: 'Code Review & Documentation', hours: 4.5, status: 'In Progress' },
    { id: 8, employee: 'Robert Lee', project: 'Project Beta', task: 'System Integration Testing', hours: 7.5, status: 'Completed' },
    { id: 9, employee: 'Emma Stone', project: 'Project Sigma', task: 'Market Research & Analysis', hours: 6.0, status: 'In Progress' },
    { id: 10, employee: 'Kevin Hart', project: 'Project Delta', task: 'API Security Implementation', hours: 8.0, status: 'Rejected' }
  ]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Completed': 'status-completed',
      'In Progress': 'status-progress',
      'Rejected': 'status-rejected'
    };
    
    return (
      <span className={`status-badge ${statusClasses[status]}`}>
        {status}
      </span>
    );
  };

  const filteredData = timesheetData.filter(item => {
    return (
      (!filters.employee || item.employee.toLowerCase().includes(filters.employee.toLowerCase())) &&
      (!filters.project || item.project.toLowerCase().includes(filters.project.toLowerCase())) &&
      (!filters.status || item.status === filters.status)
    );
  });

  const handleBulkApprove = () => {
    console.log('Bulk approve clicked');
    // Placeholder for bulk approve functionality
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.backSection} onClick={onBack}>
          <ArrowLeft size={20} style={styles.backIcon} />
          <span style={styles.backText}>Back to Timesheets</span>
        </div>
        <h1 style={styles.title}>Review Timesheet</h1>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {/* Filter Controls */}
        <div style={styles.filtersCard}>
          <div style={styles.filtersContainer}>
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Employee</label>
              <select 
                style={styles.filterSelect}
                value={filters.employee}
                onChange={(e) => handleFilterChange('employee', e.target.value)}
              >
                <option value="">All Employees</option>
                <option value="John Doe">John Doe</option>
                <option value="Jane Smith">Jane Smith</option>
                <option value="Emily Davis">Emily Davis</option>
                <option value="Sarah Wilson">Sarah Wilson</option>
                <option value="Mike Johnson">Mike Johnson</option>
                <option value="David Brown">David Brown</option>
                <option value="Alice Wong">Alice Wong</option>
                <option value="Robert Lee">Robert Lee</option>
                <option value="Emma Stone">Emma Stone</option>
                <option value="Kevin Hart">Kevin Hart</option>
              </select>
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Project</label>
              <select 
                style={styles.filterSelect}
                value={filters.project}
                onChange={(e) => handleFilterChange('project', e.target.value)}
              >
                <option value="">All Projects</option>
                <option value="Project Alpha">Project Alpha</option>
                <option value="Project Beta">Project Beta</option>
                <option value="Project Gamma">Project Gamma</option>
                <option value="Project Delta">Project Delta</option>
                <option value="Project Omega">Project Omega</option>
                <option value="Project Sigma">Project Sigma</option>
              </select>
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Date Range</label>
              <select 
                style={styles.filterSelect}
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              >
                <option value="last7">Last 7 Days</option>
                <option value="thisMonth">This Month</option>
                <option value="last30">Last 30 Days</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Status</label>
              <select 
                style={styles.filterSelect}
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Status</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Timesheet Table */}
        <div style={styles.tableCard}>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.th}>Employee</th>
                  <th style={styles.th}>Project</th>
                  <th style={styles.th}>Task</th>
                  <th style={styles.th}>Hours</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id} style={styles.tableRow}>
                    <td style={styles.tdEmployee}>{item.employee}</td>
                    <td style={styles.tdProject}>{item.project}</td>
                    <td style={styles.td}>{item.task}</td>
                    <td style={styles.tdHours}>{item.hours} hrs</td>
                    <td style={styles.td}>{getStatusBadge(item.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bulk Approve Button */}
        <div style={styles.bulkApproveContainer}>
          <button 
            style={styles.bulkApproveButton}
            onClick={handleBulkApprove}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#553c9a';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#6b46c1';
              e.target.style.transform = 'translateY(0px)';
            }}
          >
            Bulk Approve
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '24px',
    backgroundColor: '#fafafa',
    minHeight: '100vh',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '32px',
    position: 'relative'
  },
  backSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    position: 'absolute',
    left: 0,
    color: '#7b2cbf',
    transition: 'opacity 0.2s ease',
    '&:hover': {
      opacity: 0.8
    }
  },
  backIcon: {
    color: '#7b2cbf'
  },
  backText: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#7b2cbf'
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#333',
    margin: 0,
    width: '100%',
    textAlign: 'center'
  },
  content: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e0e0e0'
  },
  filtersCard: {
    backgroundColor: 'white',
    padding: '28px 40px',
    marginBottom: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
  },
  filtersContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
    alignItems: 'end'
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '220px',
    flex: '1'
  },
  filterLabel: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '8px'
  },
  filterSelect: {
    padding: '14px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '15px',
    backgroundColor: 'white',
    color: '#374151',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none',
    minHeight: '48px'
  },
  tableCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
    marginBottom: '24px'
  },
  tableContainer: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '15px'
  },
  tableHeader: {
    backgroundColor: '#f8fafc'
  },
  th: {
    color: '#374151',
    fontWeight: '600',
    padding: '20px 16px',
    textAlign: 'left',
    borderBottom: '2px solid #e5e7eb',
    whiteSpace: 'nowrap',
    fontSize: '16px'
  },
  tableRow: {
    transition: 'background-color 0.2s ease',
    cursor: 'pointer'
  },
  td: {
    padding: '18px 16px',
    borderBottom: '1px solid #f1f5f9',
    verticalAlign: 'middle',
    fontSize: '15px'
  },
  tdEmployee: {
    padding: '18px 16px',
    borderBottom: '1px solid #f1f5f9',
    verticalAlign: 'middle',
    fontWeight: '600',
    color: '#374151',
    fontSize: '15px'
  },
  tdProject: {
    padding: '18px 16px',
    borderBottom: '1px solid #f1f5f9',
    verticalAlign: 'middle',
    color: '#6b46c1',
    fontWeight: '500',
    fontSize: '15px'
  },
  tdHours: {
    padding: '18px 16px',
    borderBottom: '1px solid #f1f5f9',
    verticalAlign: 'middle',
    fontWeight: '600',
    color: '#059669',
    fontSize: '15px'
  },
  bulkApproveContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '32px'
  },
  bulkApproveButton: {
    backgroundColor: '#6b46c1',
    color: 'white',
    padding: '16px 32px',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 8px rgba(107, 70, 193, 0.2)',
    minWidth: '160px'
  }
};

// Status badge styles as CSS-in-JS
const statusBadgeStyles = `
  .status-badge {
    display: inline-block;
    padding: 6px 16px;
    border-radius: 24px;
    font-size: 13px;
    font-weight: 600;
    text-align: center;
    min-width: 90px;
    letter-spacing: 0.025em;
  }
  
  .status-completed {
    background-color: #dcfce7;
    color: #166534;
  }
  
  .status-progress {
    background-color: #dbeafe;
    color: #1d4ed8;
  }
  
  .status-rejected {
    background-color: #fee2e2;
    color: #dc2626;
  }
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = statusBadgeStyles;
document.head.appendChild(styleSheet);

export default ReviewTimesheet;
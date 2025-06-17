import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

const WorkTimer = ({ onBack }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setCurrentTime(Date.now() - startTime);
      }, 1000);
    } else if (!isRunning && currentTime !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime, currentTime]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    if (!isRunning) {
      setStartTime(Date.now());
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  };

  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterStatus, setFilterStatus] = useState('all');

  const timerData = [
    {
      id: 1,
      project: 'Project Alpha',
      task: 'Design UI/UX',
      duration: '01:30:00',
      startTime: '09:00 AM',
      endTime: '10:30 AM',
      status: 'Completed',
      priority: 'High',
      employee: 'John Doe'
    },
    {
      id: 2,
      project: 'Project Beta',
      task: 'Develop Backend API',
      duration: '02:00:00',
      startTime: '11:00 AM',
      endTime: '01:00 PM',
      status: 'In Progress',
      priority: 'High',
      employee: 'Jane Smith'
    },
    {
      id: 3,
      project: 'Project Gamma',
      task: 'Test Application',
      duration: '00:45:00',
      startTime: '02:00 PM',
      endTime: '02:45 PM',
      status: 'Pending',
      priority: 'Medium',
      employee: 'Mike Johnson'
    },
    {
      id: 4,
      project: 'Project Delta',
      task: 'Client Sync Meeting',
      duration: '00:30:00',
      startTime: '03:00 PM',
      endTime: '03:30 PM',
      status: 'Completed',
      priority: 'Low',
      employee: 'Sarah Wilson'
    },
    {
      id: 5,
      project: 'Project Omega',
      task: 'Production Deployment',
      duration: '01:00:00',
      startTime: '04:00 PM',
      endTime: '05:00 PM',
      status: 'In Progress',
      priority: 'Critical',
      employee: 'David Brown'
    },
    {
      id: 6,
      project: 'Project Sigma',
      task: 'Code Review',
      duration: '00:20:00',
      startTime: '05:30 PM',
      endTime: '05:50 PM',
      status: 'Pending',
      priority: 'Medium',
      employee: 'Emily Davis'
    }
  ];

  const handleSort = (field) => {
    const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);
  };

  const filteredData = timerData.filter(row => 
    filterStatus === 'all' || row.status.toLowerCase() === filterStatus.toLowerCase()
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = a[sortField];
    const bValue = b[sortField];
    const modifier = sortDirection === 'asc' ? 1 : -1;
    return aValue > bValue ? modifier : aValue < bValue ? -modifier : 0;
  });

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.backSection} onClick={onBack}>
          <ArrowLeft size={20} style={styles.backIcon} />
          <span style={styles.backText}>Back to Timesheets</span>
        </div>
        {/* <h1 style={styles.title}>Work Timer</h1> */}
      </div>

      {/* Content */}
      <div style={styles.content}>
        <div style={styles.liveTrackingCard}>
          <h2 style={styles.cardTitle}>Live Tracking</h2>
          <p style={styles.cardDescription}>
            You can start/stop a timer while working. Each session is saved and visible to the manager.
          </p>
          <hr style={styles.separator} />
          
          <div style={styles.timerSection}>
            {isRunning && (
              <div style={styles.currentTimer}>
                Current Session: {formatTime(currentTime)}
              </div>
            )}
            <button 
              style={isRunning ? {...styles.startButton, ...styles.stopButton} : styles.startButton}
              onClick={handleStartStop}
            >
              {isRunning ? 'Stop Timer' : 'Start Timer'}
            </button>
          </div>
        </div>

        <div style={styles.tableContainer}>
          <div style={styles.tableHeader}>
            <div style={styles.tableTitle}>Timer Log</div>
            <div style={styles.tableControls}>
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                style={styles.filterSelect}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="in progress">In Progress</option>
                <option value="pending">Pending</option>
              </select>
              <button style={styles.addButton}>+ Add Entry</button>
            </div>
          </div>

          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeaderRow}>
                  <th style={styles.sortableTh} onClick={() => handleSort('project')}>
                    <div style={styles.thContent}>
                      Project 
                      <span style={styles.sortIcon}>
                        {sortField === 'project' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}
                      </span>
                    </div>
                  </th>
                  <th style={styles.sortableTh} onClick={() => handleSort('task')}>
                    <div style={styles.thContent}>
                      Task 
                      <span style={styles.sortIcon}>
                        {sortField === 'task' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}
                      </span>
                    </div>
                  </th>
                  <th style={styles.sortableTh} onClick={() => handleSort('employee')}>
                    <div style={styles.thContent}>
                      Employee 
                      <span style={styles.sortIcon}>
                        {sortField === 'employee' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}
                      </span>
                    </div>
                  </th>
                  <th style={styles.sortableTh} onClick={() => handleSort('duration')}>
                    <div style={styles.thContent}>
                      Duration 
                      <span style={styles.sortIcon}>
                        {sortField === 'duration' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}
                      </span>
                    </div>
                  </th>
                  <th style={styles.th}>Priority</th>
                  <th style={styles.th}>Start Time</th>
                  <th style={styles.th}>End Time</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((row, index) => (
                  <tr 
                    key={row.id} 
                    style={index % 2 === 0 ? styles.evenRow : styles.oddRow}
                  >
                    <td style={styles.td}>
                      <div style={styles.projectCell}>
                        <div style={styles.projectName}>{row.project}</div>
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.taskCell}>{row.task}</div>
                    </td>
                    <td style={styles.td}>
                      {row.employee}
                    </td>
                    <td style={styles.td}>
                      <span style={styles.durationBadge}>{row.duration}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.priorityBadge,
                        ...styles[`priority${row.priority}`]
                      }}>
                        {row.priority}
                      </span>
                    </td>
                    <td style={styles.td}>{row.startTime}</td>
                    <td style={styles.td}>{row.endTime}</td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.statusBadge,
                        ...styles[`status${row.status.replace(' ', '')}`]
                      }}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div style={styles.tableFooter}>
            <div style={styles.footerInfo}>
              Showing {sortedData.length} of {timerData.length} entries
            </div>
            <div style={styles.pagination}>
              <button style={styles.pageButton}>← Previous</button>
              <span style={styles.pageInfo}>Page 1 of 1</span>
              <button style={styles.pageButton}>Next →</button>
            </div>
          </div>
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
  liveTrackingCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    marginBottom: '32px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e1e5e9',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '12px',
    marginTop: '0',
  },
  cardDescription: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.5',
    marginBottom: '16px',
  },
  separator: {
    border: 'none',
    borderTop: '1px solid #e1e5e9',
    margin: '16px 0',
  },
  timerSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  currentTimer: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#7c3aed',
    backgroundColor: '#f3f4f6',
    padding: '8px 16px',
    borderRadius: '4px',
    border: '1px solid #e5e7eb',
  },
  startButton: {
    backgroundColor: '#7c3aed',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  stopButton: {
    backgroundColor: '#dc2626',
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e1e5e9',
    overflowX: 'auto',
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px 16px',
    borderBottom: '1px solid #e1e5e9',
  },
  tableTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
  },
  tableControls: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  filterSelect: {
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    backgroundColor: 'white',
    color: '#374151',
  },
  exportButton: {
    padding: '8px 16px',
    border: '1px solid #7c3aed',
    borderRadius: '6px',
    fontSize: '14px',
    backgroundColor: 'white',
    color: '#7c3aed',
    cursor: 'pointer',
    fontWeight: '500',
  },
  addButton: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    backgroundColor: '#7c3aed',
    color: 'white',
    cursor: 'pointer',
    fontWeight: '500',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
  },
  tableHeaderRow: {
    backgroundColor: '#f8f9fa',
  },
  th: {
    padding: '12px 16px',
    textAlign: 'left',
    fontWeight: '600',
    color: '#374151',
    borderBottom: '2px solid #e5e7eb',
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    whiteSpace: 'nowrap',
  },
  sortableTh: {
    padding: '12px 16px',
    textAlign: 'left',
    fontWeight: '600',
    color: '#374151',
    borderBottom: '2px solid #e5e7eb',
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'background-color 0.2s ease',
    whiteSpace: 'nowrap',
  },
  thContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
  },
  sortIcon: {
    fontSize: '12px',
    color: '#9ca3af',
  },
  td: {
    padding: '12px 16px',
    borderBottom: '1px solid #f3f4f6',
    color: '#374151',
    verticalAlign: 'middle',
  },
  evenRow: {
    backgroundColor: 'white',
  },
  oddRow: {
    backgroundColor: '#fafbfc',
  },
  projectCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  projectName: {
    fontWeight: '500',
    color: '#111827',
  },
  taskCell: {
    maxWidth: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  durationBadge: {
    backgroundColor: '#f3f4f6',
    color: '#374151',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500',
    fontFamily: 'monospace',
  },
  priorityBadge: {
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  priorityCritical: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
  },
  priorityHigh: {
    backgroundColor: '#fed7aa',
    color: '#9a3412',
  },
  priorityMedium: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
  },
  priorityLow: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
  },
  statusCompleted: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
  },
  statusInProgress: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
  },
  statusPending: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
  },
  tableFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    borderTop: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb',
  },
  footerInfo: {
    fontSize: '14px',
    color: '#6b7280',
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  pageButton: {
    padding: '6px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    backgroundColor: 'white',
    color: '#374151',
    cursor: 'pointer',
  },
  pageInfo: {
    fontSize: '14px',
    color: '#6b7280',
  },
};

export default WorkTimer;
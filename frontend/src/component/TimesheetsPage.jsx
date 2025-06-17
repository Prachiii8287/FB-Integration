import React, { useState } from 'react';
import { Plus, FileText, Clock } from 'lucide-react';
import ReviewTimesheet from './ReviewTimesheet';
import WorkTimer from './WorkTimer';
import LogTimesheetForm from './LogTimesheetForm';

const TimesheetsPage = () => {
  const [showReviewTimesheet, setShowReviewTimesheet] = useState(false);
  const [showWorkTimer, setShowWorkTimer] = useState(false);
  const [showLogTimeSheet, setShowLogTimeSheet] = useState(false);

  const statsData = [
    { heading: "Total Hours Logged", count: "240" },
    { heading: "Pending Approvals", count: "12" },
    { heading: "Approved Entries", count: "85" },
    { heading: "Rejected Entries", count: "3" }
  ];

  const recentActivities = [
    { name: "Alex", hours: 4, project: "EcoEats", status: "2 days ago" },
    { name: "Priya", hours: 6, project: "HealthKart", status: "Awaiting approval" },
    { name: "Ethan", hours: 8, project: "QuickCart", status: "3 days ago" },
    { name: "Sophia", hours: 7, project: "FinServe", status: "Approved" },
    { name: "Liam", hours: 5, project: "FreshFoods", status: "1 week ago" }
  ];

  const getStatusStyle = (status) => {
    if (status === "Awaiting approval") {
      return { color: "#ff9800" };
    } else if (status === "Approved") {
      return { color: "#4caf50" };
    } else {
      return { color: "#666" };
    }
  };

  const handleReviewTimesheet = () => {
    setShowReviewTimesheet(true);
  };

  const handleBack = () => {
    setShowReviewTimesheet(false);
    setShowLogTimeSheet(false);
  };

  if (showReviewTimesheet) {
    return <ReviewTimesheet onBack={handleBack} />;
  }

  if (showWorkTimer) {
    return <WorkTimer onBack={() => setShowWorkTimer(false)} />;
  }

  if (showLogTimeSheet) {
    return <LogTimesheetForm onBack={handleBack} />;
  }

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <h1 style={styles.title}>Timesheets</h1>
        <div style={styles.buttonGroup}>
          <button 
            onClick={() => setShowLogTimeSheet(true)}
            style={styles.addButton}
          >
            <Plus size={16} style={{ color: 'white', marginRight: '4px' }} />
            TimeSheet Entry
          </button>
          <button 
            onClick={() => setShowReviewTimesheet(true)}
            style={styles.reviewButton}
          >
            <FileText size={16} style={{ color: 'white', marginRight: '4px' }} />
            Review Timesheet
          </button>
          <button 
            onClick={() => setShowWorkTimer(true)}
            style={styles.workTimerButton}
          >
            <Clock size={16} style={{ color: 'white', marginRight: '4px' }} />
            Work Timer
          </button>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div style={styles.statsGrid}>
        {statsData.map((stat, index) => (
          <div key={index} style={styles.statCard}>
            <h3 style={styles.statHeading}>{stat.heading}</h3>
            <div style={styles.statCount}>{stat.count}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div style={styles.activitySection}>
        <h2 style={styles.sectionTitle}>Recent Activity</h2>
        <div style={styles.activityList}>
          {recentActivities.map((activity, index) => (
            <div key={index} style={styles.activityItem}>
              <div style={styles.activityMain}>
                <span style={styles.activityName}>{activity.name}</span>
                <span style={styles.activityText}> logged </span>
                <span style={styles.activityHours}>{activity.hours} hrs</span>
                <span style={styles.activityText}> on </span>
                <span style={styles.activityProject}>{activity.project}</span>
              </div>
              <div style={{...styles.activityStatus, ...getStatusStyle(activity.status)}}>
                {activity.status}
              </div>
            </div>
          ))}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px'
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#333'
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  },
  addButton: {
    backgroundColor: '#7b2cbf',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    '&:hover': {
      backgroundColor: '#6a1b9a'
    }
  },
  reviewButton: {
    backgroundColor: '#7b2cbf',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    '&:hover': {
      backgroundColor: '#6a1b9a'
    }
  },
  workTimerButton: {
    backgroundColor: '#7b2cbf',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    '&:hover': {
      backgroundColor: '#6a1b9a'
    }
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  },
  statCard: {
    backgroundColor: '#7b2cbf',
    border: '2px solid #7b2cbf',
    borderRadius: '12px',
    padding: '24px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(123, 44, 191, 0.2)'
  },
  statHeading: {
    fontSize: '16px',
    fontWeight: '700',
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    margin: '0 0 16px 0'
  },
  statCount: {
    fontSize: '36px',
    fontWeight: '700',
    color: 'white',
    margin: '0'
  },
  activitySection: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e0e0e0'
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#333',
    margin: '0 0 24px 0',
    textAlign: 'left'
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  activityItem: {
    padding: '16px',
    backgroundColor: '#fafafa',
    borderRadius: '8px',
    border: '1px solid #e8e8e8',
    transition: 'all 0.2s ease'
  },
  activityMain: {
    fontSize: '15px',
    marginBottom: '6px',
    lineHeight: '1.4'
  },
  activityName: {
    fontWeight: '600',
    color: '#333'
  },
  activityText: {
    color: '#666'
  },
  activityHours: {
    fontWeight: '600',
    color: '#7b2cbf'
  },
  activityProject: {
    fontWeight: '600',
    color: '#333'
  },
  activityStatus: {
    fontSize: '13px',
    fontWeight: '500'
  }
};

export default TimesheetsPage;
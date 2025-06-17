import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ChevronRight, Edit } from 'lucide-react';

const ProjectDetailsPage = ({ project, onBack }) => {
  const [activeTab, setActiveTab] = useState('tasks');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projectData = {
    name: "EcoEats",
    description: "EcoEats is a project focused on developing a sustainable food delivery service that partners with local, organic farms and restaurants to provide healthy, eco-friendly meal options to consumers.",
    teamMembers: ["Alex Chen", "Sarah Lee", "David Kim"],
    client: "Green Earth Initiative",
    budget: "$50,000",
    progress: 50
  };

  const tasksData = [
    {
      taskName: "Market Research Analysis",
      status: "Completed",
      assignee: "Alex Chen",
      dueDate: "2024-06-15"
    },
    {
      taskName: "Partner Restaurant Outreach",
      status: "In Progress",
      assignee: "Sarah Lee",
      dueDate: "2024-06-20"
    },
    {
      taskName: "Mobile App Wireframes",
      status: "Planning",
      assignee: "David Kim",
      dueDate: "2024-06-25"
    }
  ];

  const handleCalendarClick = () => {
    console.log('Opening Calendar page...');
  };

  const handleTimesheetClick = () => {
    console.log('Opening Timesheet page...');
  };

  const handleEditProject = () => {
    console.log('Opening Edit Project page...');
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'status-completed';
      case 'In Progress':
        return 'status-in-progress';
      case 'Planning':
        return 'status-planning';
      default:
        return '';
    }
  };

  return (
    <div className="project-details">
      <style jsx>{`
        .project-details {
          background-color: #ffffff;
          min-height: 100vh;
          font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
          color: #333333;
          line-height: 1.5;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px;
        }

        /* Top Breadcrumb Bar */
        .breadcrumb-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          margin-bottom: 32px;
          border-bottom: 1px solid #e5e5e5;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #666666;
        }

        .breadcrumb-link {
          color: #666666;
          text-decoration: none;
        }

        .breadcrumb-current {
          color: #7b2cbf;
          font-weight: 600;
        }

        .breadcrumb-separator {
          margin: 0 8px;
          color: #999999;
        }

        .breadcrumb-buttons {
          display: flex;
          gap: 12px;
        }

        .breadcrumb-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background-color: #7b2cbf;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          box-shadow: 0 2px 4px rgba(123, 44, 191, 0.2);
        }

        /* Main Heading & Description */
        .main-header {
          margin-bottom: 32px;
        }

        .project-title {
          font-size: 48px;
          font-weight: 700;
          color: #7b2cbf;
          margin-bottom: 16px;
          line-height: 1.2;
        }

        .project-description {
          font-size: 16px;
          color: #555555;
          font-style: italic;
          line-height: 1.6;
          max-width: 900px;
        }

        /* Project Info Section */
        .project-info {
          background-color: #f8f8f8;
          border: 1px solid #eeeeee;
          border-radius: 8px;
          padding: 24px;
          margin-bottom: 32px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .info-label {
          font-size: 12px;
          font-weight: 700;
          color: #7b2cbf;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .info-value {
          font-size: 16px;
          color: #333333;
          font-weight: 500;
        }

        /* Project Progress Bar */
        .progress-section {
          margin-bottom: 32px;
        }

        .progress-title {
          font-size: 18px;
          font-weight: 600;
          color: #333333;
          margin-bottom: 16px;
        }

        .progress-bar-container {
          width: 100%;
          height: 16px;
          background-color: #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 12px;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #7b2cbf 0%, #9c4dcc 100%);
          border-radius: 8px;
          transition: width 0.4s ease;
        }

        .progress-percentage {
          font-size: 14px;
          font-weight: 600;
          color: #7b2cbf;
          text-align: left;
        }

        /* Tabbed View */
        .tabs-container {
          background-color: #ffffff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          margin-bottom: 32px;
        }

        .tab-headers {
          display: flex;
          background-color: #f5f5f5;
          border-bottom: 1px solid #e0e0e0;
          border-radius: 8px 8px 0 0;
        }

        .tab-header {
          flex: 1;
          padding: 16px 24px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          color: #666666;
          border-bottom: 3px solid transparent;
        }

        .tab-header.active {
          color: #7b2cbf;
          background-color: #ffffff;
          border-bottom-color: #7b2cbf;
        }

        .tab-content {
          padding: 24px;
          min-height: 300px;
        }

        /* Tasks Table */
        .tasks-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        .tasks-table th {
          text-align: left;
          padding: 12px 16px;
          background-color: #f8f8f8;
          border-bottom: 2px solid #e0e0e0;
          font-weight: 600;
          color: #333333;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .tasks-table td {
          padding: 12px 16px;
          border-bottom: 1px solid #f0f0f0;
          vertical-align: middle;
        }

        .tasks-table tbody tr:hover {
          background-color: #f9f9f9;
        }

        .tasks-table tbody tr:last-child td {
          border-bottom: none;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 11px;
          font-weight: 600;
          text-align: center;
          display: inline-block;
          min-width: 80px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .status-completed {
          background-color: #e8f5e8;
          color: #2e7d32;
          border: 1px solid #c8e6c9;
        }

        .status-in-progress {
          background-color: #fff3e0;
          color: #f57c00;
          border: 1px solid #ffcc02;
        }

        .status-planning {
          background-color: #e3f2fd;
          color: #1976d2;
          border: 1px solid #90caf9;
        }

        /* Resources Placeholder */
        .resources-placeholder {
          text-align: center;
          padding: 60px 20px;
          color: #999999;
          font-style: italic;
          font-size: 16px;
        }

        /* Bottom Section */
        .bottom-section {
          display: flex;
          justify-content: center;
          padding: 32px 0;
          border-top: 1px solid #e5e5e5;
        }

        .edit-project-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 32px;
          background-color: #7b2cbf;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(123, 44, 191, 0.25);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .container {
            padding: 16px;
          }

          .breadcrumb-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .breadcrumb-buttons {
            width: 100%;
            justify-content: flex-start;
          }

          .project-title {
            font-size: 36px;
          }

          .info-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .tab-headers {
            flex-direction: column;
          }

          .tab-header {
            border-bottom: 1px solid #e0e0e0;
            border-radius: 0;
          }

          .tab-header.active {
            border-bottom: 1px solid #e0e0e0;
            border-left: 3px solid #7b2cbf;
          }

          .tasks-table {
            font-size: 12px;
          }

          .tasks-table th,
          .tasks-table td {
            padding: 8px 12px;
          }

          .tab-content {
            padding: 16px;
          }
        }

        @media (max-width: 480px) {
          .project-title {
            font-size: 28px;
          }

          .breadcrumb-buttons {
            flex-direction: column;
            width: 100%;
          }

          .breadcrumb-btn {
            justify-content: center;
          }

          .edit-project-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <div className="container">
        {/* Top Breadcrumb Bar */}
        <div className="breadcrumb-bar">
          <div className="breadcrumb">
            <a href="#" className="breadcrumb-link">Projects</a>
            <ChevronRight size={16} className="breadcrumb-separator" />
            <span className="breadcrumb-current">{projectData.name}</span>
          </div>
          <div className="breadcrumb-buttons">
            <button className="breadcrumb-btn" onClick={handleCalendarClick}>
              <Calendar size={16} />
              Calendar
            </button>
            <button className="breadcrumb-btn" onClick={handleTimesheetClick}>
              <Clock size={16} />
              Timesheet
            </button>
          </div>
        </div>

        {/* Main Heading & Description */}
        <div className="main-header">
          <h1 className="project-title">{projectData.name}</h1>
          <p className="project-description">{projectData.description}</p>
        </div>

        {/* Project Info Section */}
        <div className="project-info">
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Team Members</span>
              <span className="info-value">{projectData.teamMembers.join(', ')}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Client</span>
              <span className="info-value">{projectData.client}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Budget</span>
              <span className="info-value">{projectData.budget}</span>
            </div>
          </div>
        </div>

        {/* Project Progress Bar */}
        <div className="progress-section">
          <h3 className="progress-title">Project Progress</h3>
          <div className="progress-bar-container">
            <div 
              className="progress-bar" 
              style={{ width: `${projectData.progress}%` }}
            ></div>
          </div>
          <div className="progress-percentage">{projectData.progress}% Complete</div>
        </div>

        {/* Tabbed View */}
        <div className="tabs-container">
          <div className="tab-headers">
            <button 
              className={`tab-header ${activeTab === 'tasks' ? 'active' : ''}`}
              onClick={() => setActiveTab('tasks')}
            >
              Tasks
            </button>
            <button 
              className={`tab-header ${activeTab === 'resources' ? 'active' : ''}`}
              onClick={() => setActiveTab('resources')}
            >
              Resources
            </button>
          </div>
          
          <div className="tab-content">
            {activeTab === 'tasks' && (
              <table className="tasks-table">
                <thead>
                  <tr>
                    <th>Task Name</th>
                    <th>Status</th>
                    <th>Assignee</th>
                    <th>Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {tasksData.map((task, index) => (
                    <tr key={index}>
                      <td>{task.taskName}</td>
                      <td>
                        <span className={`status-badge ${getStatusClass(task.status)}`}>
                          {task.status}
                        </span>
                      </td>
                      <td>{task.assignee}</td>
                      <td>{task.dueDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            
            {activeTab === 'resources' && (
              <div className="resources-placeholder">
                Resources section - Content coming soon
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bottom-section">
          <button className="edit-project-btn" onClick={handleEditProject}>
            <Edit size={16} />
            Edit Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
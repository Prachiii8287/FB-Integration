import React, { useState } from 'react';
import ProjectDetailsPage from './ProjectDetailsPage';

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      name: 'EcoEats Platform',
      status: 'In Progress',
      manager: 'Sarah Williams',
      startDate: '2024-03-15',
      endDate: '2024-07-30',
      progress: 65,
      priority: 'High'
    },
    {
      name: 'Digital Transformation',
      status: 'Planning',
      manager: 'Michael Johnson',
      startDate: '2024-06-01',
      endDate: '2024-12-15',
      progress: 15,
      priority: 'Medium'
    },
    {
      name: 'Customer Portal',
      status: 'Completed',
      manager: 'Elena Rodriguez',
      startDate: '2024-01-10',
      endDate: '2024-05-20',
      progress: 100,
      priority: 'Low'
    },
    {
      name: 'Supply Chain Optimization',
      status: 'In Progress',
      manager: 'David Kim',
      startDate: '2024-04-01',
      endDate: '2024-09-30',
      progress: 42,
      priority: 'High'
    },
    {
      name: 'Mobile App Development',
      status: 'In Progress',
      manager: 'Lisa Thompson',
      startDate: '2024-02-20',
      endDate: '2024-08-15',
      progress: 78,
      priority: 'Medium'
    }
  ];

  const recentUpdates = [
    {
      title: "Project 'EcoEats' is now in the 'In Progress' stage.",
      timeAgo: '2 days ago',
      updatedBy: 'Alex Chen'
    },
    {
      title: "Project 'Digital Transformation' budget has been approved.",
      timeAgo: '4 days ago',
      updatedBy: 'Maria Santos'
    },
    {
      title: "Project 'Customer Portal' has been completed successfully.",
      timeAgo: '1 week ago',
      updatedBy: 'John Miller'
    }
  ];

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  const handleViewProject = (project) => {
    setSelectedProject(project);
  };

  const handleBack = () => {
    setSelectedProject(null);
  };

  if (selectedProject) {
    return <ProjectDetailsPage project={selectedProject} onBack={handleBack} />;
  }

  return (
    <div className="projects-page">
      {/* Header */}
      {/* <header className="page-header">
        <h1>Projects</h1>
      </header> */}

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Projects</h3>
            <div className="stat-number">24</div>
          </div>
          <div className="stat-card">
            <h3>In Progress</h3>
            <div className="stat-number">12</div>
          </div>
          <div className="stat-card">
            <h3>Completed</h3>
            <div className="stat-number">8</div>
          </div>
          <div className="stat-card">
            <h3>Overdue</h3>
            <div className="stat-number">4</div>
          </div>
        </div>
      </section>

      {/* Recent Project Updates */}
      <section className="recent-updates">
        <h2>Recent Project Updates</h2>
        <div className="updates-list">
          {recentUpdates.map((update, index) => (
            <div key={index} className="update-item">
              <div className="update-icon">📄</div>
              <div className="update-content">
                <div className="update-title">{update.title}</div>
                <div className="update-meta">
                  <span>{update.timeAgo}</span>
                  <span>Updated by {update.updatedBy}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All Projects */}
      <section className="all-projects">
        <h2>All Projects</h2>
        <div className="search-container">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        <div className="table-container">
          <table className="projects-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Status</th>
                <th>Manager Name</th>
                <th>Start/End Date</th>
                <th>Progress</th>
                <th>Priority</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project, index) => (
                <tr key={index}>
                  <td className="project-name">{project.name}</td>
                  <td>
                    <span className={`status status-${project.status.toLowerCase().replace(' ', '-')}`}>
                      {project.status}
                    </span>
                  </td>
                  <td>{project.manager}</td>
                  <td className="date-range">
                    {project.startDate} - {project.endDate}
                  </td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">{project.progress}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={`priority ${getPriorityClass(project.priority)}`}>
                      {project.priority}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="view-button"
                      onClick={() => handleViewProject(project)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <style jsx>{`
        .projects-page {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f8f9fa;
          min-height: 100vh;
          padding: 0;
          margin: 0;
        }

        .page-header {
          background-color: #ffffff;
          padding: 24px 32px;
          border-bottom: 1px solid #e0e0e0;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .page-header h1 {
          margin: 0;
          color: #6b46c1;
          font-size: 28px;
          font-weight: 600;
        }

        .stats-section {
          background-color: #f3f0ff;
          padding:20px;
        }

        .stats-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .stat-card {
          background-color: #6b46c1;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
          border-left: 4px solid #553c9a;
        }

        .stat-card h3 {
          margin: 0 0 12px 0;
          color: #ffffff;
          font-size: 18px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stat-number {
          font-size: 24px;
          font-weight: 500;
          color: #ffffff;
          margin: 0;
        }

        .recent-updates {
          background-color: #ffffff;
          margin: 24px 32px;
          padding: 32px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .recent-updates h2 {
          margin: 0 0 24px 0;
          color: #6b46c1;
          font-size: 20px;
          font-weight: 600;
        }

        .updates-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .update-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 16px;
          background-color: #f8f9fa;
          border-radius: 6px;
          border-left: 3px solid #6b46c1;
        }

        .update-icon {
          font-size: 20px;
          flex-shrink: 0;
        }

        .update-content {
          flex: 1;
        }

        .update-title {
          color: #1f2937;
          font-weight: 500;
          margin-bottom: 8px;
          line-height: 1.4;
        }

        .update-meta {
          display: flex;
          gap: 16px;
          font-size: 12px;
          color: #6b7280;
        }

        .all-projects {
          background-color: #ffffff;
          margin: 24px 32px;
          padding: 32px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .all-projects h2 {
          margin: 0 0 24px 0;
          color: #6b46c1;
          font-size: 20px;
          font-weight: 600;
        }

        .search-container {
          margin-bottom: 24px;
        }

        .search-wrapper {
          position: relative;
          width: 100%;
          max-width: 400px;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7280;
          font-size: 16px;
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 12px 16px 12px 48px;
          border: 2px solid #e5e7eb;
          border-radius: 6px;
          font-size: 14px;
          transition: border-color 0.2s;
        }

        .search-input:focus {
          outline: none;
          border-color: #6b46c1;
        }

        .table-container {
          overflow-x: auto;
        }

        .projects-table {
          width: 100%;
          border-collapse: collapse;
          background-color: #ffffff;
        }

        .projects-table th {
          background-color: #f8f9fa;
          padding: 16px 12px;
          text-align: left;
          font-weight: 600;
          color: #6b46c1;
          border-bottom: 2px solid #e5e7eb;
          font-size: 14px;
        }

        .projects-table td {
          padding: 16px 12px;
          border-bottom: 1px solid #f3f4f6;
          vertical-align: middle;
        }

        .projects-table tr:hover {
          background-color: #f8f9fa;
        }

        .project-name {
          font-weight: 500;
          color: #1f2937;
        }

        .status {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-in-progress {
          background-color: #dbeafe;
          color: #1e40af;
        }

        .status-planning {
          background-color: #fef3c7;
          color: #d97706;
        }

        .status-completed {
          background-color: #d1fae5;
          color: #059669;
        }

        .date-range {
          font-size: 13px;
          color: #6b7280;
        }

        .progress-container {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 120px;
        }

        .progress-bar {
          flex: 1;
          height: 8px;
          background-color: #e5e7eb;
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background-color: #6b46c1;
          transition: width 0.3s ease;
        }

        .progress-text {
          font-size: 12px;
          font-weight: 500;
          color: #6b7280;
          min-width: 35px;
        }

        .priority {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .priority-high {
          background-color: #fee2e2;
          color: #dc2626;
        }

        .priority-medium {
          background-color: #fef3c7;
          color: #d97706;
        }

        .priority-low {
          background-color: #d1fae5;
          color: #059669;
        }

        .view-button {
          background-color: #6b46c1;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .view-button:hover {
          background-color: #553c9a;
        }

        @media (max-width: 768px) {
          .projects-page {
            padding: 0;
          }

          .page-header {
            padding: 16px 20px;
          }

          .stats-section {
            padding: 20px;
          }

          .stats-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }

          .recent-updates,
          .all-projects {
            margin: 16px 20px;
            padding: 20px;
          }

          .projects-table {
            font-size: 14px;
          }

          .projects-table th,
          .projects-table td {
            padding: 12px 8px;
          }
        }

        @media (max-width: 480px) {
          .stats-container {
            grid-template-columns: 1fr;
          }

          .update-meta {
            flex-direction: column;
            gap: 4px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectsPage;
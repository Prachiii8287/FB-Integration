import React, { useState } from 'react';
import { Calendar, ArrowLeft } from 'lucide-react';

const LogTimesheetForm = ({ onBack }) => {
  const [formData, setFormData] = useState({
    date: '',
    project: '',
    taskDescription: '',
    hoursWorked: '',
    status: 'Pending'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Timesheet submitted successfully!');
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.backSection} onClick={onBack}>
          <ArrowLeft size={20} style={styles.backIcon} />
          <span style={styles.backText}>Back to Timesheets</span>
        </div>
        <h1 style={styles.title}>Log Timesheet</h1>
      </div>

      {/* Content */}
      <div style={styles.content}>
        <div style={styles.formWrapper}>
          <div style={styles.form}>
            {/* Date Field */}
            <div style={styles.fieldGroup}>
              <label style={styles.label} htmlFor="date">Date</label>
              <div style={styles.inputWrapper}>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  style={styles.dateInput}
                  required
                />
                <Calendar style={styles.calendarIcon} size={18} />
              </div>
            </div>

            {/* Project Field */}
            <div style={styles.fieldGroup}>
              <label style={styles.label} htmlFor="project">Project</label>
              <select
                id="project"
                name="project"
                value={formData.project}
                onChange={handleInputChange}
                style={styles.select}
                required
              >
                <option value="">Select a project</option>
                <option value="Project Alpha">Project Alpha</option>
                <option value="Project Beta">Project Beta</option>
                <option value="Project Gamma">Project Gamma</option>
                <option value="Project Delta">Project Delta</option>
                <option value="Project Omega">Project Omega</option>
              </select>
            </div>

            {/* Task Description Field */}
            <div style={styles.fieldGroup}>
              <label style={styles.label} htmlFor="taskDescription">Task Description</label>
              <textarea
                id="taskDescription"
                name="taskDescription"
                value={formData.taskDescription}
                onChange={handleInputChange}
                placeholder="Describe the task you worked on"
                style={styles.textarea}
                rows={4}
                required
              />
            </div>

            {/* Hours Worked Field */}
            <div style={styles.fieldGroup}>
              <label style={styles.label} htmlFor="hoursWorked">Hours Worked</label>
              <input
                type="number"
                id="hoursWorked"
                name="hoursWorked"
                value={formData.hoursWorked}
                onChange={handleInputChange}
                placeholder="Enter hours"
                style={styles.input}
                step="0.5"
                min="0"
                max="24"
                required
              />
            </div>

            {/* Status Field */}
            <div style={styles.fieldGroup}>
              <label style={styles.label} htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                style={styles.select}
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
              </select>
            </div>

            {/* Submit Button */}
            <button type="button" onClick={handleSubmit} style={styles.submitButton}>
              Submit
            </button>
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
  formWrapper: {
    maxWidth: '1000px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    padding: '40px 60px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  label: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#34495e',
    marginBottom: '8px'
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    width: '100%',
    padding: '16px 20px',
    border: '2px solid #e8e9f3',
    borderRadius: '8px',
    fontSize: '16px',
    backgroundColor: '#fafbff',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    outline: 'none',
    boxSizing: 'border-box'
  },
  dateInput: {
    width: '100%',
    padding: '16px 20px',
    paddingRight: '50px',
    border: '2px solid #e8e9f3',
    borderRadius: '8px',
    fontSize: '16px',
    backgroundColor: '#fafbff',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    outline: 'none',
    boxSizing: 'border-box'
  },
  calendarIcon: {
    position: 'absolute',
    right: '16px',
    color: '#8b5cf6',
    pointerEvents: 'none'
  },
  select: {
    width: '100%',
    padding: '16px 20px',
    border: '2px solid #e8e9f3',
    borderRadius: '8px',
    fontSize: '16px',
    backgroundColor: '#fafbff',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    outline: 'none',
    cursor: 'pointer',
    boxSizing: 'border-box'
  },
  textarea: {
    width: '100%',
    padding: '16px 20px',
    border: '2px solid #e8e9f3',
    borderRadius: '8px',
    fontSize: '16px',
    backgroundColor: '#fafbff',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    lineHeight: '1.5'
  },
  submitButton: {
    backgroundColor: '#8b5cf6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '18px 40px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, transform 0.1s ease',
    alignSelf: 'flex-start',
    marginTop: '20px'
  }
};

// Add hover effects via CSS-in-JS
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  input:focus, select:focus, textarea:focus {
    border-color: #8b5cf6 !important;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1) !important;
  }
  
  button:hover {
    background-color: #7c3aed !important;
    transform: translateY(-1px);
  }
  
  button:active {
    transform: translateY(0);
  }
`;
document.head.appendChild(styleSheet);

export default LogTimesheetForm;
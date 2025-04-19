// components/EmptyState.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EmptyState.css'; // Create this CSS file

const EmptyState = () => {
  const navigate = useNavigate();

  const handleCreateProject = () => {
    navigate('/addproject');
  };

  return (
    <div className="empty-state-container">
      <img 
        src="Empty State.svg" 
        alt="No projects" 
        className="empty-state-illustration" 
      />
      <p className="empty-state-text">You don't have any active project ongoing</p>
      <button 
        className="empty-state-button"
        onClick={handleCreateProject}
      >
        Create Project
      </button>
    </div>
  );
};

export default EmptyState;
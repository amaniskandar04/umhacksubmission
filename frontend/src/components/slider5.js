import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./slider5.css";
import axios from "axios";

const CardGrid = () => {
  const [projects, setProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8); // Initial number of cards to show
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          "http://127.0.0.1:8000/api/waqf/RetrievedCompletedProject/" 
        );
        setProjects(response.data.projects);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight ||
      loading ||
      !hasMore
    ) {
      return;
    }
    setVisibleCount((prevCount) => prevCount + 4); // Load 4 more cards
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Check if we've reached the end of projects
  useEffect(() => {
    if (projects.length > 0 && visibleCount >= projects.length) {
      setHasMore(false);
    }
  }, [visibleCount, projects.length]);

  const isProjectCompleted = (project) => {
    return (
      parseFloat(project.CurrentAmount) >= parseFloat(project.NeededAmount) ||
      project.Status === "Completed"
    );
  };

  if (loading && projects.length === 0) {
    return <div className="loading">Loading projects...</div>;
  }

  return (
    <div className="grid-container">
      <div className="card-grid">
        {projects.slice(0, visibleCount).map((item) => {
          const completed = isProjectCompleted(item);
          const progressPercent = Math.min(
            (parseFloat(item.CurrentAmount) / parseFloat(item.NeededAmount)) * 100,
            100
          );

          return (
            <div key={item.id} className={`grid-card ${completed ? "completed" : ""}`}>
              {completed && <div className="completed-badge">Completed</div>}
              
              <img
                src={item.ProjectPicBanner || "/default-project.jpg"}
                alt={item.Title}
                className="grid-image"
                onError={(e) => {
                  e.target.src = "/default-project.jpg";
                }}
              />
              
              <div className="progress-container">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="progress-text">
                  RM {item.CurrentAmount} / RM {item.NeededAmount} collected
                  {completed && " - Target Reached!"}
                </p>
              </div>
              
              <h3>{item.Title}</h3>
              <p className="grid-description">
                {item.Description.length > 100
                  ? `${item.Description.substring(0, 100)}...`
                  : item.Description}
              </p>
              
              <button
                onClick={() => navigate(`/projectpage/${item.id}`)}
                className="view-button"
              >
                View Project
              </button>
            </div>
          );
        })}
      </div>
      
      {loading && <div className="loading">Loading more projects...</div>}
      {!hasMore && projects.length > 0 && (
        <div className="end-message">No more projects to load</div>
      )}
    </div>
  );
};

export default CardGrid;
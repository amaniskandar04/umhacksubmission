import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./slider4.css";

const CardGrid = () => {
  const [projects, setProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fetch both ongoing and completed projects
        const ongoingResponse = await axios.post(
          "http://127.0.0.1:8000/api/waqf/RetrievedOngoingProject/"
        );
        const completedResponse = await axios.post(
          "http://127.0.0.1:8000/api/waqf/RetrievedCompletedProject/" // Assuming this endpoint exists
        );
        
        // Combine both lists
        const allProjects = [
          ...ongoingResponse.data.projects,
          ...completedResponse.data.projects
        ];
        
        setProjects(allProjects);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  // Handle scroll to load more
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200
      ) {
        setVisibleCount(prev => prev + 6);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isProjectCompleted = (project) => {
    return (
      parseFloat(project.CurrentAmount) >= parseFloat(project.NeededAmount) ||
      project.Status === "Completed"
    );
  };

  const handleProjectClick = (id) => {
    navigate(`/projectpage/${id}`);
  };

  return (
    <div className="grid-container">
      <div className="card-grid">
        {projects.slice(0, visibleCount).map((item) => {
          const completed = isProjectCompleted(item);
          
          return (
            <div key={item.id} className={`grid-card ${completed ? "completed" : ""}`}>
              {completed && <div className="completed-badge">Completed</div>}
              <img
                src={item.ProjectPicBanner}
                alt={item.Title}
                className="grid-image"
              />
              <div className="progress-bar">
                <div
                  className={`progress-fill ${completed ? "completed" : ""}`}
                  style={{
                    width: `${
                      (parseFloat(item.CurrentAmount) /
                      parseFloat(item.NeededAmount)) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
              <p className="smallText">
                RM {item.CurrentAmount} / {item.NeededAmount} collected!
                {completed && " (Completed)"}
              </p>
              <h3>{item.Title}</h3>
              <p className="grid-description">{item.Description}</p>
              <button 
                onClick={() => handleProjectClick(item.id)}
                className={completed ? "view-button" : "donate-button"}
              >
                {completed ? "View Project" : "Donate Now!"}
              </button>
            </div>
          );
        })}
      </div>
      {visibleCount < projects.length && (
        <div className="load-more-text">Scroll down to load more projects...</div>
      )}
    </div>
  );
};

export default CardGrid;
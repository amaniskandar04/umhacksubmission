import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // ✅ to get the ID
import axios from 'axios';
import './projectpage.css';

const galleryItems = [
  { imageUrl: 'images/masjid.jpg', alt: 'Progress 1', description: 'Foundation laying process at initial stage.' },
  { imageUrl: 'images/masjid.jpg', alt: 'Progress 2', description: 'Concrete walls erected for main prayer hall.' },
  { imageUrl: 'images/masjid.jpg', alt: 'Progress 3', description: 'Roofing installation completed successfully.' },
  // Add more as needed
];

const Projectpage = () => {
  const { id } = useParams(); // ✅ get project ID from URL
  const [project, setProject] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleActive = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/waqf/GetProjectById/${id}/`)
      .then((res) => {
        setProject(res.data.project);
      })
      .catch((err) => {
        console.error('Error fetching project:', err);
      });
  }, [id]);

  if (!project) {
    return <div>Loading project details...</div>;
  }

  return (
    <>
      <div className="banner">
        <img src={project.ProjectPicBanner} alt="Banner" className="banner-image" />
        <div className="image-gradient"></div>
        <div className="image-overlay">
          <h1>{project.Title}</h1>
          <p>Empowering communities through consistent and meaningful giving.</p>
          <button>Get Started</button>
        </div>
      </div>

      <div className="project-container">
        <div className="project-text">
          <h2>Project Details</h2>
          <p>{project.Description}</p>
        </div>
        <img
          src={project.ProjectPicBanner}
          alt={project.Title}
          className="project-image"
        />
      </div>

      <h2 className="project-progression-gallery">Project Progression Gallery</h2>
      <div className="gallery">
        {galleryItems.map((item, index) => (
          <div
            key={index}
            className={`gallery-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleActive(index)}
          >
            <img src={item.imageUrl} alt={item.alt} />
            <div className="gallery-text">
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Projectpage;

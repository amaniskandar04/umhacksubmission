import React, { useState } from 'react';

import './projectpage.css';



const galleryItems = [
    { imageUrl: 'images/masjid.jpg', alt: 'Progress 1', description: 'Foundation laying process at initial stage.' },
    { imageUrl: 'images/masjid.jpg', alt: 'Progress 2', description: 'Concrete walls erected for main prayer hall.' },
    { imageUrl: 'images/masjid.jpg', alt: 'Progress 3', description: 'Roofing installation completed successfully.' },
    // Add more as needed
  ];
  
  const Projectpage = () => {
    const [activeIndex, setActiveIndex] = useState(null);
  
    const toggleActive = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };
  


    return (
        <>
            <h1>Masjid Putra Expansion Project</h1>
            <div className="project-container">
                <div className="project-text">
                    <h2>Project Details</h2>
                    <p>
                    The proposed expansion of Masjid Putra aims to increase its accommodation
                    capacity from 15,000 to 25,000 individuals
                    </p>
                </div>
                <img
                    src="images/masjid.jpg"
                    alt="The proposed expansion of Masjid Putra"
                    className="project-image"
                />
            </div>
            <h2>Project Progression Gallery</h2>
            <div className="gallery">
                {galleryItems.map((item, index) => (
                    <div key={index} className={`gallery-item ${activeIndex === index ? 'active' : ''}`} onClick={() => toggleActive(index)}>
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
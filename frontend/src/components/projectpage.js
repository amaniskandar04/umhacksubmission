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
            <div className="banner">
                <img src="images/masjid2.jpg" alt="Banner" className="banner-image" />
                <div className="image-gradient"></div>
                <div className="image-overlay">
                    <h1>Welcome to Easy2Wakaf</h1>
                    <p>Empowering communities through consistent and meaningful giving.</p>
                    <button>Get Started</button>
                </div>
            </div>
            <div className="project-container">
                <div className="project-text">
                    <h2>Project Details</h2>
                    <p>
                        "The proposed expansion of Masjid Putra is a significant and visionary project aimed at enhancing the mosque's ability to accommodate a growing congregation. Currently capable of hosting 15,000 individuals, the mosque's expansion seeks to increase this capacity to 25,000, ensuring that it can serve the needs of the community, especially during peak times such as Ramadan and major religious events.

                        The expansion will not only focus on increasing seating and prayer spaces but will also include the construction of additional facilities such as improved ablution areas, dedicated spaces for educational activities, and enhanced accessibility for the disabled. Furthermore, the design of the new facilities will incorporate modern architectural elements while preserving the mosque's rich cultural heritage and Islamic identity.

                        This expansion is a response to the increasing number of worshippers and the growing demand for more space, making it a crucial step towards ensuring that Masjid Putra remains a central hub for religious, educational, and community activities in the region. It will contribute to fostering a more inclusive and accessible environment for worshippers of all ages and backgrounds, allowing them to experience a heightened sense of spiritual connection."
                    </p>
                </div>
                <img
                    src="images/masjid.jpg"
                    alt="The proposed expansion of Masjid Putra"
                    className="project-image"
                />
            </div>
            <h2 className = "project-progression-gallery">Project Progression Gallery</h2>
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
import React, { useState } from 'react';
import './ProfilePage.css';
import CardSlider from './Slider1';
import EmptyState from './EmptyState';
import { MoreHorizontal } from 'lucide-react';
import CardGrid from './slider4';

const ProfileHeader = ({ activeTab, setActiveTab }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [hasCreatedProjects, setHasCreatedProjects] = useState(false);

  const [boxes, setBoxes] = useState([
    { title: 'Project Donated To', data: '12' },
    { title: 'Project Created', data: '3' },
    { title: 'Total Amount', data: '$1500' },
  ]);

  const [menuOpenIndex, setMenuOpenIndex] = useState(null);

  const categories = [
    'Project Donated To',
    'Project Created',
    'Total Amount',
    'Ongoing Projects',
    'Total Amount Donated',
  ];

  const handleProfileImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCoverImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCategoryChange = (index, newTitle) => {
    const updatedBoxes = [...boxes];
    updatedBoxes[index].title = newTitle;
    updatedBoxes[index].data = 'N/A';
    setBoxes(updatedBoxes);
    setMenuOpenIndex(null);
  };

  const toggleMenu = (index) => {
    setMenuOpenIndex(menuOpenIndex === index ? null : index);
  };

  return (
    <div className="profile-header">
      {/* Cover Image */}
      <div
        className="cover-image"
        style={{
          backgroundImage: `url(${coverImage || "https://via.placeholder.com/1120x250"})`,
        }}
      >
        <label className="change-cover">
          Change Cover
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverImageChange}
          />
        </label>
      </div>

      {/* Profile Content */}
      <div className="profile-content-wrapper">
        <div className="profile-image-wrapper">
          <img
            src={profileImage || "https://via.placeholder.com/150"}
            alt="Profile"
            className="profile-image"
          />
          <label className="change-profile">
            Change
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
            />
          </label>
        </div>

        <div className="profile-user-info">
          <h2 className="user-name">John Doe</h2>
          <p className="user-role">Creator | Donor | Change-Maker</p>
        </div>
      </div>

      {/* Subtabs */}
      <div className="subtab-wrapper">
        <div className="subtab-container">
          <ul className="subtabs">
            {["Overview", "Project Donated", "Project Created", "Total Amount Collected", "Total Amount Donated"].map((tab) => (
              <li key={tab}>
                <button
                  className={`subtab-item ${activeTab === tab ? "active-subtab" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Overview boxes — only in Overview Tab */}
      {activeTab === "Overview" && (
        <div className="overview-boxes-wrapper">
          {boxes.map((box, index) => (
            <div className="overview-box" key={index}>
              <div className="overview-box-header">
                <span>{box.title}</span>
                <button
                  className="kebab-icon-btn"
                  onClick={() => toggleMenu(index)}
                >
                  <MoreHorizontal size={20} />
                </button>
                {menuOpenIndex === index && (
                  <div className="kebab-menu-options">
                    {categories.map((category) => (
                      <div
                        key={category}
                        className="kebab-menu-item"
                        onClick={() => handleCategoryChange(index, category)}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="overview-box-data">{box.data}</div>
            </div>
          ))}
        </div>
      )}

      {/* Section Header below the overview boxes */}
      {activeTab === "Overview" && (
        <div className="slider-section-wrapper">
          {/* Recently Donated Section */}
          <div className="section-header-wrapper">
            <div className="section-header">
              <img
                src="code-of-conduct.svg"
                alt="Icon"
                className="section-header-icon"
              />
              <h2 className="section-header-title">Recently Donated</h2>
            </div>
          </div>
          <div className="slider-container-wrapper">
            <CardSlider />
          </div>

          {/* Recently Created Projects Section */}
          <div className="section-header-wrapper">
            <div className="section-header">
              <img
                src="fire.svg"
                alt="Icon"
                className="section-header-icon"
              />
              <h2 className="section-header-title">Recently Created Projects</h2>
            </div>
          </div>
          
          {/* Conditional Empty State */}
          <div className="empty-state-wrapper">
            {hasCreatedProjects ? (
              <CardSlider />
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      )}

{activeTab === "Project Donated" && (
        <div className="slider-section-wrapper">
          {/* Recently Donated Section */}
          <div className="section-header-wrapper">
            <div className="section-header">
              <img
                src="code-of-conduct.svg"
                alt="Icon"
                className="section-header-icon"
              />
              <h2 className="section-header-title">Recently Donated</h2>
            </div>
          </div>
          <div className="slider-container-wrapper">
            <CardSlider />
          </div>

          <div className="section-header-wrapper">
            <div className="section-header">
              <img
                src="hourglass.svg"
                alt="Icon"
                className="section-header-icon"
              />
              <h2 className="section-header-title">Previous Donations</h2>
            </div>
          </div>
          <CardGrid />
          
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
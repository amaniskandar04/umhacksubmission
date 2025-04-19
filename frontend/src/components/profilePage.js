import React, { useState } from 'react';
import ProfileHeader from './profileHeader';
import './profilePage.css';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="profile-page-container">
      <ProfileHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* You can conditionally render content for each subtab here as well */}
    </div>
  );
};

export default ProfilePage;

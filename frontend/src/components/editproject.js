// editproject.js
import React, { useState } from 'react';
import './editproject.css';

const EditProject = () => {
  const [description, setDescription] = useState('');
  const [projectPictures, setProjectPictures] = useState([]);

  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleProjectPicturesChange = (e) => setProjectPictures([...e.target.files]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send to API)
    console.log('Updated Project Description:', description);
    console.log('Updated Project Pictures:', projectPictures);
  };

  return (
    <div className="editproject-container">
      <form className="editproject-form" onSubmit={handleSubmit}>
        <label>Project Description:
          <textarea value={description} onChange={handleDescriptionChange} required />
        </label>

        

        <label className="file-label">Upload New Project Pictures:
          <input type="file" multiple onChange={handleProjectPicturesChange} />
        </label>

        <button type="submit" className="save-button">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProject;
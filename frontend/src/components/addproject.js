import React, { useState } from "react";
import "./addproject.css";

const AddProject = () => {
  const [projectImages, setProjectImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setProjectImages(files);
    console.log("Uploaded files:", files);
  };

  return (
    <div className="addproject-container">
      {/* Left form section */}
      <div className="addproject-form-section">
        <h2>Add New Project</h2>
        <form className="addproject-form">
          <input type="text" placeholder="Project Name" />
          <textarea placeholder="Project Description"></textarea>
          <input type="text" placeholder="Bank Account Number" />
          <input type="text" placeholder="Bank Name" />
          <input type="number" placeholder="Total Money Needed (RM)" />

          <label className="file-label">
            Upload Letter of Approval:
            <input type="file" />
          </label>

          <label className="file-label">
            Upload Project Pictures:
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>

          <button type="submit" className="submit-button">
            Submit Project
          </button>
        </form>
      </div>

      {/* Right image section */}
      <div className="addproject-image-section">
        <img src="images/masjid.jpg" alt="Decor 1" />
        <img src="images/masjid2.jpg" alt="Decor 2" />
      </div>
    </div>
  );
};

export default AddProject;

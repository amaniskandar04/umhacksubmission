import React, { useState } from "react";
import "./addproject.css";
import axios from "axios";

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [neededAmount, setNeededAmount] = useState("");
  const [projectImages, setProjectImages] = useState([]);
  const [letterFile, setLetterFile] = useState(null);

  const [selectedDuration, setSelectedDuration] = useState("3 months");
  const [customDuration, setCustomDuration] = useState("");

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setProjectImages(files.map(file => file.name)); // store just file names
  };

  const handleLetterUpload = (e) => {
    const file = e.target.files[0];
    setLetterFile(file ? file.name : ""); // store just file name
  };

  const handleDurationChange = (e) => {
    setSelectedDuration(e.target.value);
    if (e.target.value !== "custom") {
      setCustomDuration("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const duration =
      selectedDuration === "custom" ? customDuration : selectedDuration;

    if (!letterFile || projectImages.length === 0) {
      alert("Please upload both a letter and project images.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("bankAccountNumber", bankAccountNumber);
    formData.append("bankName", bankName);
    formData.append("neededAmount", neededAmount);
    formData.append("projectDuration", duration);
    formData.append("typeofProject", "General");
    formData.append("createdByUid", "dummy-user-id");

    formData.append("letterOfApproval", letterFile);
    formData.append("projectFiles", letterFile); // optional duplicate
    formData.append("projectPicBanner", projectImages[0]);

    projectImages.forEach((image) =>
      formData.append("projectPicDetails", image)
    );

    try {
      const response = await axios.post(
        "http://localhost:8000/api/waqf/UploadProject/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Project uploaded:", response.data);
      alert("Project uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload project. Try again.");
    }
  };
  return (
    <div className="addproject-container">
      <div className="addproject-form-section">
        <h2>Create New Wakaf Project</h2>
        <form className="addproject-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Project Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Project State"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <input
            type="text"
            placeholder="Bank Account Number"
            value={bankAccountNumber}
            onChange={(e) => setBankAccountNumber(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Bank Name"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Total Money Needed (RM)"
            value={neededAmount}
            onChange={(e) => setNeededAmount(e.target.value)}
            required
          />

          <div className="duration-group">
            <label>Project Duration:</label>
            <div className="radio-options">
              {["3 months", "6 months", "1 year", "custom"].map((opt) => (
                <label key={opt}>
                  <input
                    type="radio"
                    name="duration"
                    value={opt}
                    checked={selectedDuration === opt}
                    onChange={handleDurationChange}
                  />
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </label>
              ))}
            </div>
            {selectedDuration === "custom" && (
              <input
                type="text"
                placeholder="Enter custom duration"
                value={customDuration}
                onChange={(e) => setCustomDuration(e.target.value)}
              />
            )}
          </div>

          <label className="file-label">
            Upload Letter of Approval:
            <input type="file" onChange={handleLetterUpload} required />
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

      <div className="addproject-image-section">
        <img src="images/masjid.jpg" alt="Decor 1" className="top-image" />
        <img src="images/masjid2.jpg" alt="Decor 2" className="bottom-image" />
      </div>
    </div>
  );
};

export default AddProject;

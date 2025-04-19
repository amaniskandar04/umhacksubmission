
import React, { useState } from "react";
import "./ProfilePage.css";
import CardSlider from "./Slider1";
import EmptyState from "./EmptyState";
import { MoreHorizontal, Download } from "lucide-react";
import CardGrid from "./slider4";
import Slider5 from "./slider5";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import React, { useState } from 'react';
import './profilePage.css';
import CardSlider from './Slider1';
import EmptyState from './EmptyState';
import { MoreHorizontal } from 'lucide-react';
import CardGrid from './slider4';

const ProfileHeader = ({ activeTab, setActiveTab }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [hasCreatedProjects, setHasCreatedProjects] = useState(false);
  const [boxes, setBoxes] = useState([
    { title: "Project Donated To", data: "12" },
    { title: "Project Created", data: "3" },
    { title: "Total Amount", data: "RM1500" },
  ]);
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);
  const [selectedYear, setSelectedYear] = useState("2023");
  const [yearMenuOpen, setYearMenuOpen] = useState(false);
  const [donationYear, setDonationYear] = useState("2023");
  const [donationYearMenuOpen, setDonationYearMenuOpen] = useState(false);

  const categories = [
    "Project Donated To",
    "Project Created",
    "Total Amount",
    "Ongoing Projects",
    "Total Amount Donated",
  ];

  const years = ["2023", "2022", "2021", "2020"];
  const donationYears = ["2023", "2022", "2021", "2020"];

  // Sample data for the chart
  const monthlyData = {
    2023: [1200, 1900, 1500, 2000, 1800, 2100, 2500, 2300, 2100, 2400, 2200, 2600],
    2022: [1000, 1200, 900, 1500, 1700, 1300, 1800, 1600, 1400, 1900, 1700, 2000],
  };

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Amount Collected (RM)",
        data: monthlyData[selectedYear],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Collection",
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return 'RM' + context.raw.toLocaleString();
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount (RM)"
        }
      }
    }
  };

  // Sample project data
  const projects = {
    ongoing: [
      { id: 1, name: "Community Garden", collected: 3500, donors: 42, goal: 5000 },
      { id: 2, name: "School Renovation", collected: 12000, donors: 87, goal: 15000 },
    ],
    completed: [
      { id: 3, name: "Animal Shelter", collected: 8000, donors: 65, goal: 7500 },
      { id: 4, name: "Food Drive", collected: 5000, donors: 120, goal: 4500 },
      { id: 5, name: "Book Donation", collected: 3000, donors: 45, goal: 3000 },
    ]
  };

  // Donation data
  const donationData = {
    totalDonated: 12500,
    points: 1250,
    nextLevel: 2000,
    donations: [
      { id: 1, name: "Community Garden", amount: 500, date: "15/03/2023" },
      { id: 2, name: "School Renovation", amount: 1000, date: "22/04/2023" },
      { id: 3, name: "Animal Shelter", amount: 750, date: "05/05/2023" },
    ]
  };

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
    updatedBoxes[index].data = "N/A";
    setBoxes(updatedBoxes);
    setMenuOpenIndex(null);
  };

  const toggleMenu = (index) => {
    setMenuOpenIndex(menuOpenIndex === index ? null : index);
  };

  const handleDownloadReceipt = (donationId) => {
    console.log(`Downloading receipt for donation ${donationId}`);
    // Implement actual download functionality here
  };

  return (
    <div className="profile-header">
      {/* Cover Image */}
      <div
        className="cover-image"
        style={{
          backgroundImage: `url(${
            coverImage || "https://via.placeholder.com/1120x250"
          })`,
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
            {[
              "Overview",
              "Project Donated",
              "Project Created",
              "Total Amount Collected",
              "Total Amount Donated",
            ].map((tab) => (
              <li key={tab}>
                <button
                  className={`subtab-item ${
                    activeTab === tab ? "active-subtab" : ""
                  }`}
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
            <CardSlider />
          </div>

          {/* Recently Created Projects Section */}
          <div className="section-header-wrapper">
            <div className="section-header">
              <img src="fire.svg" alt="Icon" className="section-header-icon" />
              <h2 className="section-header-title">
                Recently Created Projects
              </h2>
            </div>
          </div>

          {/* Conditional Empty State */}
          <div className="empty-state-wrapper">
            {hasCreatedProjects ? <CardSlider /> : <EmptyState />}
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

      {activeTab === "Project Created" && (
        <div className="slider-section-wrapper">
          {/* Recently Created Projects Section */}
          <div className="section-header-wrapper">
            <div className="section-header">
              <img src="fire.svg" alt="Icon" className="section-header-icon" />
              <h2 className="section-header-title">
                Recently Created Projects
              </h2>
            </div>
          </div>

          {/* Conditional Empty State */}
          <div className="empty-state-wrapper">
            {hasCreatedProjects ? <CardSlider /> : <EmptyState />}
          </div>

          {/* Previous Projects Section */}
          <div className="section-header-wrapper">
            <div className="section-header">
              <img
                src="hourglass.svg"
                alt="Icon"
                className="section-header-icon"
              />
              <h2 className="section-header-title">Previous Projects</h2>
            </div>
            <Slider5 />
          </div>
        </div>
      )}

      {activeTab === "Total Amount Collected" && (
        <div className="amount-collected-container">
          {/* Top Section with Stats Box and Chart */}
          <div className="amount-collected-top">
            {/* Stats Box */}
            <div className="amount-collected-box">
              <div className="amount-box-header">
                <h3>Total Collected</h3>
                <div className="year-selector">
                  <button
                    className="kebab-icon-btn"
                    onClick={() => setYearMenuOpen(!yearMenuOpen)}
                  >
                    <MoreHorizontal size={20} />
                    {yearMenuOpen && (
                      <div className="year-menu">
                        {years.map((year) => (
                          <div
                            key={year}
                            className={`year-menu-item ${
                              selectedYear === year ? "selected" : ""
                            }`}
                            onClick={() => {
                              setSelectedYear(year);
                              setYearMenuOpen(false);
                            }}
                          >
                            {year}
                          </div>
                        ))}
                      </div>
                    )}
                  </button>
                </div>
              </div>
              <div className="amount-box-value">RM 24,500</div>
              <div className="amount-box-meta">
                <span>12% increase from {parseInt(selectedYear) - 1}</span>
              </div>
            </div>

            {/* Chart */}
            <div className="amount-collected-chart">
              <h3>Monthly Collection ({selectedYear})</h3>
              <div className="chart-container" style={{ height: "300px" }}>
                <Bar data={chartData} options={chartOptions} />
              </div>
              <div className="chart-stats">
                <div className="stat-item">
                  <span className="stat-label">Highest</span>
                  <span className="stat-value">RM 2,600 (Dec)</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Lowest</span>
                  <span className="stat-value">RM 1,200 (Jan)</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Average</span>
                  <span className="stat-value">RM 2,100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ongoing Projects Section */}
          <div className="projects-section">
            <h3>Ongoing Projects</h3>
            <div className="projects-table">
              <div className="table-header">
                <div className="table-col">Project Name</div>
                <div className="table-col">Amount Collected</div>
                <div className="table-col">Donors</div>
                <div className="table-col">Progress</div>
              </div>
              {projects.ongoing.map((project) => (
                <div className="table-row" key={`ongoing-${project.id}`}>
                  <div className="table-col">{project.name}</div>
                  <div className="table-col">
                    RM {project.collected.toLocaleString()}
                  </div>
                  <div className="table-col">{project.donors}</div>
                  <div className="table-col progress-col">
                    <div className="progress-container">
                      <div className="progress-bar" style={{ height: "20px", borderRadius: "100px" }}>
                        <div
                          className="progress-fill"
                          style={{
                            width: `${
                              (project.collected / project.goal) * 100
                            }%`,
                          }}
                        ></div>
                        <span className="progress-text">
                          {Math.round((project.collected / project.goal) * 100)}
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Projects Section */}
          <div className="projects-section">
            <h3>Completed Projects</h3>
            <div className="projects-table">
              <div className="table-header">
                <div className="table-col">Project Name</div>
                <div className="table-col">Amount Collected</div>
                <div className="table-col">Donors</div>
                <div className="table-col">Status</div>
              </div>
              {projects.completed.map((project) => (
                <div className="table-row" key={`completed-${project.id}`}>
                  <div className="table-col">{project.name}</div>
                  <div className="table-col">
                    RM {project.collected.toLocaleString()}
                  </div>
                  <div className="table-col">{project.donors}</div>
                  <div className="table-col">
                    <span
                      className={`status-badge ${
                        project.collected >= project.goal
                          ? "success"
                          : "warning"
                      }`}
                    >
                      {project.collected >= project.goal
                        ? "Fully Funded"
                        : "Partially Funded"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "Total Amount Donated" && (
        <div className="amount-donated-container">
          {/* Top Section with Stats Box and Points */}
          <div className="amount-donated-top">
            {/* Stats Box */}
            <div className="amount-donated-box">
              <div className="amount-box-header">
                <h3>Total Donated</h3>
                <div className="year-selector">
                  <button
                    className="kebab-icon-btn"
                    onClick={() => setDonationYearMenuOpen(!donationYearMenuOpen)}
                  >
                    <MoreHorizontal size={20} />
                    {donationYearMenuOpen && (
                      <div className="year-menu">
                        {donationYears.map((year) => (
                          <div
                            key={year}
                            className={`year-menu-item ${
                              donationYear === year ? "selected" : ""
                            }`}
                            onClick={() => {
                              setDonationYear(year);
                              setDonationYearMenuOpen(false);
                            }}
                          >
                            {year}
                          </div>
                        ))}
                      </div>
                    )}
                  </button>
                </div>
              </div>
              <div className="amount-box-value">RM {donationData.totalDonated.toLocaleString()}</div>
              <div className="amount-box-meta">
                <span>Across {donationData.donations.length} donations</span>
              </div>
            </div>

            {/* Points Section */}
            <div className="points-box">
              <h3>Your Impact Points</h3>
              <div className="points-value">{donationData.points} pts</div>
              <div className="level-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${(donationData.points / donationData.nextLevel) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Donation History Section */}
          <div className="donation-history">
            <h3>Your Donation History ({donationYear})</h3>
            <div className="donation-table">
              <div className="table-header">
                <div className="table-col">Project Name</div>
                <div className="table-col">Amount</div>
                <div className="table-col">Date</div>
                <div className="table-col">Receipt</div>
              </div>
              {donationData.donations.map((donation) => (
                <div className="table-row" key={`donation-${donation.id}`}>
                  <div className="table-col">{donation.name}</div>
                  <div className="table-col">RM {donation.amount.toLocaleString()}</div>
                  <div className="table-col">{donation.date}</div>
                  <div className="table-col">
                    <button 
                      className="download-btn"
                      onClick={() => handleDownloadReceipt(donation.id)}
                    >
                      <Download size={16} />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
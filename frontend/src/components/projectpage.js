import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Timeline from "./Timeline";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import "./projectpage.css";

const Projectpage = () => {
  const { id: projectId } = useParams();
  const [project, setProject] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [donationAmount, setDonationAmount] = useState("");

  const toggleActive = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    axios
      .post("http://localhost:8000/api/waqf/RetrievedFullProjectDetails/", {
        project_id: projectId,
      })
      .then((res) => {
        const data = res.data.project;
        const picDetailsArray = Object.values(data.ProjectPicDetails || {});
        setProject({ ...data, ProjectPicDetails: picDetailsArray });
      })
      .catch((err) => console.error(err));
  }, [projectId]);

  const handleDonate = async () => {
    const stripePromise = loadStripe("pk_test_51RFXeAPBTMj6yaMdFNX2HCvjAKppEcYq8Y6rN7A9fp5jYHwlBHrcmcu3Qx9hlhlPOc9UPE6oIfE57LJwNbqATZh000AhfaLpgv");
    const stripe = await stripePromise;

    const amountNumber = parseFloat(donationAmount);

    if (!amountNumber || amountNumber < 1) {
      alert("Please enter a valid donation amount.");
      return;
    }

    const response = await fetch("http://localhost:8000/api/waqf/create_checkout_session/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: amountNumber,
        projectId: projectId,
        title: project.Title,
        user_id: "kimi", // Replace with Firebase auth user ID
      }),
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({ sessionId: session.id });

    if (result.error) {
      console.error(result.error.message);
      alert("Payment failed: " + result.error.message);
    }
  };

  if (!project) {
    return (
      <div className="text-center py-20">
        <h2>Loading project details...</h2>
      </div>
    );
  }

  return (
    <>
      {/* Banner */}
      <div className="banner">
        <img src={project.ProjectPicBanner} alt="Banner" className="banner-image" />
        <div className="image-gradient"></div>
        <div className="image-overlay">
          <h1>{project.Title}</h1>
          <div className="donation-form">
            <input
              type="number"
              min="1"
              placeholder="Enter amount to donate (USD)"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              className="donation-input"
            />
            <button onClick={handleDonate}>Donate Now</button>
          </div>
        </div>
      </div>

      <div className="progress-bar">
        <div
                  className="progress-fill"
                  style={{
                    width: `${
                      (parseFloat(project.CurrentAmount) /
                        parseFloat(project.NeededAmount)) *
                      100
                    }%`,
                  }}
        ></div>
      </div>

      <p className="smallText">
        RM {project.CurrentAmount} / {project.NeededAmount} collected!
      </p>

      {/* Timeline */}
      <div className="timeline-box">
        <h2>Project Progress</h2>
        <Timeline currentStep={parseInt(project.ProjectTimelineState)} />
      </div>

      

      {/* Project Info */}
      <div className="project-container">
        <div className="project-text">
          <h2>{project.Title}</h2>
          <p>{project.Description}</p>
        </div>
        <img src={project.ProjectPicBanner} alt={project.Title} className="project-image" />
      </div>

      {/* Gallery */}
      <h2 className="project-progression-gallery">Project Progression Gallery</h2>
      <div className="gallery">
        {project.ProjectPicDetails.map((item, index) => (
          <div
            key={index}
            className={`gallery-item ${activeIndex === index ? "active" : ""}`}
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

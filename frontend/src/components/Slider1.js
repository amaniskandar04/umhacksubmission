import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./Slider1.css"; // your own styles if needed
import axios from 'axios';

const CardSlider = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .post('http://127.0.0.1:8000/api/waqf/RetrievedOngoingProject/')
      .then((res) => {
        setProjects(res.data.projects);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {projects.map((item) => (
          <div key={item.id} className="slider-wrapper">
            <div className="slider-card">
              <img
                src={item.ProjectPicBanner}
                alt={item.Title}
                className="slider-image"
              />
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${
                      (parseFloat(item.CurrentAmount) /
                        parseFloat(item.NeededAmount)) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
              <p className="smallText">
                RM {item.CurrentAmount} / {item.NeededAmount} collected!
              </p>
              <h3>{item.Title}</h3>
              <p>{item.Description}</p>
              <button>Donate Now!</button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardSlider;
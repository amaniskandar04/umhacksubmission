import React from "react";
import Slider from "react-slick";
import './Slider2.css';

const items = [
  { id: 1, title: "Mosques", image: "images/masjid.jpg" },
  { id: 2, title: "Surau", image: "images/surau.jpg" },
  { id: 3, title: "School", image: "images/tahfiz.jpg" },
  { id: 4, title: "Others", image: "images/library.jpg" }
];

const CardSlider = () => {
  const settings = {
    infinite: false,
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
    <Slider {...settings}>
      {items.map((item) => (
        <div key={item.id} className="slider-wrapper">
          <div
            className="slider-card"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="slider-overlay">
              <h3>{item.title}</h3>
              <button>View</button>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};


export default CardSlider;
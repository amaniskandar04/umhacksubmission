import React from "react";
import Slider from "react-slick";
import './Slider2.css';

const items = [
  { id: 1, title: "Mosques" },
  { id: 2, title: "Surau"},
  { id: 3, title: "School" },
  { id: 4, title: "Others" }
  
];

const CardSlider = () => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4, // Show 3 at a time
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
                <div className="slider-card">
                    <h3>{item.title}</h3>
                    <button>Donate Now!</button>
                </div>
            </div>
        ))}
    </Slider>
  );
};

export default CardSlider;
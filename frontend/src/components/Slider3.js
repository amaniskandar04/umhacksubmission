import React from "react";
import Slider from "react-slick";
import "./Slider3.css"; // basic white styling

const sponsors = [
  { id: 1, name: "Perbadanan Waqaf Selangor", logo: "images/logo-pws.png" },
  { id: 2, name: "Majlis Agama Islam Selangor", logo: "images/logomais.png" },
  { id: 3, name: "Security Commission Malaysia", logo: "images/SCM.jpg" },
  { id: 4, name: "Grab", logo: "images/grab.png" },
  { id: 5, name: "Zus Coffee", logo: "images/zus.png" },
];

const Slider3 = () => {
  const settings = {
    infinite: true,
    speed: 2000, // transition speed
    autoplay: true,
    autoplaySpeed: 0, // no delay between transitions
    cssEase: "linear", // makes it smooth
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="slider3-container">
      
      <Slider {...settings}>
        {sponsors.map((sponsor) => (
          <div key={sponsor.id} className="sponsor-slide">
            <img
              src={sponsor.logo}
              alt={`Sponsor ${sponsor.id}`}
              className="sponsor-logo"
            />
            
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Slider3;


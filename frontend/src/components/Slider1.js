import React from "react";
import Slider from "react-slick";
import "./Slider1.css"; // your own styles if needed

const items = [
  { id: 68, title: "Masjid Putra Expansion Project", currentMoney: "100000", totalNeeded: "500000", imageUrl:"images/masjid.jpg", description: "The proposed expansion of Masjid Putra is a significant and visionary project aimed at enhancing the mosque's ability to accommodate a growing congregation. Currently capable of hosting 15,000 individuals, the mosque's expansion seeks to increase this capacity to 25,000, ensuring that it can serve the needs of the community, especially during peak times such as Ramadan and major religious events." },
  { id: 2, title: "Sultan Sallahudin Idris Shah Mosque", currentMoney: "100000", totalNeeded: "500000", imageUrl:"images/masjid.jpg", description: "kau memang hensem" },
  { id: 3, title: "Tahfiz Abu Mujahhid", currentMoney: "100000", totalNeeded: "500000", imageUrl:"images/masjid.jpg", description: "kau memang hensem" },
  { id: 4, title: "Kelab Malam untuk Party", currentMoney: "0", totalNeeded: "500000", imageUrl:"images/masjid.jpg", description: "kau memang hensem" },
  
];

const CardSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
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
    <div className="slider-container">
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.id} className="slider-wrapper">
            <div className="slider-card">

                <img src={item.imageUrl} alt={item.title} className="slider-image" />
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{
                        width: `${(item.currentMoney / item.totalNeeded) * 100}%`,
                        }}
                    ></div>
                    
                </div>
                <p className = "smallText">RM {item.currentMoney} / {item.totalNeeded} collected!</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button>Donate Now!</button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardSlider;

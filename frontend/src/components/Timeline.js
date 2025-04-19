import { FaCheckCircle } from "react-icons/fa";
import { GiBrickWall } from "react-icons/gi";
import { FaRegStar } from "react-icons/fa";
import "./projectpage.css";

const Timeline = ({ currentStep }) => {
  const status = [
    { label: "Raising Funds", icon: <FaCheckCircle /> },
    { label: "Construction Started", icon: <GiBrickWall /> },
    { label: "First Phase", icon: "1" },
    { label: "Second Phase", icon: "2" },
    { label: "Third Phase", icon: "3" },
    { label: "Completed", icon: <FaRegStar /> },
  ];

  return (
    <div className="timeline-wrapper">
      {status.map((step, index) => {
        const isActive = index <= currentStep;
        return (
          <div key={index} className="timeline-step">
            <div
              className={`timeline-circle ${isActive ? "active" : ""}`}
            >
              {step.icon}
            </div>
            <p className="timeline-label">{step.label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;

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
    <div className="flex items-center justify-between gap-4 py-10 overflow-x-auto">
      {status.map((step, index) => {
        const isActive = index <= currentStep;
        const isLast = index === status.length - 1;

        return (
          <div key={index} className="flex items-center gap-2">
            {/* Circle with icon */}
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full text-lg font-bold
                ${isActive ? "bg-emerald-500 text-white" : "bg-gray-300 text-gray-600"}
              `}
            >
              {step.icon}
            </div>

            {/* Label */}
            <p className="text-sm text-center">{step.label}</p>

            {/* Connector */}
            {!isLast && (
              <div className={`w-10 h-1 ${index < currentStep ? "bg-emerald-500" : "bg-gray-300"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
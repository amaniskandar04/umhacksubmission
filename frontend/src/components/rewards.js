import React, { useState } from "react";
import "./rewards.css";

const rewards = [
  { id: 1, label: "Zus RM10 Voucher", points: 200, image: "/images/zus.png" },
  { id: 2, label: "Touch 'n Go RM5", points: 100, image: "/images/tng.png" },
  { id: 3, label: "Grab Voucher", points: 50, image: "/images/grab.png" },
  { id: 4, label: "Kubur", points: 30000, image: "/images/kubur.jpg" },
  { id: 5, label: "Al Quran", points: 70, image: "/images/alquran.png" },
  {
    id: 6,
    label: "Security Commission Water Bottle",
    points: 120,
    image: "/images/bottle.jpg",
  },
];

const RewardsPage = () => {
  const [userPoints, setUserPoints] = useState(250); // dynamic state

  const handleRedeem = (reward) => {
    if (userPoints >= reward.points) {
      alert(`You redeemed: ${reward.label}`);
      setUserPoints((prev) => prev - reward.points); // deduct points
    } else {
      alert("Not enough points!");
    }
  };

  return (
    <div className="rewards-page">
      <div className="reward-content">
        <div className="points-box">
          <h2>Your Points</h2>
          <p>{userPoints}</p>
        </div>
        <div className="rewards-grid">
          {rewards.map((reward) => (
            <div className="reward-card" key={reward.id}>
              <img
                src={reward.image}
                alt={reward.label}
                className="reward-img"
              />
              <h3>{reward.label}</h3>
              <p>{reward.points} points</p>
              <button onClick={() => handleRedeem(reward)}>Redeem</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;

import React, {useState} from 'react';
import './rewards.css';

const rewards = [
  { id: 1, label: "Starbucks RM10", points: 200, image: "/images/starbucks.png" },
  { id: 2, label: "Touch 'n Go RM5", points: 100, image: "/images/tng.png" },
  { id: 3, label: "Eco Bag", points: 50, image: "/images/ecobag.png" },
  { id: 4, label: "Keychain", points: 30, image: "/images/keychain.png" },
  { id: 5, label: "Notebook", points: 70, image: "/images/notebook.png" },
  { id: 6, label: "Water Bottle", points: 120, image: "/images/bottle.png" }
];

const RewardsPage = () => {
    const [userPoints, setUserPoints] = useState(250); // dynamic state
  
    const handleRedeem = (reward) => {
      if (userPoints >= reward.points) {
        alert(`You redeemed: ${reward.label}`);
        setUserPoints(prev => prev - reward.points); // deduct points
      } else {
        alert("Not enough points!");
      }
    };

  return (
    <div className="rewards-page">
      <h2>Your Points: {userPoints}</h2>
      <div className="rewards-grid">
        {rewards.map((reward) => (
          <div className="reward-card" key={reward.id}>
            <img src={reward.image} alt={reward.label} className="reward-img" />
            <h3>{reward.label}</h3>
            <p>{reward.points} points</p>
            <button onClick={() => handleRedeem(reward)}>Redeem</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewardsPage;
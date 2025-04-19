import React, { useState, useEffect } from "react";
import { Trophy, Award, Gift, AlertCircle, Star, TrendingUp, ChevronUp } from "lucide-react";
import "./rewards.css";

const rewards = [
  { id: 1, label: "Zus RM10 Voucher", points: 200, image: "/images/zus.png", category: "shopping" },
  { id: 2, label: "Touch 'n Go RM5", points: 100, image: "/images/tng.png", category: "finance" },
  { id: 3, label: "Grab Voucher", points: 50, image: "/images/grab.png", category: "food" },
  { id: 4, label: "Kubur", points: 30000, image: "/images/kubur.jpg", category: "special" },
  { id: 5, label: "Al Quran", points: 70, image: "/images/alquran.png", category: "religious" },
  {
    id: 6,
    label: "Security Commission Water Bottle",
    points: 120,
    image: "/images/bottle.jpg",
    category: "lifestyle"
  },
];

const RewardsPage = () => {
  const [userPoints, setUserPoints] = useState(250);
  const [recentActivity, setRecentActivity] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [showConfetti, setShowConfetti] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [achievements, setAchievements] = useState({
    redeemer: { earned: false, progress: 0, max: 3, description: "Redeem 3 rewards" },
    collector: { earned: false, progress: 0, max: 500, description: "Collect 500 points" },
    spender: { earned: false, progress: 0, max: 200, description: "Spend 200 points" }
  });
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});
  const [dailyBonus, setDailyBonus] = useState({ available: true, amount: 20 });
  const [shake, setShake] = useState(false);

  // Simulate initial loading of user activity
  useEffect(() => {
    setRecentActivity([
      { type: "earned", points: 50, date: "2 days ago", description: "Completed donation" },
      { type: "earned", points: 100, date: "5 days ago", description: "Referral bonus" },
      { type: "spent", points: 70, date: "1 week ago", description: "Redeemed Al Quran" }
    ]);
  }, []);

  // Filter and sort rewards
  const filteredRewards = rewards.filter(reward => {
    if (filter === "all") return true;
    return reward.category === filter;
  }).sort((a, b) => {
    switch (sortOption) {
      case "points-asc": return a.points - b.points;
      case "points-desc": return b.points - a.points;
      default: return a.id - b.id;
    }
  });

  const handleRedeem = (reward) => {
    if (userPoints >= reward.points) {
      // Show confetti effect
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);

      // Create popup
      setPopupContent({
        title: "Reward Redeemed!",
        message: `You've successfully redeemed ${reward.label}`,
        image: reward.image
      });
      setShowPopup(true);

      // Update points and activity
      setUserPoints(prev => prev - reward.points);
      setRecentActivity(prev => [
        { type: "spent", points: reward.points, date: "Just now", description: `Redeemed ${reward.label}` },
        ...prev
      ]);

      // Update achievements
      setAchievements(prev => {
        const newAchievements = { ...prev };
        newAchievements.redeemer.progress += 1;
        newAchievements.redeemer.earned = newAchievements.redeemer.progress >= newAchievements.redeemer.max;
        
        newAchievements.spender.progress += reward.points;
        newAchievements.spender.earned = newAchievements.spender.progress >= newAchievements.spender.max;
        
        return newAchievements;
      });

      // Check for newly earned achievements
      setTimeout(() => {
        if (achievements.redeemer.progress + 1 === achievements.redeemer.max ||
            achievements.spender.progress + reward.points >= achievements.spender.max) {
          setPopupContent({
            title: "Achievement Unlocked!",
            message: "You've earned a new achievement!",
            isAchievement: true
          });
          setShowPopup(true);
        }
      }, 3500);
    } else {
      // Shake animation for not enough points
      setShake(true);
      setTimeout(() => setShake(false), 500);
      
      setPopupContent({
        title: "Not Enough Points",
        message: `You need ${reward.points - userPoints} more points to redeem this reward.`,
        isError: true
      });
      setShowPopup(true);
    }
  };

  const claimDailyBonus = () => {
    if (dailyBonus.available) {
      setUserPoints(prev => prev + dailyBonus.amount);
      setDailyBonus({ ...dailyBonus, available: false });
      setRecentActivity(prev => [
        { type: "earned", points: dailyBonus.amount, date: "Just now", description: "Daily bonus claimed" },
        ...prev
      ]);
      
      setAchievements(prev => {
        const newAchievements = { ...prev };
        newAchievements.collector.progress += dailyBonus.amount;
        newAchievements.collector.earned = newAchievements.collector.progress >= newAchievements.collector.max;
        return newAchievements;
      });

      setPopupContent({
        title: "Daily Bonus Claimed!",
        message: `You've received ${dailyBonus.amount} points!`,
        isBonus: true
      });
      setShowPopup(true);
      
      // Show confetti effect
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  return (
    <div className="rewards-page">
      {showConfetti && <div className="confetti-container"></div>}
      
      <div className="rewards-header">
        <div className="user-level">
          <div className="level-badge">
            <Star size={20} />
            <span>Level 2</span>
          </div>
          <div className="level-progress">
            <div className="level-bar">
              <div className="level-fill" style={{ width: "60%" }}></div>
            </div>
            <span>90/150 XP to Level 3</span>
          </div>
        </div>
        
        <div className={`points-box ${shake ? 'shake' : ''}`}>
          <h2>Your Points</h2>
          <div className="points-display">
            <Trophy size={24} />
            <p>{userPoints}</p>
          </div>
          {dailyBonus.available && (
            <button className="daily-bonus-btn pulse" onClick={claimDailyBonus}>
              <Gift size={16} />
              <span>Claim {dailyBonus.amount} Daily Points</span>
            </button>
          )}
        </div>
      </div>
      
      <div className="achievements-section">
        <h3><Award size={20} /> Your Achievements</h3>
        <div className="achievements-grid">
          {Object.entries(achievements).map(([key, achievement]) => (
            <div 
              key={key} 
              className={`achievement-card ${achievement.earned ? 'achieved' : ''}`}
              title={achievement.description}
            >
              <div className="achievement-icon">
                {key === 'redeemer' && <Gift size={24} />}
                {key === 'collector' && <TrendingUp size={24} />}
                {key === 'spender' && <Award size={24} />}
              </div>
              <div className="achievement-info">
                <h4>{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
                <div className="achievement-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${Math.min(100, (achievement.progress / achievement.max) * 100)}%` }}
                    ></div>
                  </div>
                  <span>{achievement.progress}/{achievement.max}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="rewards-filters">
        <div className="filter-group">
          <span>Filter by: </span>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Rewards</option>
            <option value="shopping">Shopping</option>
            <option value="food">Food</option>
            <option value="finance">Finance</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="religious">Religious</option>
            <option value="special">Special</option>
          </select>
        </div>
        
        <div className="filter-group">
          <span>Sort by: </span>
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="default">Default</option>
            <option value="points-asc">Points: Low to High</option>
            <option value="points-desc">Points: High to Low</option>
          </select>
        </div>
      </div>
      
      <div className="reward-content">
        <div className="rewards-grid">
          {filteredRewards.map((reward) => {
            const isAffordable = userPoints >= reward.points;
            return (
              <div 
                className={`reward-card ${hoveredItem === reward.id ? 'hovered' : ''} ${isAffordable ? '' : 'insufficient'}`} 
                key={reward.id}
                onMouseEnter={() => setHoveredItem(reward.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="reward-badge">{reward.points} pts</div>
                <div className="reward-img-container">
                  <img
                    src={reward.image}
                    alt={reward.label}
                    className="reward-img"
                  />
                  {!isAffordable && (
                    <div className="reward-overlay">
                      <AlertCircle size={24} />
                      <span>Need {reward.points - userPoints} more points</span>
                    </div>
                  )}
                </div>
                <h3>{reward.label}</h3>
                <div className="reward-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${Math.min(100, (userPoints / reward.points) * 100)}%` }}
                    ></div>
                  </div>
                  <span>{userPoints}/{reward.points} points</span>
                </div>
                <button 
                  className={`redeem-btn ${isAffordable ? 'active' : 'disabled'}`} 
                  onClick={() => handleRedeem(reward)}
                >
                  Redeem Now
                </button>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="activity-section">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          {recentActivity.map((activity, index) => (
            <div className="activity-item" key={index}>
              <div className={`activity-icon ${activity.type === 'earned' ? 'earned' : 'spent'}`}>
                {activity.type === 'earned' ? <ChevronUp size={16} /> : <Gift size={16} />}
              </div>
              <div className="activity-details">
                <p className="activity-description">{activity.description}</p>
                <span className="activity-date">{activity.date}</span>
              </div>
              <div className={`activity-points ${activity.type === 'earned' ? 'earned' : 'spent'}`}>
                {activity.type === 'earned' ? '+' : '-'}{activity.points} pts
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowPopup(false)}>×</button>
            <div className={`popup-content ${popupContent.isError ? 'error' : ''} ${popupContent.isAchievement ? 'achievement' : ''} ${popupContent.isBonus ? 'bonus' : ''}`}>
              {popupContent.isAchievement && <Award size={60} className="popup-icon" />}
              {popupContent.isBonus && <Gift size={60} className="popup-icon" />}
              {popupContent.isError && <AlertCircle size={60} className="popup-icon" />}
              {popupContent.image && <img src={popupContent.image} alt="Reward" className="popup-image" />}
              <h3>{popupContent.title}</h3>
              <p>{popupContent.message}</p>
              <button className="popup-btn" onClick={() => setShowPopup(false)}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardsPage;
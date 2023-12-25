import React from "react";
import "./Dashboard.css"; // Import your stylesheet
import { activities } from "../data";
import profilepic from "../info/images/image-jeremy.png";
import { BsThreeDots } from "react-icons/bs";

const Dashboard: React.FC = () => {
  console.log(activities);
  return (
    <div className="layout-container">
      <div className="grid-container">
        <div className="grid-item large-item">
          <div className="large-grid-container">
            <span>
              <img className="profile-pic" src={profilepic} alt="profile" />
            </span>
            <span>
              <p>Report for</p>
              <p>Jeremy Robson</p>
            </span>
            <div className="time-frame-container">
              <div>Daily</div>
              <div>Weekly</div>
              <div>Monthly</div>
            </div>
          </div>
        </div>

        {activities.map((item, idx) => (
          <div className="grid-item">
            <div className="time-container">
              <span>{item.title}</span>
              <span
                style={{
                  display: "flex",
                  //   textAlign: "end",
                  justifyContent: "end",
                  alignItems: "center",
                }}
              >
                <BsThreeDots />
              </span>
            </div>
            <div className="time-container">
              <span>{item.timeframes.weekly.current}hrs</span>
              <span>Last Week-{item.timeframes.weekly.previous}hrs</span>
            </div>
          </div>
        ))}

        {/* Add more items as needed */}
      </div>
    </div>
  );
};

export default Dashboard;

import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Integrations = () => {
  return (
    <div className="grid-container">
      <div className="grid-item item1">
        LOGO
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/teams">Teams</Link>
        <Link to="/analytics">Analytics</Link>
        <Link to="/message">Message</Link>
        <Link to="/integrations">Integrations</Link>
      </div>
      <div className="grid-item item2 header">
        <h1 className="header-title">Integrations</h1>
        <div className="header-actions">
          <input type="text" placeholder="Search..." className="search-input" />
          <img
            src="/img/notification.jpg"
            alt="Notification"
            className="notification-icon"
          />
          <img src="/img/help.jpg" alt="Help" className="help-icon" />
          <img
            src="https://loremflickr.com/40/40?lock=1"
            alt="User Avatar"
            className="user-avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Integrations;

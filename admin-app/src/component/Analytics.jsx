import React from "react";
import "./Dashboard.css";
import { NavLink } from "react-router-dom";

const Analytics = () => {
  return (
    <div className="grid-container">
      <div className="grid-item item1">
        LOGO
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          Projects
        </NavLink>
        <NavLink
          to="/teams"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          Teams
        </NavLink>
        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          Analytics
        </NavLink>
        <NavLink
          to="/message"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          Message
        </NavLink>
        <NavLink
          to="/integrations"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          Integrations
        </NavLink>
      </div>
      <div className="grid-item item2 header">
        <h1 className="header-title">Analytics</h1>
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

export default Analytics;

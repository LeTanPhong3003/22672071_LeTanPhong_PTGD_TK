import React from "react";
import "./Dashboard.css";
import { NavLink } from "react-router-dom";

const Message = () => {
  return (
    <div className="grid-container">
      <div className="grid-item item1">
        <div className="logo-container">
          <img src="/img/logo.jpg" alt="Logo" className="logo" />
        </div>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          <img
            src="/img/dashboard.png"
            alt="Dashboard Icon"
            className="nav-icon"
          />
          Dashboard
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          <img
            src="/img/project.png"
            alt="Projects Icon"
            className="nav-icon"
          />
          Projects
        </NavLink>
        <NavLink
          to="/teams"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          <img src="/img/team.png" alt="Teams Icon" className="nav-icon" />
          Teams
        </NavLink>
        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          <img
            src="/img/analytic.png"
            alt="Analytics Icon"
            className="nav-icon"
          />
          Analytics
        </NavLink>
        <NavLink
          to="/message"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          <img
            src="/img/message.png"
            alt="Messages Icon"
            className="nav-icon"
          />
          Messages
        </NavLink>
        <NavLink
          to="/integrations"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          <img
            src="/img/integration.png"
            alt="Integrations Icon"
            className="nav-icon"
          />
          Integrations
        </NavLink>
      </div>
      <div className="grid-item item2 header">
        <h1 className="header-title">Messages</h1>
        <div className="header-actions">
          <div className="search-input-container">
            <img
              src="./img/search.png"
              alt="Search Icon"
              className="search-icon"
            />
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
          </div>
          <img
            src="/img/notification.png"
            alt="Notification"
            className="notification-icon"
          />
          <img src="/img/help.png" alt="Help" className="help-icon" />
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

export default Message;

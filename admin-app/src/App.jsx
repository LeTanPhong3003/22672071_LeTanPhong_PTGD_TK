import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GridLayout from "./component/Dashboard";
import Project from "./component/Project";
import Teams from "./component/Teams";
import Analytics from "./component/Analytics";
import Message from "./component/Message";
import Integrations from "./component/Integrations";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GridLayout />} />
        <Route
          path="/dashboard"
          element={
            <div>
              <GridLayout />
            </div>
          }
        />
        <Route
          path="/projects"
          element={
            <div>
              <Project />
            </div>
          }
        />
        <Route
          path="/teams"
          element={
            <div>
              <Teams />
            </div>
          }
        />
        <Route
          path="/analytics"
          element={
            <div>
              <Analytics />
            </div>
          }
        />
        <Route
          path="/message"
          element={
            <div>
              <Message />
            </div>
          }
        />
        <Route
          path="/Integrations"
          element={
            <div>
              <Integrations />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

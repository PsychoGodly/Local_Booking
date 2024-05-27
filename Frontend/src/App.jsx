import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Calendar from "./comp/Calendar";
import Login from "./comp/Login";
import SidebarComponent from "./comp/SideBar";

const App = () => {
  return (
    <div className="app-container">
      <Router>
        <Switch>
          <Route path="/auth">
            <Login />
          </Route>
          <Route path="/">
            <CalendarLayout />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

const CalendarLayout = () => {
  return (
    <div className="calendar-layout flex justify-between  ">
      <div className="sidebar">
        <SidebarComponent />
      </div>
      <div className="main-content w-full">
        <Calendar />
      </div>
    </div>
  );
};

export default App;

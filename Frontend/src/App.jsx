import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Calendar from "./comp/Calendar";
import Login from "./comp/Login";
import SidebarComponent from "./comp/SideBar";


const App = () => {
  return (
    <div className="app-container">
      <Router>
        <div className="sidebar">
          <SidebarComponent />
        </div>
        <div className="main-content">
          <Switch>
            <Route path="/auth">
              <Login />
            </Route>
            <Route path="/calendar">
              <Calendar />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Calendar from "./comp/Calendar";
import Login from "./comp/Login";
import SidebarComponent from "./comp/SideBar";
import Dashboard from "./comp/Dashboard";
import Header from "./comp/Header";
import UsersTable from "./comp/UsersTable";
import SallesList from "./comp/SallesList";
import AddHolidayForm from "./comp/AddHolidayForm";
import UserProfile from "./comp/UserProfile";
import ApexChart from "./comp/ReservationStatistics";
import ReservationStatistics from "./comp/ReservationStatistics";
import HolidaysList from "./comp/HolidaysList";
const App = () => {
  return (
    <div className="app-container">
      <Router>
        <Switch>
          <Route path="/auth">
            <Login />
          </Route>
          <Route path="/Dashboard">
            <Dashboard />
          </Route>
          <Route path="/UsersTable">
            <UsersTable />
          </Route>
          <Route path="/RoomsTable">
            <SallesList />
          </Route>
          <Route path="/addEvent">
            <HolidaysList />
          </Route>
          <Route path="/profile">
            <UserProfile />
          </Route>
          <Route path="/static">
            <ReservationStatistics />
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
    <div className="calendar-layout  ">
      <div>
        {" "}
        <Header />
      </div>
      <div className="flex justify-between ">
        <div className="sidebar">
          <SidebarComponent />
        </div>
        <div className="main-content w-full">
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default App;

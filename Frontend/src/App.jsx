import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Calendar from "./comp/Calendar";
import Login from "./comp/Login";


const App = () => {
  return (
    <div>
      <Router>
        <Switch>

        <Route path="/auth">
            <Login />
          </Route>
          
          <Route path="/calendar">
            <Calendar />
          </Route>

        
        </Switch>
      </Router>
    </div>
  );
};

export default App;

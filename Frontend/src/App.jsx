import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Calendar from "./comp/Calendar";


const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/test">
            <Calendar />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;

import React from "react";
import Calendar from "./component/Calendar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Test from "./component/Test";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/calendar">
            <Calendar />
          </Route>
          
          <Route path="/test">
            <Test />
          </Route>

        </Switch>
      </Router>
    </div>
  );
};

export default App;

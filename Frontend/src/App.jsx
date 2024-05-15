import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Calendar from "./comp/Calendar";
// import Calendar from "./component/Calendar";
// import Test from "./component/Test";

// import ReservationCalendar from "./component/ReservationCalendar";
// import MyCalendar from "./component/MyCalendar";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          {/* <Route path="/calendar">
            <Calendar />
          </Route> */}

          {/* <Route path="/test">
            <Test />
          </Route>  */}

          {/* <Route path="/test">
            <ReservationCalendar />
          </Route> */}

          <Route path="/test">
            <Calendar />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;

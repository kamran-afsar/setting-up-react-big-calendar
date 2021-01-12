import React from 'react';
import './App.css';
import { Timetable } from './Timetable/timeTable';
import { Provider, teamsTheme } from '@fluentui/react-northstar';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  

  return (
      <Router>
        <Provider theme={teamsTheme}>
      <div className="main-background">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/timetable">TimeTable</Link>
          </li>
        </ul>

        <hr />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/timetable">
            <Timetable />
          </Route>
        </Switch>
      </div>
      </Provider>
    </Router>
  );
}

export default App;

function Home() {
  return (
    <div className="App">
</div>
  )}
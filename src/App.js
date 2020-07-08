import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './App.scss';
import Surveys from "./pages/Surveys";
import SurveysDetails from "./pages/SurveysDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact={true} path="/" component={Surveys}/>
          <Route exact={true} path="/survey/:id" component={SurveysDetails}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

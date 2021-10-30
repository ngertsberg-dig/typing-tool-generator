import "./config/";
import React from 'react';
//import FileUpload from './pages/SurveyPreview/FileUpload';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import store from "./store/store.js";
import { Provider } from "react-redux";
import DashboardHeader from "./components/DashboardHeader";

import SurveyCreation from './pages/createSurvey';
import Dashboard from './pages/Dashboard';
import "./index.sass";
import './App.css';
class App extends React.Component{
  render(){
    return (  
      <Provider store={store}>
        <div className="App">
         
          <div id = 'errorContainer'>Please fill out all inputs</div>
          {/* <Router basename={`typingtools/${baseName}`}> */}
          <Router basename="">
            <DashboardHeader />
            <Switch>

              <Route path = {`/createSurvey`}>
                <SurveyCreation />
              </Route>
              
              <Route path = {`/survey/:id`} component={SurveyCreation} />

              <Route path = {`/`}>
                <Dashboard />
              </Route>

            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;

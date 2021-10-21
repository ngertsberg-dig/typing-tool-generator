import "./config/";
import React from 'react';
import TopBar from './components/shared/TopBar';
import Survey from './pages/Survey';
import FileUpload from './pages/FileUpload';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import store from "./store/store.js";
import { Provider } from "react-redux";
import surveySections from './surveySections.js';

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
            <Switch>

              {/* Survey */}
              <Route path = {`/fileupload`}>
                <TopBar />
                <FileUpload sections={surveySections} />
              </Route>
              <Route path = {`/surveyTest`}>
                <TopBar />
                <Survey />
              </Route>

              {/* Dashboard */}
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

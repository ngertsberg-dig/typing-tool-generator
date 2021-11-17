import "./config/";
import React from 'react';
import { useEffect } from "react";
//import FileUpload from './pages/SurveyPreview/FileUpload';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashboardHeader from "./components/DashboardHeader";
import { fetchUser, logout } from "./store/actions/user";
import { connect } from "react-redux";
import SurveyCreation from './pages/createSurvey';
import Dashboard from './pages/Dashboard';
import "./index.sass";
import './App.css';

function App({ user, fetchUser, logout }) {
  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, []);
  if (!user) {
    return null;
  }

  return (
    <div className="App">
    <div id = 'errorContainer'>Please fill out all inputs</div>
    {/* <Router basename={`typingtools/${baseName}`}> */}
    <Router basename="">
      <DashboardHeader user={user} onLogOut={logout} />
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
  );
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(fetchUser()),
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
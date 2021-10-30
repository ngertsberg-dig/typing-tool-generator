import React from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import SurveyList from "./components/SurveyList";
import SurveyListSearch from "./components/SurveyListSearch";
import "./index.sass";
import { popupMessage } from "../../helpers/popupMessage";
import {
  getSurveys,
  deleteSurvey
} from "../../store/actions/dashboard";

class Dashboard extends React.Component{

  state={
    surveys:[],
    searchQuery: ""
  }
  
  async componentDidMount(){
    const res = await this.props.getSurveys(1);
    this.setState({ surveys: res });
  }

  goToSurveyCreation = () =>{
    this.props.history.push("/createSurvey");
  }

  tableRowClick = async (surveyID,e) =>{
    if(!e.target.classList.contains("delete-survey")){
      this.props.history.push(`/survey/${surveyID}`);
    }
    else{
      const resp = await this.props.deleteSurvey( this.props.userID, surveyID );
      if(typeof resp === "object" ? resp[0] === 1 : resp === 1){
        this.props.history.push(`/createSurvey`);
        this.props.history.push(`/`);
        popupMessage("Survey Deleted","success");
      }
    }
  }

	handleSearch = value => {
    this.setState({ searchQuery: value })
	};

  render(){
    return(
      <>
        <div className = 'dashboard-container'>

          <div className = 'top'>
            <SurveyListSearch onChange={ this.handleSearch } navigate = {this.goToSurveyCreation} />
          </div>

          {this.state.surveys.length === 0 && (
            <p className = 'no-surveys'>It does not seem you have any surveys created, create one using the button above.</p>
          )}


          {this.state.surveys.length !== 0 && (
            <SurveyList surveys = {this.state.surveys} tableRowClick = { this.tableRowClick } searchQuery = { this.state.searchQuery } />
          )}

        </div>
      </>
    )
  }
}

const mapStateToProps = (store) =>({
  userID: store.dashboard.userID
});

const mapDispatchToProps = (dispatch) =>({
  getSurveys: ( userID ) => dispatch(getSurveys( userID )),
  deleteSurvey: ( userID, surveyID ) => dispatch(deleteSurvey( userID, surveyID )),
});

export default withRouter(connect( mapStateToProps, mapDispatchToProps)(Dashboard));
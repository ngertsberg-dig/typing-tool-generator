import React from "react";
import AddIcon from '@mui/icons-material/Add';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import SurveyList from "./components/SurveyList";
import "./index.sass";
import Button from '@mui/material/Button';
import { popupMessage } from "../../helpers/popupMessage";
import {
  getSurveys,
  deleteSurvey
} from "../../store/actions/dashboard";

class Dashboard extends React.Component{

  state={
    surveys:[]
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
      if(resp === 1){
        this.props.history.push(`/createSurvey`);
        this.props.history.push(`/`);
        popupMessage("Survey Deleted","success");
      }
    }
  }

  render(){
    return(
      <>
        <div className = 'dashboard-container'>

          <div className = 'top'>
            <h1 className='title'>Surveys</h1>
            <div className = 'button-container'>
              <Button className='create-survey-button' variant="contained" onClick = {this.goToSurveyCreation}>
                <AddIcon /> <p>CREATE SURVEY</p>
              </Button>
            </div>
          </div>

          {this.state.surveys.length === 0 && (
            <p className = 'no-surveys'>It does not seem you have any surveys created, create one using the button above.</p>
          )}

          {this.state.surveys.length !== 0 && (
            <SurveyList surveys = {this.state.surveys} tableRowClick = { this.tableRowClick } />
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
import React from "react";
import DashboardHeader from "../../components/DashboardHeader";
import AddIcon from '@mui/icons-material/Add';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import SurveyList from "./components/SurveyList";
import "./index.sass";
import {
  getSurveys
} from "../../store/actions/dashboard";

class Dashboard extends React.Component{

  state={
    surveys:[]
  }
  
  async componentDidMount(){
    const res = await this.props.getSurveys(1);
    this.setState({ surveys: res });
  }

  render(){
    return(
      <>
        <DashboardHeader />
        <div className = 'dashboard-container'>
          <h1 className='title'>Surveys</h1>
          {this.state.surveys.length === 0 && (
            <p className = 'no-surveys'>It does not seem you have any surveys created, create one using the button below.</p>
          )}

          <SurveyList />

          <Link to="/createSurvey" className = "CreateSurveyLink">
            <div id = 'CreateSurvey'>
                <div id = 'createSurveySwiper'></div>
                <AddIcon />
            </div>
          </Link>
        </div>
      </>
    )
  }
}

const mapStateToProps = (store) =>({
});

const mapDispatchToProps = (dispatch) =>({
  getSurveys: ( userID ) => dispatch(getSurveys( userID )),
});

export default withRouter(connect( mapStateToProps, mapDispatchToProps)(Dashboard));
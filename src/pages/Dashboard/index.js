import React from "react";
import DashboardHeader from "../../components/DashboardHeader";
import AddIcon from '@mui/icons-material/Add';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./index.sass";

class Dashboard extends React.Component{
  render(){
    return(
      <>
        <DashboardHeader />
        <div className = 'dashboard-container'>
          <h1 className='title'>Surveys</h1>
          <p className = 'no-surveys'>It does not seem you have any surveys created, create one using the button below.</p>
         
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

export default connect( mapStateToProps, {})(Dashboard);
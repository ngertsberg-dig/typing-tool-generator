import React from 'react';
import SurveySectionsTable from '../SurveyQuestions/';
import Loader from '../Loader/';
import SurveyDone from '../SurveyDone/';
import surveySections from '../../../surveySections.js';
import { apiURL } from '../../../surveySections.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {
  getSurveyPreviewJSON
} from "../../../store/actions/surveyPreview";

import "./index.sass";

class Survey extends React.Component{
  state = {
    surveySections: null,
    page: 1,
    answers: {"rid":999},
    apiResponse: null,
    surveyDone: false,
    loading: false
  };
  constructor(){
    super();
    this.recordAnswer = this.recordAnswer.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.backPage = this.backPage.bind(this);
    this.surveyReset = this.surveyReset.bind(this);
  }
  async componentDidMount(){
    const userID = this.props.userID;
    const surveyID = this.props.match.params.id;
    const surveyJSON = await this.props.getSurveyPreviewJSON( userID, surveyID );
    this.setState({ surveySections: JSON.parse(surveyJSON.survey_json) });
  }
  surveyReset(){
    this.setState({
      answers: {"rid":999},
      apiResponse: null,
      surveyDone: false,
      page: 1
    })
  }
  recordAnswer(digVar,value,e){
    const answersCopy = {...this.state.answers};
    answersCopy[digVar] = value;
    this.setState({ answers: answersCopy });
    const clickedParentName = "." + e.target.getAttribute("name");
    console.log(digVar)
    if(document.querySelector(clickedParentName).classList.contains("error")){
      document.querySelector(clickedParentName).classList.remove("error")
    }
  }
  nextPage(surveyEnd){
    let currentSurveySection = surveySections.filter(el=> el.id === this.state.page)[0];
    let hasError = false;
    currentSurveySection.questions.forEach(question=>{
      const questionAnswer = this.state.answers[question.name];
      if(questionAnswer === undefined){
        document.querySelector(`.${question.name}`).classList.add("error");
        hasError = true;
      }
    })
    if(!hasError){
      let { page } = this.state;
      page++;
      if(!surveyEnd){
        this.setState({ page }, ()=>{ this.reCheckInputs() })
      }else{
        this.sendData();
      }
    }
  }
  async sendData(){
    this.setState({ loading: true })
    const rawResponse = await fetch(this.state.surveySections.apiURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': 'p4uM3ytmFI77c91cF8xGB3k8rZZ2N70haXYKRqdL'
      },
      body: JSON.stringify(this.state.answers)
    });
    const content = await rawResponse.json();
    console.log(content);
    if(content.Status === "Success"){
      this.setState({ apiResponse: content, surveyDone: true, loading: false });
    }
  }
  backPage(){
    let { page } = this.state;
    if(page !== 1){
      page--;
      this.setState({ page }, ()=>{ this.reCheckInputs() })
    }
  }
  reCheckInputs(){
    const currentSurveySection = surveySections.filter(el=> el.id === this.state.page)[0];
    currentSurveySection.questions.forEach(question=>{
      const radioButtonValue = this.state.answers[question.name];
      if(radioButtonValue !== undefined){
        document.querySelector(`.${question.name} input[value='${radioButtonValue}']`).checked = true;
      }else{
        document.querySelectorAll(`.${question.name} input[type='radio']`).forEach(radio=>radio.checked = false)
      }
    })
  }
  
  render(){
    const { page , surveySections} = this.state;
    const currentSurveySection = surveySections === null ? 0 : surveySections.pages.filter(el=> el.pageID === page)[0];
    if(this.state.surveyDone && !this.state.loading){
      return(
        <SurveyDone surveyReset = {this.surveyReset} apiResponse = {this.state.apiResponse} />
      )
    }
    else if(!this.state.surveyDone && this.state.loading){
      return(
        <Loader />
      )
    }
    else{
      return (
        <div className="survey-preview-container">
          {currentSurveySection !== 0 && (
            <>
              {surveySections.pages.length > 0 && (
                <SurveySectionsTable 
                  page = {this.state.page} 
                  maxPage = {this.state.surveySections.pages.length}
                  recordAnswer = {this.recordAnswer} 
                  surveySections = {currentSurveySection}
                  nextPage = {this.nextPage}
                  backPage = {this.backPage}
                />
              )}
              {surveySections.pages.length === 0 && (
                <div className = 'no-pages-error'><ErrorOutlineIcon /><p>Please add pages to your survey</p></div>
              )}
            </>
          )}
        </div>
      );
    }
  }
}

const mapStateToProps = (store) => ({
  userID: store.dashboard.userID
})

const mapDispatchToProps = (dispatch) => ({
  getSurveyPreviewJSON: ( userID, surveyID ) => dispatch(getSurveyPreviewJSON( userID, surveyID )),
})


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Survey));

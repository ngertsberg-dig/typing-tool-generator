import React from 'react';
import SurveySectionsTable from '../../components/SurveyQuestions/';
import Loader from '../../components/Loader/';
import SurveyDone from '../../components/SurveyDone/';
import surveySections from '../../surveySections.js';
import { apiURL } from '../../surveySections.js';

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
  componentDidMount(){
    this.setState({surveySections});
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
    const rawResponse = await fetch(apiURL, {
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
    const currentSurveySection = surveySections === null ? 0 : surveySections.filter(el=> el.id === page);
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
        <>
          {currentSurveySection !== 0 && (
            <SurveySectionsTable 
              page = {this.state.page} 
              maxPage = {this.state.surveySections.length}
              recordAnswer = {this.recordAnswer} 
              surveySections = {currentSurveySection[0]}
              nextPage = {this.nextPage}
              backPage = {this.backPage}
            />
          )}
        </>
      );
    }
  }
}

export default Survey;

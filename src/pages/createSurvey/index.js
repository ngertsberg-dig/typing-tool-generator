import React from 'react';
import DashboardHeader from "../../components/DashboardHeader";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Page from "./components/Page";
import CheckIcon from '@mui/icons-material/Check';
import { connect } from 'react-redux';
import { TweenMax, Power4 } from "gsap";
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import axios from "axios";

import "./index.sass";
import {
    changeTextVal,
    updatePages,
    finishCreatingSurvey,
    getSurveyByID,
    setSurveyJSON,
    resetNewSurvey
} from "../../store/actions/createSurvey";


class createSurvey extends React.Component{

    state = {
        SurveyQuestion:[],
        surveyID: null,
        createOrUpdate: 1
    };

    async componentDidMount(){
        console.log("hello location ->",this.props.location)
        const surveyID = this.props.match.params.id;
        if(surveyID !== undefined){
            this.setState({ surveyID, createOrUpdate: 2 });
            const surveyData = await this.props.getSurveyByID(surveyID);
            if(surveyData.success){
                this.props.setSurveyJSON(surveyData.res);
            }
        }
        else{
            this.props.resetNewSurvey();
        }
    }

    addPage = () =>{
        let SurveyPages  = [...this.props.newSurvey.pages];
        let newSurveyPage = {
            pageID: (SurveyPages.length + 1),
        };
        SurveyPages.push(newSurveyPage);
        this.props.updatePages(SurveyPages);
        this.animatePageIn(SurveyPages.length);
    }

    animatePageIn = (pageID) =>{
        setTimeout(()=>{
            const page = document.querySelector(`.new-page[data-pageid='${pageID}']`);
            TweenMax.from(page, 0.25, {opacity: 0, y:-20, ease: Power4.easeOut });
            TweenMax.to(page, 0.25, {opacity: 1, ease: Power4.easeOut });
        },100)
    }

    changeTextVal = (e,textField) =>{
        this.props.changeTextVal(textField,e.target.value,this.props.newSurvey);
    }

    inputNotFilledError  = () =>{
        const err = document.querySelector("#errorContainer");
        TweenMax.set(err,{y: 0});
        TweenMax.set(err,{display: "inline"});
        TweenMax.to(err,0.5,{y:-125,ease:Power4.easeOut,onComplete:()=>{
            TweenMax.to(err,0.25,{y:0,delay:1,ease:Power4.easeIn,onComplete:()=>{
                TweenMax.set(err,{display:"none",y:0,});
            }})
        }});
    }

    finishNewSurvey = async () => {
        const baseInputs = document.querySelectorAll(".create-survey-inputs .base-inputs input");
        let hasError = false;
        baseInputs.forEach(el=>{
            if(el.value === ""){
                el.classList.add("not-filled");
                this.inputNotFilledError();
                hasError = true;
            }
            else{
                el.classList.remove("not-filled");
            }
        })
        if(!hasError){
            const response = await this.props.finishCreatingSurvey(this.props.newSurvey);
            if(response.success){
                const surveyID = response.id;
                this.props.history.push(`/survey/${surveyID}`);
            }
        }
    }

    render(){
        return(
            <>
            <DashboardHeader />
                <div className = 'dashboard-container' data-createOrUpdate={this.state.createOrUpdate}>
                    <h1>Create Survey</h1>
                    <div className = 'create-survey-inputs'>
                        <div className = 'base-inputs'>
                            {this.props.test}
                            <TextField onChange = {(e) => this.changeTextVal(e,"surveyName")} value={this.props.newSurvey.surveyName} label="Survey Name" />
                            <TextField onChange = {(e) => this.changeTextVal(e,"apiURL")} className ='remove-margins' value={this.props.newSurvey.apiURL} label="API URL" />
                            <TextField onChange = {(e) => this.changeTextVal(e,"documentationURL")} value={this.props.newSurvey.documentationURL} label="Documentation URL" />
                        </div>
                    </div>
                    <div id = 'SurveyCreationSection'>
                        {this.props.newSurvey.pages.map((SurveyPage,el)=>(
                            <Page key={el} pageID = {SurveyPage.pageID} />
                        ))}
                        <div className = 'bottom-buttons'>
                            <Button variant="contained" endIcon={<PostAddIcon />} onClick = {this.addPage}>
                                Add Page
                            </Button>
                            <Button id='completeCreateSurvey' variant="contained" endIcon={<CheckIcon />} onClick = {this.finishNewSurvey}>
                                {parseInt(this.state.createOrUpdate) === 1 ? "Finish" : "Update" }
                            </Button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}



const mapStateToProps = (store) => ({
    newSurvey: store.createSurvey.newSurvey, 
    test: store.createSurvey.test, 
})

const mapDispatchToProps = (dispatch) => ({
    changeTextVal: ( textField, newText,newSurvey ) => dispatch(changeTextVal( textField,newText,newSurvey )),
    updatePages: (SurveyPages) => dispatch(updatePages(SurveyPages)),
    finishCreatingSurvey: ( surveyJson ) => dispatch(finishCreatingSurvey( surveyJson )),
    getSurveyByID: ( surveyID ) => dispatch(getSurveyByID( surveyID )),
    setSurveyJSON: ( surveyJSON ) => dispatch(setSurveyJSON( surveyJSON )),
    resetNewSurvey:  () => dispatch(resetNewSurvey()),
    
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(createSurvey));
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Page from "./components/Page";
import CheckIcon from '@mui/icons-material/Check';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { connect } from 'react-redux';
import { TweenMax, Power4 } from "gsap";
import { withRouter } from 'react-router-dom';
import "./index.sass";

import {
    popupMessage
} from "../../helpers/popupMessage";

import {
    changeTextVal,
    updatePages,
    finishCreatingSurvey,
    getSurveyByID,
    setSurveyJSON,
    resetNewSurvey,
    updateExistingSurvey
} from "../../store/actions/createSurvey";

class createSurvey extends React.Component{

    state = {
        SurveyQuestion:[],
        surveyID: null,
        surveyUuid: null,
        createOrUpdate: 1
    };

    async componentDidMount(){
        const surveyID = this.props.match.params.id;
        if(surveyID !== undefined){
            this.setState({ surveyID, createOrUpdate: 2 });
            const surveyData = await this.props.getSurveyByID(surveyID);
            if(surveyData.success){
                this.setState({ surveyUuid: surveyData.res.survey_uuid });
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

    finishNewSurvey = async () => {
        const baseInputs = document.querySelectorAll(".create-survey-inputs .base-inputs input");
        let hasError = false;
        baseInputs.forEach(el=>{
            if(el.value === ""){
                el.classList.add("not-filled");
                popupMessage("Please fill out all inputs","error");
                hasError = true;
            }
            else{
                el.classList.remove("not-filled");
            }
        })
        if(!hasError){
            const createOrUpdate = parseInt(this.state.createOrUpdate);
            //create
            if(createOrUpdate === 1){
                const response = await this.props.finishCreatingSurvey(this.props.newSurvey);
                if(response.success){
                    const surveyID = response.id;
                    this.props.history.push(`/`);
                    this.props.history.push(`/survey/${surveyID}`);
                    popupMessage("Survey Saved Successfully","success");
                }
            }
            //update
            else if(createOrUpdate === 2){
                const surveyID = parseInt(this.props.match.params.id);
                const response = await this.props.updateExistingSurvey(this.props.newSurvey,this.props.userID,surveyID);
                if(response.success){
                    popupMessage("Survey Updated Successfully","success");
                }
            }
        }
    }

    previewSurvey = () =>{
        this.props.history.push(`/preview/${this.state.surveyID}`);
    }   

    render(){
        return(
            <>
                <div className='create-or-update-page-container'>
                    <div className = 'dashboard-container' data-createorupdate={this.state.createOrUpdate}>
                        <div className = 'create-survey-container'>
                            <h1>Create a New Study</h1>
                            <div className = 'create-survey-inputs'>
                                <div className = 'base-inputs'>
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
                                    {parseInt(this.state.createOrUpdate) === 2 && (
                                        <>
                                            <a rel="noopener noreferrer" target="_blank" href = {`${process.configs.typingtoolfrontend}?uuid=${this.state.surveyUuid}`} className='previewlink'>
                                            <Button id='completeCreateSurvey' variant="contained" endIcon={<VisibilityIcon />} style={{"marginRight":"5px"}}>
                                                Preview
                                            </Button>
                                        </a>
                                        </>
                                    )}
                                    <Button id='completeCreateSurvey' variant="contained" endIcon={<CheckIcon />} onClick = {()=>this.finishNewSurvey()}>
                                        {parseInt(this.state.createOrUpdate) === 1 ? "Finish" : "Update" }
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}



const mapStateToProps = (store) => ({
    newSurvey: store.createSurvey.newSurvey, 
    digvarcount: store.createSurvey.digvarcount, 
    userID: store.dashboard.userID
})

const mapDispatchToProps = (dispatch) => ({
    changeTextVal: ( textField, newText,newSurvey ) => dispatch(changeTextVal( textField,newText,newSurvey )),
    updatePages: (SurveyPages) => dispatch(updatePages(SurveyPages)),
    finishCreatingSurvey: ( surveyJson ) => dispatch(finishCreatingSurvey( surveyJson )),
    getSurveyByID: ( surveyID ) => dispatch(getSurveyByID( surveyID )),
    setSurveyJSON: ( surveyJSON ) => dispatch(setSurveyJSON( surveyJSON )),
    resetNewSurvey:  () => dispatch(resetNewSurvey()),
    updateExistingSurvey:  ( newSurvey, userID, surveyID ) => dispatch(updateExistingSurvey( newSurvey, userID, surveyID )),
    
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(createSurvey));
import React from 'react';
import DashboardHeader from "../../components/DashboardHeader";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Page from "./components/Page";
import CheckIcon from '@mui/icons-material/Check';
import { connect } from 'react-redux';
import { TweenMax, Power4 } from "gsap";
import "./index.sass";
import {
    changeTextVal,
    updatePages
} from "../../store/actions/createSurvey";


class createSurvey extends React.Component{

    state = {
        SurveyQuestion:[]
    };

    componentDidMount(){
        // const testData = [{pageID:1}];
        // this.setState({SurveyPages:testData});
        // console.log(this.props)
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
        this.props.changeTextVal(textField,e.target.value);
    }

    render(){
        return(
            <>
            <DashboardHeader />
                <div className = 'dashboard-container'>
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
                            <Button id='completeCreateSurvey' variant="contained" endIcon={<CheckIcon />}>
                                Finish
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
    changeTextVal: (textField, newText) => dispatch(changeTextVal(textField,newText)),
    updatePages: (SurveyPages) => dispatch(updatePages(SurveyPages))
})

export default connect(mapStateToProps,mapDispatchToProps)(createSurvey);
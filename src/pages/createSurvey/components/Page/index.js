import React from 'react';
import QuestionTypeSelection from "./components/QuestionTypeSelection";
import MultipleChoiceTypeFillout from "./components/MultipleChoiceTypeFillout";
import SelectDropdownTypeFillout from "./components/SelectDropdownTypeFillout";
import TextField from '@mui/material/TextField';
import { connect } from 'react-redux';
import "./index.sass";
import {
    changePageTextVal,
    removePage,
    questionTypeSelect
} from "../../../../store/actions/createSurvey";

class Page extends React.Component{

    //question types
    //1 = multiple choice

    state = {
        typeSelected: false,
        type: null
    }
    
    componentDidMount(){
        // this.setState({ typeSelected: true, type: 1})
    }

    selectQuestionType = (type) =>{
        this.props.questionTypeSelect( this.props.pageID, type, this.props.newSurvey );
        this.setState({ typeSelected: true, type: type });
    }

    changePageTextVal = (e,textField,pageID) =>{
        this.props.changePageTextVal(textField,e.target.value,pageID);
    }

    removePage = ( pageID ) =>{
        this.props.removePage( pageID, this.props.newSurvey );
    }

    render(){
        const currentPage = this.props.newSurvey.pages.filter(el=>el.pageID === this.props.pageID)[0];
        return(
           <div className = 'new-page' data-pageid={this.props.pageID}>
               <div className = 'choose-question-type'>
                    <div className='page-top-title'><p className = 'page-num'>Page #: {this.props.pageID}</p><p onClick = {(e) => this.removePage(this.props.pageID)} className = 'remove-page'>x</p></div>
                    <div className = 'page-title-desc'>
                        <TextField onChange = {(e) => this.changePageTextVal(e,"pageTitle",this.props.pageID)} value={this.props.newSurvey.pages[this.props.pageID - 1].pageTitle || ""} label="Page Title" />
                        <TextField onChange = {(e) => this.changePageTextVal(e,"pageDesc",this.props.pageID)}  value={this.props.newSurvey.pages[this.props.pageID - 1].pageDesc || ""} label="Page Description" />
                    </div>
                    {currentPage.questionType === undefined && (
                        <QuestionTypeSelection selectQuestionType = {this.selectQuestionType} />
                    )}
                    {currentPage.questionType && (
                        <>
                            {currentPage.questionType === 1 && (
                                <>
                                    <MultipleChoiceTypeFillout pageID = {this.props.pageID} currentPage = {currentPage} />
                                </>
                            )}
                            {currentPage.questionType === 2 && (
                                <>
                                    <SelectDropdownTypeFillout pageID = {this.props.pageID} currentPage = {currentPage} />
                                </>
                            )}
                        </>
                    )}
               </div>
           </div>
        )
    }
}

const mapStateToProps = (store) => ({
    newSurvey: store.createSurvey.newSurvey
})

const mapDispatchToProps = (dispatch) => ({
    changePageTextVal: ( textField, newText,pageID ) => dispatch(changePageTextVal( textField,newText,pageID )),
    removePage: ( pageID, newSurvey ) => dispatch(removePage( pageID,newSurvey )),
    questionTypeSelect: ( pageID, questionType, newSurvey ) => dispatch(questionTypeSelect( pageID, questionType, newSurvey ))
})


export default connect(mapStateToProps,mapDispatchToProps)(Page);
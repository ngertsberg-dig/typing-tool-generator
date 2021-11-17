import React from "react";
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { TweenMax, Power4 } from "gsap";
import { connect } from 'react-redux';
import "./index.sass";
import {
    updateQuestionsAndOptions,
} from "../../../../../../store/actions/createSurvey";

class MultipleChoiceTypeFillout extends React.Component{

    state = {
        options: [],
        questions: []
    }

    animateIn = (optionOrQuestion) =>{
        const singleOptions = optionOrQuestion === 1 ? document.querySelectorAll(".single-option") : document.querySelectorAll(".single-question");
        const box = singleOptions[singleOptions.length - 1];
        TweenMax.from(box, 0.5, {opacity: 0, x:-10, ease: Power4.easeOut });
    }

    updateQuestionsAndOptions = () =>{
        setTimeout(()=>{
            this.props.updateQuestionsAndOptions( this.state.questions, this.state.options, this.props.pageID, this.props.newSurvey );
        },100);
    }

    addOption = (optionOrQuestion) =>{
        const options = optionOrQuestion === 1 ? [...this.state.options] : [...this.state.questions];
        let newOption = {};
        if(optionOrQuestion === 1){
            newOption = {
                optionID: (options.length + 1),
                optionValue: null,
                optionLabel: null,
            }
        }
        else{
            newOption = {
                questionID: (options.length + 1),
                questionText: null,
            }
        }
        options.push(newOption);
        if(optionOrQuestion === 1){
            this.setState({ options },()=>{
                this.updateQuestionsAndOptions();
                this.animateIn(1);
            });
        }
        else{
            this.setState({ questions: options },()=>{
                this.updateQuestionsAndOptions();
                this.animateIn(2);
            });
        }
    }

    optionTextChange = (e,optionID,keyReplace,optionOrQuestion) =>{
        let options = optionOrQuestion === 1 ? [...this.state.options] : [...this.state.questions];
        const optionsWithout = optionOrQuestion === 1 ?  options.filter(el=>el.optionID !== optionID) : options.filter(el=>el.questionID !== optionID);
        const selectedOption = optionOrQuestion === 1 ?  options.find(el=>(el.optionID === optionID)) : options.find(el=>(el.questionID === optionID));
        selectedOption[`${keyReplace}`] = keyReplace === "optionValue" ?  e.target.value.replace(/\D/,'') : e.target.value;
        optionsWithout.push(selectedOption);
        options = optionsWithout;
        options = optionOrQuestion === 1 ? options.sort((a,b)=> a.optionID > b.optionID ? 1 : -1) : options.sort((a,b)=> a.questionID > b.questionID ? 1 : -1);
        if(optionOrQuestion === 1){
            this.setState({ options: optionsWithout },()=>this.updateQuestionsAndOptions())
        }
        else{
            this.setState({ questions: optionsWithout },()=>this.updateQuestionsAndOptions())
        }
    }

    removeOption = (optionID,optionOrQuestion) =>{
        let options = optionOrQuestion === 1 ? [...this.state.options] : [...this.state.questions];
        options = optionOrQuestion === 1 ? options.filter(el=>el.optionID !== optionID) : options.filter(el=>el.questionID !== optionID);

        if(optionOrQuestion === 1){
            options.forEach((option,el)=>{
                option.optionID = (el + 1);
            });
            this.setState({ options },()=>this.updateQuestionsAndOptions());
        }
        else{
            options.forEach((option,el)=>{
                option.questionID = (el + 1);
            });
            this.setState({ questions: options },()=>this.updateQuestionsAndOptions());
        }
        
    }

    componentDidMount(){
        const { currentPage } = this.props;
        this.setState({ options: currentPage.options, questions: currentPage.questions });
    }

    render(){
        return(
            <>
                <div className = 'options-section multiple-choice-type'>
                    <p>Multiple choice options:</p>
                    <div className = 'options-container'>
                        {this.state.options.map((option,el)=>{
                            return(
                            <div className = 'single-option' key = {el} data-option={option.optionID}>
                                <p>Option #: {option.optionID} <span className = 'remove-option' onClick = {(e)=>this.removeOption(option.optionID,1)} >x</span></p>
                                <TextField label = "Option Label" value = {this.state.options[el].optionLabel || ""} onChange = {(e)=>this.optionTextChange(e,option.optionID,"optionLabel",1)} />
                                <TextField label = "Option Value" value = {this.state.options[el].optionValue || ""} onChange = {(e)=>this.optionTextChange(e,option.optionID,"optionValue",1)} />
                            </div>
                        )})}
                    </div>
                    <Button className = "add-ui-button"variant="contained" endIcon={<AddIcon />} onClick = {(e)=>this.addOption(1)}>
                        Add Option
                    </Button>
                </div>

                <div className = 'questions-section multiple-choice-type'>
                    <p>Multiple choice questions:</p>
                    <div className = 'questions-container'>
                        {this.state.questions.map((option,el)=>{
                            return(
                            <div className = 'single-question' key = {el} data-option={option.questionID}>
                                <div className = 'q-p'><p>Question #: {option.questionID} <span className = 'remove-option' onClick = {(e)=>this.removeOption(option.questionID,2)} >x</span></p><p className = 'digvar'>dig_var{option.digvar}</p></div>
                                <TextField multiline label = "Question" value = {this.state.questions[el].questionText || ""} onChange = {(e)=>this.optionTextChange(e,option.questionID,"questionText",2)} />
                            </div>
                        )})}
                    </div>
                    <Button className = "add-ui-button" variant="contained" endIcon={<AddIcon />} onClick = {(e)=>this.addOption(2)}>
                        Add Question
                    </Button>
                </div>
            </>
        )
    }
}

const mapStateToProps = (store) => ({
    newSurvey: store.createSurvey.newSurvey
})

const mapDispatchToProps = (dispatch) => ({
    updateQuestionsAndOptions: ( questions, options, pageID, newSurvey ) => dispatch(updateQuestionsAndOptions( questions, options, pageID, newSurvey )),
})

export default connect(mapStateToProps,mapDispatchToProps)(MultipleChoiceTypeFillout);
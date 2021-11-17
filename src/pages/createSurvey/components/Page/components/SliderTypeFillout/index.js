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
        questions: [],
        timer: 0
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
        const options = [...this.state.questions];
        let newOption = {};

        newOption = {
            questionID: (options.length + 1),
            questionText: null,
            slider: [
                { sliderMin: 0, dropdownID: 1, sliderMax: 5, sliderStep: 1, sliderDefault: 0 }
            ]
        }

        options.push(newOption);

        this.setState({ questions: options },()=>{
            this.updateQuestionsAndOptions();
            this.animateIn(2);
        });

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

    addDropdownOption = ( questionID ) =>{
        let questions = [...this.state.questions];
        let questionsWithout = questions.filter(el=>el.questionID !== questionID);
        let currentQuestion = questions.filter(el=>el.questionID === questionID)[0];

        currentQuestion.slider.push({
            dropdownValue: null, 
            dropdownID: currentQuestion.slider.length + 1, 
            isDefault: false, 
            dropdownText: "" 
        });

        questionsWithout.push(currentQuestion);
        questionsWithout.sort((a,b)=>(a.questionID > b.questionID ? 1 : -1))
        this.setState({ questions: questionsWithout });
        
    }

    optionTextChange = (e,optionID,keyReplace,optionOrQuestion) =>{
        let options = optionOrQuestion === 1 ? [...this.state.options] : [...this.state.questions];
        const optionsWithout = optionOrQuestion === 1 ?  options.filter(el=>el.optionID !== optionID) : options.filter(el=>el.questionID !== optionID);
        const selectedOption = optionOrQuestion === 1 ?  options.find(el=>(el.optionID === optionID)) : options.find(el=>(el.questionID === optionID));
        selectedOption[`${keyReplace}`] = e.target.value;
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
    
    removeDropdownOption = ( dropdownID, questionID ) => {
        let questions = [...this.state.questions];
        let questionsWithout = questions.filter(el=>el.questionID !== questionID);
        let currentQuestion = questions.filter(el=>el.questionID === questionID)[0];

        currentQuestion.slider = currentQuestion.slider.filter(el=>el.dropdownID !== dropdownID);
       
        currentQuestion.slider.map(( drp, drpel )=>{
            drp.dropdownID = drpel + 1;
            return 0;
        })

        questionsWithout.push(currentQuestion);
        questionsWithout.sort((a,b)=>(a.questionID > b.questionID ? 1 : -1));
        this.setState({ questions: questionsWithout });
    }

    dropdownWatchChange = ( e, dropdownID, questionID, keyName ) => {

        let questions = [...this.state.questions];
        let questionsWithout = questions.filter(el=>el.questionID !== questionID);
        let currentQuestion = questions.filter(el=>el.questionID === questionID)[0];
       
        let currentDropdown = currentQuestion.slider.filter(el=>el.dropdownID === dropdownID)[0];
        currentDropdown[`${keyName}`] = e.target.value.replace(/\D/,'');

        questionsWithout.push(currentQuestion);
        questionsWithout.sort((a,b)=>(a.questionID > b.questionID ? 1 : -1));
        this.setState({ questions: questionsWithout });

        if(this.state.timer){
            clearTimeout(this.state.timer);
        }
        
        this.setState({
            timer: setTimeout(()=>{
                this.updateQuestionsAndOptions();
            },500)
        })
    }

    test = () => {
        console.log(this.state);
    }

    render(){
        return(
            <>
                <div className = 'questions-section dropdown-type'>
                    <p>Slider choice questions:</p>
                    <div className = 'questions-container'>
                        {this.state.questions.map((option,el)=>{
                            return(
                            <div className = 'single-question dropdown-option-question slider-type' key = {el} data-option={option.questionID}>
                                <div className = 'q-p'><p>Question #: {option.questionID} <span className = 'remove-option' onClick = {(e)=>this.removeOption(option.questionID,2)} >x</span></p><p className = 'digvar'>dig_var{option.digvar}</p></div>
                                <TextField className = "question-text"   multiline label = "Question" value = {this.state.questions[el].questionText || ""} onChange = {(e)=>this.optionTextChange(e,option.questionID,"questionText",2)} />
                                {option.slider.map(( dropdown, dropdownIndex )=>{
                                    return(
                                        <div className = 'single-dropdown-option' key = {dropdownIndex} data-dropdowndefault={dropdown.isDefault}>
                                            <div className='option-id-container'><p className = 'option-id'>Option # {dropdown.dropdownID}</p></div>
                                            {!dropdown.isDefault && (
                                                <div className = 'remove-dropdown-option' onClick = {(e)=>this.removeDropdownOption( dropdown.dropdownID, option.questionID )} >X</div>
                                            )}
                                            <div className = "input-container">
                                                <TextField label = "Slider Min" value = { dropdown.sliderMin } onChange = { (e)=>this.dropdownWatchChange( e, dropdown.dropdownID, option.questionID, "sliderMin" ) } />
                                                <TextField label = "Slider Max" value = { dropdown.sliderMax } onChange = { (e)=>this.dropdownWatchChange( e, dropdown.dropdownID, option.questionID, "sliderMax" ) }/>
                                                <TextField label = "Slider Step" value = { dropdown.sliderStep } onChange = { (e)=>this.dropdownWatchChange( e, dropdown.dropdownID, option.questionID, "sliderStep" ) }/>
                                                <TextField label = "Slider Default" value = { dropdown.sliderDefault} onChange = { (e)=>this.dropdownWatchChange( e, dropdown.dropdownID, option.questionID, "sliderDefault" ) }/>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                        )})}
                    </div>
                    <Button className = "add-ui-button" variant="contained" endIcon={<AddIcon />} onClick = {(e)=>this.addOption(2)}>
                        Add Question
                    </Button>

                    {/* <Button className = "add-ui-button" variant="contained" endIcon={<AddIcon />} onClick = {(e)=>this.test()}>
                        test
                    </Button> */}
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
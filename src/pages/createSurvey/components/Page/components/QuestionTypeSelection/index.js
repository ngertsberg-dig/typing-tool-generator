import React from 'react';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import TuneIcon from '@mui/icons-material/Tune';
import "./index.sass";
import Button from '@mui/material/Button';

const QuestionTypeSelection = (props) =>{
    return(
        <>
            <p className='choose-type-p'>Choose type of question you will be asking on this page.</p>

            <div className = 'question-type'>
                <Button className = 'button-select-question-type' variant="outlined" onClick = {(e) => props.selectQuestionType(1)}>
                    <div className ='mc-container'>
                        <p>Multiple Choice</p>
                        <div className = 'mc-icons'>
                            <RadioButtonCheckedIcon />
                            <RadioButtonUncheckedIcon />
                        </div>
                    </div>
                </Button>

                <Button className = 'button-select-question-type' variant="outlined" onClick = {(e) => props.selectQuestionType(2)} style={{"marginLeft":"10px"}}>
                    <div className ='mc-container'>
                        <p>Dropdown Select</p>
                        <div className = 'mc-icons'>
                            <ArrowDropDownCircleIcon />
                        </div>
                    </div>
                </Button>

                <Button className = 'button-select-question-type' variant="outlined" onClick = {(e) => props.selectQuestionType(3)} style={{"marginLeft":"10px"}}>
                    <div className ='mc-container'>
                        <p>Slider</p>
                        <div className = 'mc-icons'>
                            <TuneIcon />
                        </div>
                    </div>
                </Button>

            </div>
            
        </>
    )
}
export default QuestionTypeSelection;
import React from 'react';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import Button from '@mui/material/Button';

const QuestionTypeSelection = (props) =>{
    return(
        <>
            <p className='choose-type-p'>Choose type of question you will be asking on this page.</p>

            <div className = 'question-type'>
                <Button variant="outlined" onClick = {(e) => props.selectQuestionType(1)}>
                    <div className ='mc-container'>
                        <p>Multiple Choice</p>
                        <div className = 'mc-icons'>
                            <RadioButtonCheckedIcon />
                            <RadioButtonUncheckedIcon />
                        </div>
                    </div>
                </Button>

                <Button variant="outlined" onClick = {(e) => props.selectQuestionType(2)} style={{"marginLeft":"10px"}}>
                    <div className ='mc-container'>
                        <p>Dropdown Select</p>
                        <div className = 'mc-icons'>
                            <ArrowDropDownCircleIcon />
                        </div>
                    </div>
                </Button>

            </div>
            
        </>
    )
}
export default QuestionTypeSelection;
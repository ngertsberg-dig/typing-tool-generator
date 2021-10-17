import React from 'react';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
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
            </div>
            
        </>
    )
}
export default QuestionTypeSelection;
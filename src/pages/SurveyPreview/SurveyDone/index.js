import React from 'react';
import Button from '@material-ui/core/Button';
import "./index.sass";

const SurveyDone= ({ surveyReset, apiResponse }) => {
    console.log("survey done")
    console.log(apiResponse)
    return(
        <div className = 'survey-done-results'>
            <div className = "survey-wrapper">
                <p className = 'message'>Thank you for your time. Your result is:</p>
                <p className = 'result'>{apiResponse['Segment Names'][apiResponse['Segment'][0]]}</p>
                <Button onClick = {surveyReset} variant="contained" color="primary">
                    RESET
                </Button>
            </div>
        </div>

    )
}

export default SurveyDone;
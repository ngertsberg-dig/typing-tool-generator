import React from 'react';
import Button from '@material-ui/core/Button';
import "./index.sass";

const ApiError = ({ surveyReset }) => {
    return(
        <div className = 'survey-api-error'>
            <div className = 'wrapper'>
                <p>There was an error processing your request, please try again.</p>
                <Button onClick = {surveyReset} variant="contained" color="primary">
                    RESET
                </Button>
            </div>
        </div>
    )
}

export default ApiError;
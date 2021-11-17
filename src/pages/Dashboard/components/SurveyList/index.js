import React from "react";
import "./index.sass";
import { withRouter } from 'react-router-dom';

const SurveyList = ({ surveys, tableRowClick, searchQuery, userID }) =>{
    return(
        <div className= 'survey-container' data-surveys={surveys.length}>
        <table className="studies-list table table-hover">
          <thead className="studies-list__header">
            <tr>
              <th className="studies-list__details">Study Name</th>
              <th className="studies-list__study-type">Study Type</th>
              <th className="studies-list__created">Date Created</th>
              <th className="studies-list__actions"></th>
            </tr>
          </thead>
          <tbody>
            {surveys.map(( survey, surveyIndex) =>(
              <>
                {parseInt(survey.survey_deleted) === 0 &&(
                  <>
                    {survey.survey_name.match(new RegExp(searchQuery, 'i')) !== null &&(
                      <tr onClick = {(e)=>tableRowClick(survey.id,e)} className = "study-list-item" key = {surveyIndex}>
                          <td><p className='survey-name'>{survey.survey_name}</p></td>
                          <td><div className="study-list-item__simulator-type-label conjoint">Conjoint</div></td>
                          <td><p className='survey-date'>{survey.survey_date}</p></td>
                          {survey.user_id === userID && (
                            <td className = "delete-survey">X</td>
                          )}
                      </tr>
                    )}
                  </>
                )}
              </>
            ))}    
          </tbody>  
        </table>
      </div>
    )
}

export default withRouter(SurveyList);
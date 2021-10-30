import React from "react";
import "./index.sass";
import { withRouter } from 'react-router-dom';

const SurveyList = ({ surveys, tableRowClick, searchQuery }) =>{
    return(
        <div className = 'survey-container' data-surveys={surveys.length}>
        <table class="studies-list table table-hover">
          <thead class="studies-list__header">
            <tr>
              <th class="studies-list__details">Study Name</th>
              <th class="studies-list__study-type">Study Type</th>
              <th class="studies-list__created">Date Created</th>
              <th class="studies-list__actions"></th>
            </tr>
          </thead>
          <tbody>
            {surveys.map(( survey, surveyIndex) =>(
              <>
                {parseInt(survey.survey_deleted) === 0 &&(
                  <>
                    {survey.survey_name.match(new RegExp(searchQuery, 'i')) !== null &&(
                      <tr onClick = {(e)=>tableRowClick(survey.id,e)} className = "study-list-item">
                          <td><p className='survey-name'>{survey.survey_name}</p></td>
                          <td><div class="study-list-item__simulator-type-label conjoint">Conjoint</div></td>
                          <td><p className='survey-date'>{survey.survey_date}</p></td>
                          <td className = "delete-survey">X</td>
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
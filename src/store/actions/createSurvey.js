import axiosConfig from "../../api/axiosConfig";
export const changePageTextVal = ( textField,newText, pageID ) => async (dispatch) => {
    dispatch({ type: "changePageTextVal", payload: { textField, newText, pageID } });
  };

export const updatePages = ( SurveyPages ) => async (dispatch) => {
    dispatch({ type: "updatePages", payload: { SurveyPages }});
};

export const REMOVE_PAGE = "REMOVE_PAGE";
export const removePage = ( pageID, newSurvey ) => ({ type: REMOVE_PAGE, pageID, newSurvey });


export const UPDATE_QUESTIONS_AND_ANSWERS = "UPDATE_QUESTIONS_AND_ANSWERS";
export const updateQuestionsAndOptions = ( questions, options, pageID, newSurvey ) => ({ type: UPDATE_QUESTIONS_AND_ANSWERS, questions, options, pageID, newSurvey });

export const UPDATE_PAGE_SUMMARY_TEXTFIELDS = "UPDATE_PAGE_SUMMARY_TEXTFIELDS";
export const changeTextVal = ( textField,newText,newSurvey ) => ({ type: UPDATE_PAGE_SUMMARY_TEXTFIELDS, textField,newText,newSurvey });

export const finishCreatingSurvey = ( surveyJSON ) => async (dispatch) =>{
  const axios = axiosConfig();
  try{
    const response = await axios.post("survey/createNewSurvey", { surveyJSON });
    if(response.status === 200){
      return { id:response.data, success:true} ;
    }
  }catch(error){console.log(error)}
}


export const getSurveyByID = ( surveyID ) => async (dispatch) =>{
  const axios = axiosConfig();
  try{
    const response = await axios.post("survey/getSurveyByID", { surveyID });
    if(response.status === 200){
      return { res: response.data, success: true };
    }

  }catch(err){console.log(err)}
}

export const setSurveyJSON = ( surveyJSON ) => async (dispatch) => {
  dispatch({ type: "setSurveyJSON", payload: { surveyJSON }});
};

export const resetNewSurvey = () => async (dispatch) => {
  dispatch({ type: "resetNewSurvey"});
};

export const UPDATE_QUESTION_TYPE = "UPDATE_QUESTION_TYPE";
export const questionTypeSelect = ( pageID, questionType, newSurvey ) => ({ type: UPDATE_QUESTION_TYPE, pageID, questionType, newSurvey });



export const updateExistingSurvey = ( newSurvey, userID, surveyID ) => async (dispatch) =>{
  const axios = axiosConfig();
  try{
    const response = await axios.post("survey/updateExistingSurvey", { newSurvey, userID, surveyID });
    if(response.status === 200){
      return { res: response.data, success: true };
    }

  }catch(err){console.log(err)}
}
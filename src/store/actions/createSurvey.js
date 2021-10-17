
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

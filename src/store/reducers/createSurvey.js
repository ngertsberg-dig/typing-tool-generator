const intialState = {
    newSurvey: {
        surveyName: "",
        apiURL: "",
        documentationURL: "",
        pages: []
    },
    newSurveyOriginalCopy: {
        surveyName: "",
        apiURL: "",
        documentationURL: "",
        pages: []
    },
    test:"test"
}

export default ( state = intialState, action ) => {
    switch(action.type){
        case "UPDATE_PAGE_SUMMARY_TEXTFIELDS_UPDATE":{
            return {...state, newSurvey: JSON.parse(JSON.stringify(action.newSurvey))};
        }
        case "updatePages":{
            let newState = {
                ...state,
                newSurvey:{
                    ...state.newSurvey,
                    pages: action.payload.SurveyPages
                }
            };
            return newState;
        }
        case "changePageTextVal":{
            let newState = {
                ...state,
                newSurvey:{
                    ...state.newSurvey,
                    pages: [...state.newSurvey.pages]
                }
            };
            newState.newSurvey.pages[action.payload.pageID - 1][`${action.payload.textField}`] = action.payload.newText;
            return newState;
        }
        case "REMOVE_PAGE_UPDATE":
            return {...state, newSurvey: JSON.parse(JSON.stringify(action.newSurvey))};
        case "UPDATE_QUESTIONS_AND_ANSWERS_UPDATE":
            return {...state, newSurvey: JSON.parse(JSON.stringify(action.newSurvey))};
        case "setSurveyJSON":
            return {...state, newSurvey: JSON.parse((action.payload.surveyJSON.survey_json))};
        case "resetNewSurvey":
            return {...state, newSurvey: JSON.parse(JSON.stringify(state.newSurveyOriginalCopy))};
        default:
            return state;
    }
}


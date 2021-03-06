const intialState = {
    newSurvey: {
        surveyName: "",
        apiURL: "",
        documentationURL: "",
        pages: [],
    },
    newSurveyOriginalCopy: {
        surveyName: "",
        apiURL: "",
        documentationURL: "",
        pages: []
    },
    digvarcount: 0
}

export default ( state = intialState, action ) => {
    switch(action.type){
        case "UPDATE_PAGE_SUMMARY_TEXTFIELDS_UPDATE":{
            return {...state, newSurvey: JSON.parse(JSON.stringify(action.newSurvey))};
        }
        case "updateDigVarCount":{
            return {...state, digvarcount: (state.digvarcount + 1)};
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
            return {...state, newSurvey: JSON.parse(JSON.stringify(action.newSurvey)), digvarcount: action.newDigVarCount};
        case "setSurveyJSON":
            return {...state, newSurvey: JSON.parse((action.payload.surveyJSON))};
        case "resetNewSurvey":
            return {...state, newSurvey: JSON.parse(JSON.stringify(state.newSurveyOriginalCopy)), digvarcount: 0};
        case "UPDATE_QUESTION_TYPE_REDUCER":
            return {...state, newSurvey: JSON.parse(JSON.stringify(action.newSurvey))};
        default:
            return state;
    }
}


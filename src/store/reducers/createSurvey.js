const intialState = {
    newSurvey: {
        surveyName: "",
        apiURL: "",
        documentationURL: "",
        pages: []
    },
    test:"test"
}

export default ( state = intialState, action ) => {
    switch(action.type){
        case "changeTextVal":{
            let newState = {...state};
            newState.newSurvey[`${action.payload.textField}`] = action.payload.newText;
            console.log(newState);
           //return {...state, newSurvey: JSON.parse(JSON.stringify(newState))};
            return {...state};
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
        case "REMOVE_PAGE":
            return {...state, newSurvey: JSON.parse(JSON.stringify(action.newSurvey))};
        case "UPDATE_QUESTIONS_AND_ANSWERS":
            return {...state, newSurvey: JSON.parse(JSON.stringify(action.newSurvey))};
        default:
            return state;
    }
}


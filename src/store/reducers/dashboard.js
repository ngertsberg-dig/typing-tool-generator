const intialState = {
    test: "yep",
    userID: 1,
    surveys: []
}

export default ( state = intialState, action ) => {
    switch(action.type){
        case "testTest":{
            const newState = {...state};
            newState.test = "nope";
            return newState;
        }
        case "getSurveys":{
            console.log("getsurveys reducer")
            const newState = {...state};
            newState.test = "nope";
            return newState;
        }
        default:
            return state;
    }
}
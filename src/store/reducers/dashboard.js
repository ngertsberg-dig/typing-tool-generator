const intialState = {
    test: "yep",
    userID: 1
}

export const dashboard = ( state = intialState, action ) => {
    switch(action.type){
        case "testTest":{
            const newState = {...state};
            newState.test = "nope";
            return newState;
        }
        default:
            return state;
    }
}
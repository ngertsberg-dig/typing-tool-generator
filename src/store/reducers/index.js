import { combineReducers } from "redux";
import createSurvey  from "./createSurvey";


export default combineReducers({
    createSurvey: createSurvey
});


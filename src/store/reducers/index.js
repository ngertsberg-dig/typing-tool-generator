import { combineReducers } from "redux";
import createSurvey  from "./createSurvey";
import dashboard  from "./dashboard";


export default combineReducers({
    createSurvey: createSurvey,
    dashboard: dashboard
});


import { combineReducers } from "redux";
import createSurvey  from "./createSurvey";
import dashboard  from "./dashboard";
import { user } from "./user";


export default combineReducers({
    createSurvey: createSurvey,
    dashboard: dashboard,
    user: user
});


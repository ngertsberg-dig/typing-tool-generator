import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers/";
import effects from "./middleware/createSurvey";

const store = createStore(reducer, applyMiddleware(thunk,effects));

export default store;

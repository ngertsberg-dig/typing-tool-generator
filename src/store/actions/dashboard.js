import axiosConfig from "../../api/axiosConfig";

export const getSurveys = userID => async (dispatch) => {
  const axios = axiosConfig();
  try{
    const res = await axios.post("survey/getSurveys", { userID });
    if(res.status === 200){
      return res.data;
    }
  }catch(err){console.log(err)}
}

export const deleteSurvey = ( userID, surveyID ) => async (dispatch) => {
  const axios = axiosConfig();
  try{
    const res = await axios.post("survey/deleteSurvey", { userID, surveyID });
    if(res.status === 200){
      return res.data;
    }
  }catch(err){console.log(err)}
}
import axiosConfig from "../../api/axiosConfig";

export const getSurveyPreviewJSON = ( userID, surveyID ) => async (dispatch) => {
  const axios = axiosConfig();
  try{
    const res = await axios.post("survey/getSurveyPreviewJSON", { userID, surveyID });
    if(res.status === 200){
      return res.data;
    }
  }catch(err){console.log(err)}
}
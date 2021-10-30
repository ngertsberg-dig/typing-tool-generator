const requestUserMiddleware = store => next => action => {
    if (action.type === 'REMOVE_PAGE') {
        const { pageID, newSurvey } = action;
        newSurvey.pages = newSurvey.pages.filter(page=>page.pageID !== pageID);
        newSurvey.pages.forEach((page,el)=>{
            page.pageID = (el + 1);
        });
        next({ type:"REMOVE_PAGE_UPDATE", newSurvey:action.newSurvey });
    }
    if (action.type === 'UPDATE_QUESTIONS_AND_ANSWERS') {
        const {  questions, options, pageID, newSurvey, } = action;
        let selectedPage = newSurvey.pages.filter(page=>page.pageID === pageID)[0];
        newSurvey.pages = newSurvey.pages.filter(page=>page.pageID !== pageID);
        selectedPage.questions = questions;
        selectedPage.options = options;
        newSurvey.pages.push(selectedPage);
        newSurvey.pages.sort((a,b)=> a.pageID > b.pageID ? 1 : -1)

        let newDigVarCount = 0;
        newSurvey.pages.map(page=>{
            if(page.questions){
                page.questions.map(question=>{
                    newDigVarCount = newDigVarCount + 1;  
                    question.digvar = newDigVarCount;
                    return 0;
                })
            }
            return 0;
        })
         
        next({ type:"UPDATE_QUESTIONS_AND_ANSWERS_UPDATE", newSurvey, newDigVarCount });
    }

    if(action.type === "UPDATE_PAGE_SUMMARY_TEXTFIELDS"){
        const { newSurvey, newText, textField } = action;
        newSurvey[`${textField}`] = newText;
        next({ type: "UPDATE_PAGE_SUMMARY_TEXTFIELDS_UPDATE", newSurvey });
    }

    if(action.type === "UPDATE_QUESTION_TYPE"){
        let { pageID, questionType, newSurvey } = action;
        let newSurveyCopy = {...newSurvey};
        let page = newSurveyCopy.pages.filter(el => el.pageID === pageID)[0];
        page["questionType"] = questionType;
        page.options = [];
        page.questions = [];
        newSurvey = newSurveyCopy;
        next({ type: "UPDATE_QUESTION_TYPE_REDUCER", newSurvey });
    }



    return next(action);
  };

export default requestUserMiddleware;
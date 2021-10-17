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
        next({ type:"UPDATE_QUESTIONS_AND_ANSWERS_UPDATE", newSurvey });
    }

    if(action.type === "UPDATE_PAGE_SUMMARY_TEXTFIELDS"){
        const { newSurvey, newText, textField } = action;
        newSurvey[`${textField}`] = newText;
        next({ type: "UPDATE_PAGE_SUMMARY_TEXTFIELDS_UPDATE", newSurvey });
    }

    return next(action);
  };

export default requestUserMiddleware;
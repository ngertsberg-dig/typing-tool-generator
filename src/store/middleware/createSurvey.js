const requestUserMiddleware = store => next => action => {
    if (action.type === 'REMOVE_PAGE') {
        const { pageID, newSurvey } = action;
        newSurvey.pages = newSurvey.pages.filter(page=>page.pageID !== pageID);

        newSurvey.pages.forEach((page,el)=>{
            page.pageID = (el + 1);
        });

        next({ type:"REMOVE_PAGE", newSurvey:action.newSurvey });
    }
    if (action.type === 'UPDATE_QUESTIONS_AND_ANSWERS') {
        const {  questions, options, pageID, newSurvey, } = action;
        let selectedPage = newSurvey.pages.filter(page=>page.pageID === pageID)[0];
        newSurvey.pages = newSurvey.pages.filter(page=>page.pageID !== pageID);
        selectedPage.questions = questions;
        selectedPage.options = options;
        newSurvey.pages.push(selectedPage);
        next({ type:"UPDATE_QUESTIONS_AND_ANSWERS", newSurvey });
    }
    return next(action);
  };

export default requestUserMiddleware;
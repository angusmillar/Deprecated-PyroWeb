class AjaxConstant { 
    static CallState = {
        Call_None: 'AjaxState_Call_None',
        Call_Pending: 'AjaxState_Call_Pending',
        Call_Complete: 'AjaxState_Call_Complete',
    };
    static CallCompletedState = {
        Completed_Ok: 'AjaxState_Completed_Ok',
        Completed_ResponseNotOk: 'AjaxState_Completed_ResponseNotOk',
        Completed_NoResponse: 'AjaxState_Completed_NoResponse',
        Completed_CallSetupFailed: 'AjaxState_Completed_CallSetupFailed',       
     };
}
export default AjaxConstant
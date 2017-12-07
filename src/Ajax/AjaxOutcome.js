
class AjaxOutcome {
    constructor(HttpStatus, AjaxCallCompletedState, FhirResource, ErrorMessage) {
        this.CallCompletedState = AjaxCallCompletedState;
        this.FhirResource = FhirResource;
        this.ErrorMessage = ErrorMessage;
        this.HttpStatus = HttpStatus;
    }            
}

export default AjaxOutcome
import axios from 'axios';
// import AppActionsMetadata from 'Actions/AppActionsMetadata';
import AppActions from '../Actions/AppActions';
// import AppActionsHiService from '../Actions/AppActionsHiService';
import AppDispatcher from '../Dispatcher/AppDispatcher';
import AppConstants from '../Constants/AppConstants';
import FhirServerConstant from '../Constants/FhirServerConstant';
import FhirConstant from '../Constants/FhirConstant'
import AjaxConstants from '../Constants/AjaxConstant';
import AjaxOutcome from '../Ajax/AjaxOutcome';

class PyroStu3Api {

    constructor() {

        //Pyro Server
        const ServerBaseUrl = `${FhirServerConstant.PyroStu3FhirServerEndpoint}/`;
        this.RequestConfig = {
            headers: {
                'Accept': FhirConstant.DefaultFhirJsonFormat,
                'Content-Type': FhirConstant.DefaultFhirJsonFormat
            },
            baseURL: ServerBaseUrl,
            timeout: FhirServerConstant.RequestTimeout,
            responseType: 'json'
        };

        this.dispatchToken = null;
    }

    getMetaData() {
        axios.get('metadata', this.RequestConfig)
            .then(function (response) {
                //Sucessful call return the data
                const OutCome = new AjaxOutcome(
                    response.status,
                    AjaxConstants.CallCompletedState.Completed_Ok,
                    response.data,
                    null);
                AppActions.setMetadata(OutCome);
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    //FHIR OperationOutcome should be recived
                    const OutCome = new AjaxOutcome(
                        error.response.status,
                        AjaxConstants.CallCompletedState.Completed_ResponseNotOk,
                        error.response.data,
                        `HTTP Status retured was: ${error.response.status}:${error.response.statusText}`);
                    AppActions.setMetadata(OutCome);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    // const OutCome = new AjaxOutcome(null, AjaxConstants.CallCompletedState.Completed_NoResponse, null, `The request was made but no response was received after ${this.RequestConfig.timeout / 1000} secs`);
                    const OutCome = new AjaxOutcome(
                        null,
                        AjaxConstants.CallCompletedState.Completed_NoResponse,
                        null,
                        `The request was made to the server ${FhirServerConstant.PyroStu3FhirServerEndpoint} yet no response was received after ${FhirServerConstant.RequestTimeout.toString()} secs`);
                    AppActions.setMetadata(OutCome);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    const OutCome = new AjaxOutcome(
                        null,
                        AjaxConstants.CallCompletedState.Completed_CallSetupFailed,
                        null,
                        `Something happened in setting up the request that triggered an Error. Message: ${error.message}`);
                    AppActions.setMetadata(OutCome);
                }
            }
            )
    }

    searchHiService(ParameterResource) {
        axios.post('Patient/$x-IHISearchOrValidate', ParameterResource, this.RequestConfig)
            .then(function (response) {
                //Sucessful call return the data
                const OutCome = new AjaxOutcome(
                    response.status,
                    AjaxConstants.CallCompletedState.Completed_Ok,
                    response.data,
                    null);
                AppActions.setHiService(OutCome);
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    //FHIR OperationOutcome should be recived
                    const OutCome = new AjaxOutcome(
                        error.response.status,
                        AjaxConstants.CallCompletedState.Completed_ResponseNotOk,
                        error.response.data,
                        `HTTP Status retured was: ${error.response.status}:${error.response.statusText}`);
                    AppActions.setHiService(OutCome);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    // const OutCome = new AjaxOutcome(null, AjaxConstants.CallCompletedState.Completed_NoResponse, null, `The request was made but no response was received after ${this.RequestConfig.timeout / 1000} secs`);
                    const OutCome = new AjaxOutcome(
                        null,
                        AjaxConstants.CallCompletedState.Completed_NoResponse,
                        null,
                        `The request was made to the server ${FhirServerConstant.PyroStu3FhirServerEndpoint} yet no response was received after ${FhirServerConstant.RequestTimeout.toString()} secs`);
                    AppActions.setHiService(OutCome);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    const OutCome = new AjaxOutcome(
                        null,
                        AjaxConstants.CallCompletedState.Completed_CallSetupFailed,
                        null,
                        `Something happened in setting up the request that triggered an Error. Message: ${error.message}`);
                    AppActions.setHiService(OutCome);
                }
            }
            )
    }
}

const PyroApiInstance = new PyroStu3Api();

PyroApiInstance.dispatchToken = AppDispatcher.register((payload) => {
    const action = payload.action;
    const source = payload.source;
    if (source == AppConstants.SOURCE_VIEW_ACTION) {
        switch (action.actionType) {
            case AppConstants.App_SearchHiService: {
                PyroApiInstance.searchHiService(action.data);
                break;
            }
            default:
                return;
        }
    } else if (source == AppConstants.SOURCE_API_ACTION) {
        return;
    } else if (source == AppConstants.SOURCE_APP_ACTION) {
        switch (action.actionType) {
            case AppConstants.App_GetMetadata: {
                PyroApiInstance.getMetaData();
                break;
            }
            default:
                return;
        }
    } else {
        return;
    }
});


export default PyroApiInstance;  
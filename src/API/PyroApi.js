import axios from 'axios';
import AppActionsMetadata from 'Actions/AppActionsMetadata';
import AppActionsHiService from '../Actions/AppActionsHiService';
import AppDispatcher from '../Dispatcher/AppDispatcher';
import AppConstants from '../Constants/AppConstants';
import FhirServerConstant from '../Constants/FhirServerConstant';
import FhirConstant from '../Constants/FhirConstant'
import AjaxConstants from '../Constants/AjaxConstant';
import AjaxOutcome from '../Ajax/AjaxOutcome';

import HiResourceRequest from '../Componets/HiService/TestHiServiceRequestResourceConstant';

class PyroApi {

    constructor() {

        //Pyro Server
        const ServerBaseUrl = `${FhirServerConstant.PrimaryFhirServerEndpoint}/`;
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

    // getPatient() {
    //     axios.get('Patient', this.RequestConfig)
    //         .then(function (response) {
    //             AppActions.setPatient({ HttpStatus: response.status, Resource: response.data });
    //         })
    //         .catch(function (error) {
    //             AppActions.setPatient({ HttpStatus: error.status, Resource: '' });
    //         });
    // }

    getMetaDataOLD() {
        axios.get('CapabilityStatement/PyroTest', this.RequestConfig)
            .then(function (response) {
                AppActionsMetadata.setMetadata({ HttpStatus: response.status, Resource: response.data });
            })
            .catch(function (error) {
                AppActionsMetadata.setMetadata({ HttpStatus: error.status, Resource: '' });
            });
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
                AppActionsMetadata.setMetadata(OutCome);
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
                        'HTTP Status retured was: ${error.response.status}!:${error.response.statusText}!');                    
                    AppActionsMetadata.setMetadata(OutCome);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    // const OutCome = new AjaxOutcome(null, AjaxConstants.CallCompletedState.Completed_NoResponse, null, `The request was made but no response was received after ${this.RequestConfig.timeout / 1000} secs`);
                    const OutCome = new AjaxOutcome(
                        null,
                        AjaxConstants.CallCompletedState.Completed_NoResponse,
                        null, `
                        The request was made to the server ${FhirServerConstant.PrimaryFhirServerEndpoint} yet no response was received after ${FhirServerConstant.RequestTimeout.toString()} secs`);
                    AppActionsMetadata.setMetadata(OutCome);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    const OutCome = new AjaxOutcome(
                        null,
                        AjaxConstants.CallCompletedState.Completed_CallSetupFailed,
                        null,
                        'Something happened in setting up the request that triggered an Error. Message: ${error.message}!');
                    AppActionsMetadata.setMetadata(OutCome);
                }
            }
            )
    }

    searchHiService() {
        axios.post('Patient/$x-IHISearchOrValidate', HiResourceRequest.Resource, this.RequestConfig)
            .then(function (response) {
                //Sucessful call return the data
                const OutCome = new AjaxOutcome(
                    response.status,
                    AjaxConstants.CallCompletedState.Completed_Ok,
                    response.data,
                    null);
                    AppActionsHiService.setHiService(OutCome);
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
                        'HTTP Status retured was: ${error.response.status}!:${error.response.statusText}!');                    
                        AppActionsHiService.setHiService(OutCome);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    // const OutCome = new AjaxOutcome(null, AjaxConstants.CallCompletedState.Completed_NoResponse, null, `The request was made but no response was received after ${this.RequestConfig.timeout / 1000} secs`);
                    const OutCome = new AjaxOutcome(
                        null,
                        AjaxConstants.CallCompletedState.Completed_NoResponse,
                        null, `
                        The request was made to the server ${FhirServerConstant.PrimaryFhirServerEndpoint} yet no response was received after ${FhirServerConstant.RequestTimeout.toString()} secs`);
                        AppActionsHiService.setHiService(OutCome);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    const OutCome = new AjaxOutcome(
                        null,
                        AjaxConstants.CallCompletedState.Completed_CallSetupFailed,
                        null,
                        'Something happened in setting up the request that triggered an Error. Message: ${error.message}!');
                        AppActionsHiService.setHiService(OutCome);
                }
            }
            )
    }

}

const PyroApiInstance = new PyroApi();

PyroApiInstance.dispatchToken = AppDispatcher.register((payload) => {
    const action = payload.action;
    switch (action.actionType) {
        // case AppConstants.App_GetPatient:
        //     {
        //         PyroApiInstance.getPatient();
        //         break;
        //     }
        case AppConstants.App_GetMetadata:
            {
                PyroApiInstance.getMetaData();
                break;
            }
       case AppConstants.App_SearchHiService:
            {
                PyroApiInstance.searchHiService();
                break;
            }            
        default:
            return;
    }

});


export default PyroApiInstance;  
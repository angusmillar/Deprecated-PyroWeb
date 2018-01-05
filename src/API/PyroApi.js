import axios from 'axios';
import AppActionsMetadata from 'Actions/AppActionsMetadata';
import AppDispatcher from '../Dispatcher/AppDispatcher';
import AppConstants from '../Constants/AppConstants';
import AjaxConstants from '../Constants/AjaxConstant';
import AjaxOutcome from '../Ajax/AjaxOutcome';

class PyroApi {

    constructor() {
        //GG's Server
        //const ServerBaseUrl = 'http://test.fhir.org/r3/';
        //Pyro Server
        const ServerBaseUrl = 'https://pyrohealth.net/test/stu3/fhir/';
        this.RequestConfig = {
            headers: {
                'Accept': 'application/fhir+json',
                'Content-Type': 'application/fhir+json'
            },
            baseURL: ServerBaseUrl,
            timeout: 40000, 
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
//Test 'CapabilityStatement/PyroTest'
    getMetaData() {
        axios.get('metadata', this.RequestConfig)
            .then(function (response) {
                const OutCome = new AjaxOutcome(response.status, AjaxConstants.CallCompletedState.Completed_Ok, response.data, null);
                AppActionsMetadata.setMetadata(OutCome);
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    //FHIR OperationOutcome should be recived
                    const OutCome = new AjaxOutcome(error.response.status, AjaxConstants.CallCompletedState.Completed_ResponseNotOk, error.response.data, 'HTTP Status retured was: ${error.response.status}!:${error.response.statusText}!');                    
                    AppActionsMetadata.setMetadata(OutCome);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    // const OutCome = new AjaxOutcome(null, AjaxConstants.CallCompletedState.Completed_NoResponse, null, `The request was made but no response was received after ${this.RequestConfig.timeout / 1000} secs`);
                    const OutCome = new AjaxOutcome(null, AjaxConstants.CallCompletedState.Completed_NoResponse, null, `The request was made but no response was received after 40 secs`);
                    AppActionsMetadata.setMetadata(OutCome);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    const OutCome = new AjaxOutcome(null, AjaxConstants.CallCompletedState.Completed_CallSetupFailed, null, 'Something happened in setting up the request that triggered an Error. Message: ${error.message}!');
                    AppActionsMetadata.setMetadata(OutCome);
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
        default:
            return;
    }

});


export default PyroApiInstance;  
import axios from 'axios';
import AppActionsMetadata from 'Actions/AppActionsMetadata';
import AppDispatcher from '../Dispatcher/AppDispatcher';
import AppConstants from '../Constants/AppConstants';

class PyroApi {

    constructor() {
        //const ServerBaseUrl = 'http://localhost:8888/test/stu3/fhir/';
        const ServerBaseUrl = 'http://pyrohealth.net/test/stu3/fhir/';
        this.RequestConfig = {
            headers: {
                'Accept': 'application/fhir+json',
                'Content-Type': 'application/fhir+json'
            },
            baseURL: ServerBaseUrl,
            timeout: 20000,
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

    getMetaData() {
        axios.get('metadata', this.RequestConfig)
            .then(function (response) {
                AppActionsMetadata.setMetadata({ HttpStatus: response.status, Resource: response.data });
            })
            .catch(function (error) {
                AppActionsMetadata.setMetadata({ HttpStatus: error.status, Resource: '' });
            });
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
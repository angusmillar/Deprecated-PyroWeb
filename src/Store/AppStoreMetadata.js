import FluxStore from './Store';
import AppDispatcher from '../Dispatcher/AppDispatcher';
import AppConstants from '../Constants/AppConstants';

let MetadataState = reset();

function reset() {
    MetadataState = {
        AjaxState: AppConstants.AjaxState.Call_None,
        HttpStatus: null,
        Resource: null
    };
}

function pendingCall() {
    MetadataState = {
        AjaxState: AppConstants.AjaxState.Call_Pending,
        HttpStatus: null,
        Resource: null
    };
}

function completeCall(data) {
    MetadataState = {
        AjaxState: AppConstants.AjaxState.Call_Complete,
        HttpStatus: data.HttpStatus,
        Resource: data.Resource
    };
}

class AppStoreMetadata extends FluxStore {
    constructor() {
        super();
    }
    getState() {
        return MetadataState;
    }
}

const appStoreInstance = new AppStoreMetadata();

appStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
    const action = payload.action;
    switch (action.actionType) {
        case AppConstants.APP_INITIALIZED:
            reset();
            break;
        case AppConstants.App_GetMetadata:
            pendingCall();
            break;
        case AppConstants.App_SetMetadata:
            completeCall(action.data);
            break;
        default:
            return;
    }

    appStoreInstance.emitChange();

});

export default appStoreInstance;
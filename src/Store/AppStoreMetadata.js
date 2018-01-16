import FluxStore from './Store';
import AppDispatcher from '../Dispatcher/AppDispatcher';
import AppConstants from '../Constants/AppConstants';
import AjaxConstant from '../Constants/AjaxConstant';


let MetadataState = reset();

function reset() {
    MetadataState = {
        AjaxCallState: AjaxConstant.CallState.Call_None,
        AjaxOutcome: null
    };
}

function pendingCall() {
    MetadataState = {
        AjaxCallState: AjaxConstant.CallState.Call_Pending,
        AjaxOutcome: null
    };
}

function completeCall(item) {
    MetadataState = {
        AjaxCallState: AjaxConstant.CallState.Call_Complete,
        AjaxOutcome: item
    }
}



class AppStoreMetadata extends FluxStore {
    constructor() {
        super();
    }
    getState() {
        return MetadataState;
    }
}

const AppStoreInstance = new AppStoreMetadata();

AppStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
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

    AppStoreInstance.emitChange();

});

export default AppStoreInstance;
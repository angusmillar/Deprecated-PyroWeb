import FluxStore from './Store';
import AppDispatcher from '../Dispatcher/AppDispatcher';
import AppConstants from '../Constants/AppConstants';
import FhirServerConstant from '../Constants/FhirServerConstant';
import AjaxConstant from '../Constants/AjaxConstant';


let MetadataState = reset();

function reset() {
    MetadataState = {
        AjaxCallState: AjaxConstant.CallState.Call_None,
        AjaxOutcome: null,
        FhirServerName: FhirServerConstant.PyroServerStu3Name
    };
}

function pendingCall() {
    MetadataState = {
        AjaxCallState: AjaxConstant.CallState.Call_Pending,
        AjaxOutcome: null,
        FhirServerName: FhirServerConstant.PyroServerStu3Name
    };
}

function completeCall(item) {
    MetadataState = {
        AjaxCallState: AjaxConstant.CallState.Call_Complete,
        AjaxOutcome: item,
        FhirServerName: FhirServerConstant.PyroServerStu3Name
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
    const source = payload.source;
    if (source == AppConstants.SOURCE_VIEW_ACTION) {
        return;
    } else if (source == AppConstants.SOURCE_API_ACTION) {
        switch (action.actionType) {
            case AppConstants.App_SetMetadata:
                completeCall(action.data);
                break;
            default:
                return;
        }
    } else if (source == AppConstants.SOURCE_APP_ACTION) {
        switch (action.actionType) {
            case AppConstants.App_InitialiseMetadataStore:
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
    } else {
        return;
    }

    AppStoreInstance.emitChange();

});

export default AppStoreInstance;
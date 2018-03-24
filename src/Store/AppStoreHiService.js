import FluxStore from './Store';
import AppDispatcher from '../Dispatcher/AppDispatcher';
import AppConstants from '../Constants/AppConstants';
import AjaxConstant from '../Constants/AjaxConstant';


let HiServiceState = reset();

function reset() {
    HiServiceState = {
        AjaxCallState: AjaxConstant.CallState.Call_None,
        AjaxOutcome: null
    };
}

function pendingCall() {
    HiServiceState = {
        AjaxCallState: AjaxConstant.CallState.Call_Pending,
        AjaxOutcome: null
    };
}

function completeCall(item) {
    HiServiceState = {
        AjaxCallState: AjaxConstant.CallState.Call_Complete,
        AjaxOutcome: item
    }
}

function searchCall(item) {
    HiServiceState = {
        AjaxCallState: AjaxConstant.CallState.Call_Pending,
        AjaxOutcome: item
    }
}


class AppStoreHiService extends FluxStore {
    constructor() {
        super();
    }
    getState() {
        return HiServiceState;
    }
}

const AppStoreInstance = new AppStoreHiService();

AppStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
    const action = payload.action;
    switch (action.actionType) {
        case AppConstants.APP_INITIALIZED:
            reset();
            break;
        case AppConstants.App_GetHiService:
            pendingCall();
            break;
        case AppConstants.App_SetHiService:
            completeCall(action.data);
            break;
        case AppConstants.App_SearchHiService:
            searchCall(action.data);
            break;
        default:
            return;
    }

    AppStoreInstance.emitChange();

});

export default AppStoreInstance;
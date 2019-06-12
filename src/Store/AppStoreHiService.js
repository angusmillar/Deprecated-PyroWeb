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

// function pendingCall() {
//     HiServiceState = {
//         AjaxCallState: AjaxConstant.CallState.Call_Pending,
//         AjaxOutcome: null
//     };
// }

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


class FluxStoreHiService extends FluxStore {
    constructor() {
        super();
    }
    getState() {
        return HiServiceState;
    }
}

const HiStoreInstance = new FluxStoreHiService();

HiStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
    const action = payload.action;
    const source = payload.source;
    if (source == AppConstants.SOURCE_VIEW_ACTION) {
        switch (action.actionType) {
            case AppConstants.App_SearchHiService:
                searchCall(action.data);
                break;
            default:
                return;
        }
    } else if (source == AppConstants.SOURCE_API_ACTION) {
        switch (action.actionType) {
            case AppConstants.App_SetHiService:
                completeCall(action.data);
                break;
            default:
                return;
        }
    } else if (source == AppConstants.SOURCE_APP_ACTION) {
        switch (action.actionType) {
            case AppConstants.App_InitialiseHiServiceStore:
                reset();
                break;
            default:
                return;
        }

    }
    else {
        return;
    }    

    HiStoreInstance.emitChange();

});

export default HiStoreInstance;
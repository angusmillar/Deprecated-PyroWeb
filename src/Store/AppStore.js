import FluxStore from './Store';
import AppDispatcher from '../Dispatcher/AppDispatcher';
import AppConstants from '../Constants/AppConstants';

let appState = {};

function reset() {
    appState = { HttpStatus: '0', Resource: null };
}


class AppStore extends FluxStore {
    constructor() {
        super();
    }
    getState() {
        return appState;
    }
}

const appStoreInstance = new AppStore();

appStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
    const action = payload.action;
    switch (action.actionType) {
        case AppConstants.APP_INITIALIZED:
            reset();
            break;
        case AppConstants.ADD_ITEM:
            appState = action.data;
            break;
        case AppConstants.APP_RESET:
            reset();
            break;
        case AppConstants.App_GetPatient:
            reset();
            break;
        case AppConstants.App_SetPatient:
            appState = action.data;
            break;
        default:
            return;
    }

    appStoreInstance.emitChange();

});

export default appStoreInstance;
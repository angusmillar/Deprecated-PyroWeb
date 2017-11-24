import FluxStore from './Store';
import AppDispatcher from '../Dispatcher/AppDispatcher';
import AppConstants from '../Constants/AppConstants';

let appState = { given: 'John', family: 'Dow' };

function reset() {
    appState = {};
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

appStoreInstance.dispatchToken = AppDispatcher.register((action) => {

    switch (action.source) {
        case AppConstants.APP_INITIALIZED:
            reset();
            appState.given = 'Unkown';
            appState.family = 'Person'
            break;
        /* falls through */
        case AppConstants.ADD_ITEM:
            appState = action.action.data;
            //appState.family = action.action.given;
            break;

        // case ActionTypes.APP_RESET:
        //   reset();
        //   break;

        // case ActionTypes.POUCH_ERROR:
        //   appState.message = 'Local database error: ' + action.error.message;
        //   break;

        default:
            return;
    }

    appStoreInstance.emitChange();

});

export default appStoreInstance;
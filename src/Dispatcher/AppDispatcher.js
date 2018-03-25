import { Dispatcher } from 'flux';
import AppConstants from '../Constants/AppConstants'

class DispatcherClass extends Dispatcher {

    //User triggered action
    handleViewAction(action) {
        this.dispatch({
            source: AppConstants.SOURCE_VIEW_ACTION,
            action,
        });        
    }
    //External API action
    handleApiAction(action) {
        this.dispatch({
            source: AppConstants.SOURCE_API_ACTION,
            action,
        });
    }
    //Internal web app action
    handleAppAction(action) {
        this.dispatch({
            source: AppConstants.SOURCE_APP_ACTION,
            action,
        });
    }
}

const AppDispatcher = new DispatcherClass();

export default AppDispatcher;  
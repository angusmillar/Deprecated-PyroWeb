import { Dispatcher } from 'flux';
import AppConstants from '../Constants/AppConstants';

class DispatcherClass extends Dispatcher {

    handleViewAction(action) {
        this.dispatch({
            source: AppConstants.ADD_ITEM,
            action,
        });
    }
}

const AppDispatcher = new DispatcherClass();

export default AppDispatcher;  
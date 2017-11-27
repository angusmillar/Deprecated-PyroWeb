import { Dispatcher } from 'flux';

class DispatcherClass extends Dispatcher {

    handleViewAction(action) {
        this.dispatch({
            source: 'VIEW_ACTION',
            action,
        });        
    }

    handleApiAction(action) {
        this.dispatch({
            source: 'API_ACTION',
            action,
        });
    }
}

const AppDispatcher = new DispatcherClass();

export default AppDispatcher;  
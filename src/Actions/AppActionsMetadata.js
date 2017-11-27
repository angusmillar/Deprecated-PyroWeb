import AppDispatcher from '../Dispatcher/AppDispatcher';
import AppConstants from '../Constants/AppConstants';
import PyroApi from 'API/PyroApi';

const AppActions = {
  
  initialiseStore() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.APP_INITIALIZED
    })
  },
  getMetadata() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.App_GetMetadata,      
    })
  },
  setMetadata(item) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.App_SetMetadata,
      data: item
    })
  }
};

export default AppActions;  
import AppDispatcher from '../Dispatcher/AppDispatcher';
import AppConstants from '../Constants/AppConstants';
import PyroApi from 'API/PyroApi';

const AppActionsHiService = {
  
  initialiseStore() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.APP_INITIALIZED
    })
  },
  getHiService() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.App_GetHiService,      
    })
  },
  setHiService(item) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.App_SetHiService,
      data: item
    })
  },
  searchHiService(item) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.App_SearchHiService,
      data: item
    })
  }
};

export default AppActionsHiService;  
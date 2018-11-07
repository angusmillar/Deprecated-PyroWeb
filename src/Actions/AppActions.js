import AppDispatcher from '../Dispatcher/AppDispatcher';
import AppConstants from '../Constants/AppConstants';
// import PyroStu3Api from 'API/PyroStu3Api';
// import PyroR4Api from 'API/PyroR4Api';

const AppActions = {

  //View Actions -----------------------------------------------------


  getHiService() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.App_GetHiService,      
    })
  },
  
  searchHiService(item) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.App_SearchHiService,
      data: item
    })
  },
  
  // Api Actions -----------------------------------------------------
  
  setMetadata(item) {
    AppDispatcher.handleApiAction({
      actionType: AppConstants.App_SetMetadata,
      data: item
    })
  },

  setHiService(item) {
    AppDispatcher.handleApiAction({
      actionType: AppConstants.App_SetHiService,
      data: item
    })
  },
  //App Actions -----------------------------------------------------
  
  initialiseHiServiceStore() {
    AppDispatcher.handleAppAction({
      actionType: AppConstants.App_InitialiseHiServiceStore
    })
  },

  initialiseMetadataStore() {
    AppDispatcher.handleAppAction({
      actionType: AppConstants.App_InitialiseMetadataStore
    })
  },

  getMetadata() {
    AppDispatcher.handleAppAction({
      actionType: AppConstants.App_GetMetadata,      
    })
  },

};

export default AppActions;  
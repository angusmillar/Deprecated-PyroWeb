import AppDispatcher from '../Dispatcher/AppDispatcher';
import AppConstants from '../Constants/AppConstants';
// import PyroStu3Api from 'API/PyroStu3Api';
// import PyroR4Api from 'API/PyroR4Api';

const AppActions = {

  //#######################################################################
  //#### View Actions #####################################################
  //#######################################################################
  
  // HI Service -----------------------------------------
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
  
  // Fhir Search Store ----------------------------------

  onResourceFilterChange(item) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.App_SearchResourceChange,
      data: item
    })
  },

  onSearchFilterChange(item) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.App_SearchFilterChange,
      data: item
    })
  },

  onEditSearchParameter(item) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.App_EditSearchParameter,
      data: item
    })
  },

  onAddSearchParameter(item) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.App_AddSearchParameter,
      data: item
    })
  },

  onRemoveSearchParameter(item) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.App_RemoveSearchParameter,
      data: item
    })
  },

  onShowSearchParameterEdit(item) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.App_ShowSearchParameterEdit,
      data: item
    })
  },

  onHideSearchParameterEdit(item) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.App_HideSearchParameterEdit,
      data: item
    })
  },

  //#######################################################################
  //#### Api Actions ######################################################
  //#######################################################################
  
  // HI Service -----------------------------------------
  setHiService(item) {
    AppDispatcher.handleApiAction({
      actionType: AppConstants.App_SetHiService,
      data: item
    })
  },

  // MetaData -------------------------------------------
  setMetadata(item) {
    AppDispatcher.handleApiAction({
      actionType: AppConstants.App_SetMetadata,
      data: item
    })
  },


  //#######################################################################
  //#### App Actions ######################################################
  //#######################################################################
  
  // HI Service ------------------------------------------
  initialiseHiServiceStore() {
    AppDispatcher.handleAppAction({
      actionType: AppConstants.App_InitialiseHiServiceStore
    })
  },

  // MetaData --------------------------------------------
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

  // Fhir Search Store -----------------------------------
  initialiseFhirSearchStore(item) {
    AppDispatcher.handleAppAction({
      actionType: AppConstants.App_InitialiseFhirSearchStore,
      data: item
    })
  },

  

};

export default AppActions;  
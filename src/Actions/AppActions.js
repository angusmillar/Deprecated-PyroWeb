import AppDispatcher from '../Dispatcher/AppDispatcher';
import AppConstants from '../Constants/AppConstants';

const AppActions = {  

    addItem(item){
      AppDispatcher.handleViewAction({
        actionType: AppConstants.ADD_ITEM,
        data: item
      });
    },
    removeItem(index) {
        AppDispatcher.handleAction({
            actionType: AppConstants.REMOVE_ITEM,
            data: index
        })
    }

  };
  
  export default AppActions;  
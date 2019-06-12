import FluxStore from './Store';
import AppDispatcher from '../Dispatcher/AppDispatcher';
import AppConstants from '../Constants/AppConstants';
import FhirConstant from '../Constants/FhirConstant';
// import FhirServerConstant from '../Constants/FhirServerConstant';
// import AjaxConstant from '../Constants/AjaxConstant';
import FhirSearchParameterFactory from '../Constants/FhirSearchParameterFactory';

import filter from 'lodash/filter';
import findIndex from 'lodash/findIndex';
import find from 'lodash/find';




let State = null;

function initialiseFhirSearchStore(conformanceStatmentResource) {
    State = {
        conformanceStatmentResource,
        selectedResource: [{ key: 'none', icon: 'tag', text: 'none', value: 'none' }],
        resourceElement: null,
        selectedSearch: 'none',
        selectedSearchElement: null,
        searchParameterList: [],
        encodingType: FhirConstant.DefaultFhirJsonFormat,
        summaryType: FhirConstant.searchSummaryType.none,
    };
}

function onResourceFilterChange(resourceType) {
    const ResourceArray = filter(State.conformanceStatmentResource.rest[0].resource, { 'type': resourceType });
    State.selectedResource = resourceType;
    State.resourceElement = ResourceArray[0];
}

function onSearchFilterChange(searchType) {
    State.selectedSearch = searchType;
    State.selectedSearchElement = find(State.resourceElement.searchParam, { 'name': searchType });
    const newSearchParameter = FhirSearchParameterFactory.create(State.selectedSearchElement.type, State.selectedSearch);
    State.searchParameterList = [...State.searchParameterList, newSearchParameter];
}

function onEditSearchParameter(searchParameter) {

    const newSearchParameter = {
        id: searchParameter.submittedId,
        searchParameterName: searchParameter.submittedSearchParameterName,
        type: searchParameter.submittedType,
        modifier: searchParameter.submittedModifier,
        isVisable: searchParameter.submittedIsVisable,
        orList: searchParameter.submittedOrList,
    }

    const newSearchParameterList = State.searchParameterList.slice(0);
    const targetIndex = findIndex(newSearchParameterList, { id: newSearchParameter.id })
    newSearchParameterList.splice(targetIndex, 1, newSearchParameter);
    State.searchParameterList = newSearchParameterList;
}

function onAddSearchParameter(InstanceId) {
    //We only need to find the instance with the id and set the isVisable to false
    //as the instance is already added to the saved list from the dropdown select, this 
    //just hides the instance from the user as commited/added.   
    const targetIndex = findIndex(State.searchParameterList, { id: InstanceId })
    //toggel boolean
    State.searchParameterList[targetIndex].isVisable = false;
}

function onRemoveSearchParameter(InstanceId) {    
    const newSearchParameterList = filter(State.searchParameterList, (x) => x.id != InstanceId);
    State.searchParameterList = newSearchParameterList

}

function onShowSearchParameterEdit(InstanceId) {
    const targetIndex = findIndex(State.searchParameterList, { id: InstanceId })
    //toggel / reverse boolean
    State.searchParameterList[targetIndex].isVisable = !State.searchParameterList[targetIndex].isVisable;    
}

function onHideSearchParameterEdit(InstanceId) {
    const targetIndex = findIndex(State.searchParameterList, { id: InstanceId })
    //toggel / reverse boolean
    State.searchParameterList[targetIndex].showEdit = false;    
}

class FluxStoreFhirSearch extends FluxStore {
    constructor() {
        super();
    }
    getState() {
        return State;
    }
}

const AppStoreFhirSearch = new FluxStoreFhirSearch();

AppStoreFhirSearch.dispatchToken = AppDispatcher.register((payload) => {
    const action = payload.action;
    const source = payload.source;

    if (source == AppConstants.SOURCE_API_ACTION) {
        return;
    } else if (source == AppConstants.SOURCE_VIEW_ACTION) {
        switch (action.actionType) {
            case AppConstants.App_SearchResourceChange:
                onResourceFilterChange(action.data);
                break;
            case AppConstants.App_SearchFilterChange:
                onSearchFilterChange(action.data);
                break;
            case AppConstants.App_EditSearchParameter:
                onEditSearchParameter(action.data);
                break;
            case AppConstants.App_AddSearchParameter:
                onAddSearchParameter(action.data);
                break;
            case AppConstants.App_RemoveSearchParameter:
                onRemoveSearchParameter(action.data);
                break;
            case AppConstants.App_ShowSearchParameterEdit:
                onShowSearchParameterEdit(action.data);
                break;
            case AppConstants.App_HideSearchParameterEdit:
                onHideSearchParameterEdit(action.data);
                break;
            default:
                return;
        }
    } else if (source == AppConstants.SOURCE_APP_ACTION) {
        switch (action.actionType) {
            case AppConstants.App_InitialiseFhirSearchStore:
                initialiseFhirSearchStore(action.data);
                break;
            default:
                return;
        }
    } else {
        return;
    }

    AppStoreFhirSearch.emitChange();

});

export default AppStoreFhirSearch;
import React from 'react';

import { Grid, Form, Button, Icon, Divider } from 'semantic-ui-react'

import map from 'lodash/map';
import filter from 'lodash/filter';
import find from 'lodash/find';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import split from 'lodash/split';
import PropTypes from 'prop-types';
import FhirConstant from '../../../Constants/FhirConstant';
import UuidSupport from '../../../SupportTools/UuidSupport';

import SearchTypeFrame from './SearchTypeFrame';
// import Token from './Token';
// import String from './String';
// import Quantity from './Quantity';
// import DateTime from './DateTime';
// import Uri from './Uri';
// import Number from './Number';

import ReferenceRelative from './ReferenceRelative';
import ReferenceAbsolute from './ReferenceAbsolute';
import ReferenceChained from './ReferenceChained';
import ReferenceTypeButton from './ReferenceTypeButton';
import SearchOrButton from './SearchOrButton';

export default class ReferenceNew extends React.Component {

    static propTypes = {
        onEdit: PropTypes.func.isRequired,
        resourceList: PropTypes.array.isRequired,
        resourceSelectOptions: PropTypes.array.isRequired,
        onOrAddRemoveClick: PropTypes.func,
        onRemoveChainClick: PropTypes.func,
        id: PropTypes.string,
        resource: PropTypes.string,
        resourceId: PropTypes.string,
        url: PropTypes.string,
        selectedSearch: PropTypes.string,
        childReferenceElement: PropTypes.object,
        modifier: PropTypes.string,
        isFirst: PropTypes.bool,
        referenceType: PropTypes.string,
        endValueElement: PropTypes.object
    }

    static defaultProps = {
        id: UuidSupport.createGUID(),
        resource: '',
        resourceId: '',
        url: '',
        selectedSearch: '',
        modifier: 'none',
        addOrButton: false,
        isFirst: false,
        referenceType: FhirConstant.referenceType.relative,
        childReferenceElement: {},
        endValueElement: null
    }

    constructor(props) {
        super(props);

        //Use the provided ResourceName but if not provided and the resourceoptions list
        //only contains 1 option then make this the selected resourceName
        const getSelectedResourceName = () => {
            if (this.props.resource != '') {
                return this.props.resource;
            } else {
                if (this.props.resourceSelectOptions.length == 1) {
                    return this.props.resourceSelectOptions[0].value;
                } else {
                    return 'none';
                }
            }
        }

        const selectedResourceName = getSelectedResourceName();

        const resourceElement = find(this.props.resourceList, { 'type': selectedResourceName });

        const testEndValueElement = this.props.endValueElement;

        this.state = {
            resource: selectedResourceName,
            resourceId: this.props.resourceId,
            url: this.props.url,
            modifier: this.props.modifier,
            referenceType: this.props.referenceType,
            selectedResourceElement: resourceElement,
            selectedSearch: this.props.selectedSearch,
            searchElement: null,
            savedSearchParameters: [],
            childReferenceElement: this.props.childReferenceElement,
            resourceSelectOptions: this.props.resourceSelectOptions,
            endValueElement: this.props.endValueElement
        };
    }

    static getDerivedStateFromProps(props, state) {
        const test1 = props.endValueElement;
        state.endValueElement = props.endValueElement;
        return state;
    } 

    static getChainSearchResourceOptions(SearchIncludeList, SearchParameterName) {
        const mappedIncludeList = () => {
            return (map(SearchIncludeList, function (item) {
                const itemSplit = split(item, ':');
                const paramName = itemSplit[1];
                const resourceName = itemSplit[2];
                return { searchParameterName: paramName, resource: resourceName };
            }))
        }
        const filteredIncludeList = filter(mappedIncludeList(), { 'searchParameterName': SearchParameterName });

        return (map(filteredIncludeList, function (item) {
            return { key: item.resource, icon: 'tag', text: item.resource, value: item.resource };
        }))
    }

    getSubmitted = () => {
        return (
            {
                submittedId: this.props.id,
                submittedType: FhirConstant.searchType.reference,
                submittedResourceSelectOptions: this.props.resourceSelectOptions,
                submittedParentResourceElement: this.state.selectedResourceElement,
                submittedResourceId: this.state.resourceId,
                submittedUrl: this.state.url,
                submittedResource: this.state.resource,
                submittedSelectedSearch: this.state.selectedSearch,
                submittedModifier: this.state.modifier,
                submittedReferenceType: this.state.referenceType,
                submittedChildReferenceElement: this.state.childReferenceElement,
                submittedEndValueElement: this.state.endValueElement
            }
        )
    }

    //We have events from the resourceID and Resource selector of Referance but then
    //we also have events bubbling up from any type (number, String, Quantity) or even reference its self. These
    //bubbled events are not synthetic and have no e.preventDefault() or e.target.
    onEdit = (e) => {
        const submitted = this.getSubmitted();

        if (!isNil(e.target)) {
            e.preventDefault()
            const target = e.target;
            const value = target.value;
            const name = target.name;

            this.setState({
                [name]: value
            });

            if (name == 'resourceId') {
                submitted.submittedResourceId = value;
            }

            this.props.onEdit(submitted);


        } else {

            let newChildReferenceElement = {};
            switch (e.submittedType) {
                case FhirConstant.searchType.quantity:
                    // newChainList.push({ id: e.submittedId, type: e.submittedType, prefix: e.submittedPrefix, number: e.submittedNumber, system: e.submittedSystem, code: e.submittedCode });
                    break;
                case FhirConstant.searchType.string:
                    // newChainList.push({ id: e.submittedId, type: e.submittedType, string: e.submittedString });
                    newChildReferenceElement = { id: e.submittedId, type: e.submittedType, string: e.submittedString };
                    break;
                case FhirConstant.searchType.token:

                    break;
                case FhirConstant.searchType.date:

                    break;
                case FhirConstant.searchType.uri:

                    break;
                case FhirConstant.searchType.number:

                    break;
                case FhirConstant.searchType.reference: {

                    newChildReferenceElement = {
                        id: e.submittedId,
                        type: e.submittedType,
                        selectedResourceElement: e.submittedParentResourceElement,
                        resourceSelectOptions: e.submittedResourceSelectOptions,
                        modifier: e.submittedModifier,
                        resource: e.submittedResource,
                        resourceId: e.submittedUrl,
                        url: e.submittedUrl,
                        selectedSearch: e.submittedSelectedSearch,
                        referenceType: e.submittedReferenceType,
                        childReferenceElement: e.submittedChildReferenceElement
                    };
                    break;
                }
                default:
            }
            submitted.submittedChildReferenceElement = newChildReferenceElement;
            this.props.onEdit(submitted);
        }
    }

    onModifierChange = (e, { value }) => {
        e.preventDefault();

        const submitted = this.getSubmitted();
        submitted.submittedModifier = value
        this.props.onEdit(submitted);

        if (value == 'missing') {
            this.setState({
                modifier: value,
                resource: '',
                resourceId: '',
                url: '',
                selectedSearch: '',
                //referenceType: FhirConstant.referenceType.relative,
                childReferenceElement: {},
                //chainList: {}
            });
        } else {
            this.setState({
                modifier: value
            });
        }
    }

    onResourceIdChange = (eventResourceId) => {

        const submitted = this.getSubmitted();
        submitted.submittedResourceId = eventResourceId
        this.props.onEdit(submitted);

        this.setState(() => ({ resourceId: eventResourceId }));
    }

    onUrlChange = (eventUrl) => {

        const submitted = this.getSubmitted();
        submitted.submittedUrl = eventUrl
        this.props.onEdit(submitted);

        this.setState(() => ({ url: eventUrl }));
    }

    onResourceFilterChange = (eventSelectedResource) => {
        if (this.state.resource != eventSelectedResource) {
            const submitted = this.getSubmitted();
            submitted.submittedResource = eventSelectedResource
            submitted.submittedChildReferenceElement = {};
            submitted.submittedSelectedSearch = '';
            this.props.onEdit(submitted);

            const ResourceElement = find(this.props.resourceList, { 'type': eventSelectedResource });
            this.setState(() => ({
                resource: eventSelectedResource,
                selectedResourceElement: ResourceElement,
                childReferenceElement: {},
                selectedSearch: ''
            }));
        }
    }

    onOrAddButtonClick = (e) => {
        e.preventDefault();

        this.props.onOrAddRemoveClick({
            eventId: this.props.id,
            eventIsAdd: true
        })
    }

    onOrRemoveButtonClick = (e) => {
        e.preventDefault();

        this.props.onOrAddRemoveClick({
            eventId: this.props.id,
            eventIsAdd: false
        })
    }

    onOrAdd = (e) => {
        e.preventDefault();

        this.props.onOrAddRemoveClick({
            eventId: this.props.id,
            eventIsAdd: true
        })
    }

    onOrRemove = (e) => {
        e.preventDefault();

        this.props.onOrAddRemoveClick({
            eventId: this.props.id,
            eventIsAdd: false
        })
    }

    onReferenceTypeChange = (eventReferenceType) => {
        if (eventReferenceType != this.state.referenceType) {
            const submitted = this.getSubmitted();

            //If no longer a chained then clear the chained list and selected search
            if (this.state.referenceType == FhirConstant.referenceType.chained) {
                submitted.submittedChildReferenceElement = {};
                submitted.submittedSelectedSearch = '';
                this.setState(() => ({
                    referenceType: eventReferenceType,
                    childReferenceElement: {},
                    selectedSearch: ''
                }));
            } else {
                this.setState(() => ({
                    referenceType: eventReferenceType,
                }));
            }

            submitted.submittedReferenceType = eventReferenceType;
            this.props.onEdit(submitted);
        }
    }


    onRemoveChainClick = (e) => {
        //Remember this event is recursive. this first time e.eventRemove is undefinded
        //yet the next time it is 'true'. Whe it is true we clear the list of chain elements
        //which clears all chains after this Reference component and we also clear that same component's
        //Search selector.
        //We then do not call the event again as we only want to clear one component in the chain not the whole list
        //of chains
        if (!isNil(e.eventRemove) && e.eventRemove) {
            this.setState(() => ({
                childReferenceElement: {},
                selectedSearch: 'none',
                searchElement: null,
            }));
        }

        if (isNil(e.eventRemove)) {
            this.props.onRemoveChainClick({
                eventRemove: true
            })
        }

    }


    onSelectedSearchChange = (eventSelectedSearch) => {

        const SearchArray = filter(this.state.selectedResourceElement.searchParam, { 'name': eventSelectedSearch });
        const searchParameterType = SearchArray[0].type;
        const searchParameterName = SearchArray[0].name;
        const SelectedResourceElement = this.state.selectedResourceElement;

        let newChildChainObject = {};
        let newEndValueElement = null;

        switch (searchParameterType) {
            case FhirConstant.searchType.quantity:
                newEndValueElement = {
                    id: UuidSupport.createGUID(),
                    type: searchParameterType,
                    name: searchParameterName,
                    modifier: 'none',
                    valueList: [{
                        id: UuidSupport.createGUID(),
                        prefix: '', number: '', system: '', code: ''
                    }]
                };
                //newChildChainObject = { id: UuidSupport.createGUID(), type: searchParameterType, prefix: '', number: '', system: '', code: '' };                
                break;
            case FhirConstant.searchType.string:
                newEndValueElement = {
                    id: UuidSupport.createGUID(),
                    type: searchParameterType,
                    name: searchParameterName,
                    modifier: 'none',
                    valueList: [{
                        id: UuidSupport.createGUID(),
                        string: ''
                    }]
                };
                //newChildChainObject = { id: UuidSupport.createGUID(), type: searchParameterType, string: '' };
                break;
            case FhirConstant.searchType.token:
                newEndValueElement = {
                    id: UuidSupport.createGUID(),
                    type: searchParameterType,
                    name: searchParameterName,
                    modifier: 'none',
                    valueList: [{
                        id: UuidSupport.createGUID(),
                        system: '', code: ''
                    }]
                };
                //newChildChainObject = { id: UuidSupport.createGUID(), type: searchParameterType, system: '', code: '' };                
                break;
            case FhirConstant.searchType.date:
                newEndValueElement = {
                    id: UuidSupport.createGUID(),
                    type: searchParameterType,
                    name: searchParameterName,
                    modifier: 'none',
                    valueList: [{
                        id: UuidSupport.createGUID(),
                        prefix: 'none', dateString: '', timeString: '', zoneString: ''
                    }]
                };
                //newChildChainObject = { id: UuidSupport.createGUID(), type: searchParameterType, prefix: 'none', dateString: '', timeString: '', zoneString: '' };
                break;
            case FhirConstant.searchType.uri:
                newEndValueElement = {
                    id: UuidSupport.createGUID(),
                    type: searchParameterType,
                    name: searchParameterName,
                    modifier: 'none',
                    valueList: [{
                        id: UuidSupport.createGUID(),
                        uri: ''
                    }]
                };
                //newChildChainObject = { id: UuidSupport.createGUID(), type: searchParameterType, uri: '' };                
                break;
            case FhirConstant.searchType.number:
                newEndValueElement = {
                    id: UuidSupport.createGUID(),
                    type: searchParameterType,
                    name: searchParameterName,
                    modifier: 'none',
                    valueList: [{
                        id: UuidSupport.createGUID(),
                        prefix: 'none', number: ''
                    }]
                };
                //newChildChainObject = { id: UuidSupport.createGUID(), type: searchParameterType, prefix: 'none', number: '' };                
                break;
            case FhirConstant.searchType.reference:
                newChildChainObject = {
                    id: UuidSupport.createGUID(),
                    type: searchParameterType,
                    // selectedResourceName: e.submittedParentResourceName,                    
                    resourceSelectOptions: ReferenceNew.getChainSearchResourceOptions(SelectedResourceElement.searchInclude, searchParameterName),
                    modifier: 'none',
                    resource: '',
                    resourceId: '',
                    url: '',
                    selectedSearch: '',
                    searchName: '',
                    childReferenceElement: {},
                    endValueElement: null
                };
                break;
            default:
        }

        const submitted = this.getSubmitted();
        submitted.submittedSelectedSearch = eventSelectedSearch;
        submitted.submittedEndValueElement = newEndValueElement;
        submitted.submittedChildReferenceElement = newChildChainObject;
        this.props.onEdit(submitted);

        this.setState(() => ({
            selectedSearch: eventSelectedSearch,
            searchElement: SearchArray[0],
            endValueElement: newEndValueElement,
            childReferenceElement: newChildChainObject
        }));
        
    }

    onEditSearchParameter = (e) => {

        const submitted = this.getSubmitted();

        const NewEndValueElement = {
            id: e.eventId,
            type: e.eventType,
            name: e.eventName,
            modifier: e.eventModifier,
            showEdit: true,
            valueList: e.eventValueList,
        };
        
        this.setState({ endValueElement: NewEndValueElement })

        submitted.submittedEndValueElement = NewEndValueElement;
        this.props.onEdit(submitted);
        // const newArray = this.state.savedSearchParameters.slice(0);
        // const Index = findIndex(newArray, { id: searchParameter.id })
        // newArray.splice(Index, 1, searchParameter);

       
    };

    render() {


        const modifierOptions = () => {
            return (
                [
                    { key: 'none', text: 'None', value: 'none' },
                    { key: 'missing', text: 'Missing', value: 'missing' },
                ]
            )
        }

        const disableDueToMissing = () => {
            if (this.state.modifier == 'missing') {
                return true;
            } else {
                return false;
            }
        }

        const disableDueToChildChain = () => {
            if (isEmpty(this.state.childReferenceElement)) {
                return false;
            } else {
                return true;
            }
        }

        const disableControls = () => {
            if (disableDueToMissing()) {
                return true;
            } else if (disableDueToChildChain()) {
                return true;
            } else {
                return false;
            }
        }

        const renderRemoveChainButton = () => {
            if (!this.props.isFirst) {
                return (
                    <Button
                        disabled={disableControls()}
                        onClick={this.onRemoveChainClick}
                        size='mini'
                        icon
                        color='red'
                        type='submit'><Icon name='remove' />
                    </Button>
                )
            } else {
                return null;
            }
        }

        const renderModifierSelectorRow = () => {
            return (
                <React.Fragment>
                    <Grid.Row columns={3} verticalAlign='middle'>
                        <Grid.Column width={3}>
                            <Form>
                                <Form.Group widths='equal'>
                                    <Form.Select
                                        width={3}
                                        compact
                                        label='Modifier'
                                        placeholder='Modifier'
                                        disabled={false}
                                        value={this.state.modifier}
                                        options={modifierOptions()}
                                        onChange={this.onModifierChange}
                                    />
                                </Form.Group>
                            </Form>
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <ReferenceTypeButton
                                isDisable={this.state.modifier == 'missing'}
                                activeType={this.state.referenceType}
                                onReferenceTypeChange={this.onReferenceTypeChange}
                            />
                        </Grid.Column>
                        <Grid.Column width={1}>
                            {renderRemoveChainButton()}
                        </Grid.Column>
                    </Grid.Row>
                </React.Fragment>
            )

        }

        const getSearchOptions = () => {
            if (isNil(this.state.selectedResourceElement)) {
                //Oddly if I return a list with a single entry on none as commented out below
                //then I get an error that their is a duplicate in the list, has same key!
                //However return an empty list [] sems to work fine here.
                // return [{ key: 'none', icon: 'search', text: 'none', description: 'none', value: 'none' }]
                return []
            } else {
                return (map(this.state.selectedResourceElement.searchParam, function (item) {
                    return { key: item.name, icon: 'search', text: item.name, description: item.documentation, value: item.name };
                }))
            }
        };

        const renderReferenceByType = () => {
            switch (this.state.referenceType) {
                case FhirConstant.referenceType.relative:
                    return (
                        <ReferenceRelative
                            isDisable={this.state.modifier == 'missing'}
                            selectedResource={this.state.resource}
                            resourceOptions={this.state.resourceSelectOptions}
                            resourceId={this.state.resourceId}
                            onSelectedResourceChange={this.onResourceFilterChange}
                            onResourceIdChange={this.onResourceIdChange}
                        />
                    )
                case FhirConstant.referenceType.absolute:
                    return (
                        <ReferenceAbsolute
                            isDisable={this.state.modifier == 'missing'}
                            url={this.state.url}
                            onUrlChange={this.onUrlChange}
                        />
                    )
                case FhirConstant.referenceType.chained:
                    return (
                        <ReferenceChained
                            isDisable={this.state.modifier == 'missing'}
                            resourceOptions={this.state.resourceSelectOptions}
                            selectedResource={this.state.resource}
                            onSelectedResourceChange={this.onResourceFilterChange}
                            searchOptions={getSearchOptions()}
                            selectedSearch={this.state.selectedSearch}
                            onSelectedSearchChange={this.onSelectedSearchChange}
                        />
                    )
                default:
                    return null;
            }
        }


        // const renderItemType = (item, isFirst, addOrButton) => {

        //     switch (item.type) {
        //         case FhirConstant.searchType.quantity:
        //             return (
        //                 <Quantity
        //                     isFirst={isFirst}
        //                     addOrButton={addOrButton}
        //                     onOrAddRemoveClick={this.onOrButtonClick}
        //                     id={item.id}
        //                     modifier={this.state.modifier}
        //                     prefix={item.prefix}
        //                     number={item.number}
        //                     code={item.code}
        //                     system={item.system}
        //                     onEdit={this.onEdit}
        //                 />
        //             )
        //         case FhirConstant.searchType.string:
        //             {
        //                 const valueList = [{ id: item.id, type: item.type, string: item.string }];
        //                 return (

        //                     <SearchTypeFrame
        //                         type={item.type}
        //                         onAddOrRemoveButtonClick={this.onRemoveSearchParameter}
        //                         onCheckClick={this.onHideEdit}
        //                         onEdit={this.onEditSearchParameter}
        //                         id={item.id}
        //                         name={item.name}
        //                         modifier={item.modifier}
        //                         isEditMode={false}
        //                         elementList={valueList}
        //                         resourceList={this.props.resourceList}
        //                         selectedResource={this.state.ResourceElement}
        //                     />


        //                     // <String
        //                     //     isFirstString={isFirst}
        //                     //     addOrButton={addOrButton}
        //                     //     onOrAddRemoveClick={this.onOrButtonClick}
        //                     //     id={item.id}
        //                     //     string={item.string}
        //                     //     modifier={this.state.modifier}
        //                     //     onStringEdit={this.onEdit}
        //                     // />
        //                 )
        //             }
        //         case FhirConstant.searchType.token:
        //             return (
        //                 <Token
        //                     isFirstToken={isFirst}
        //                     addOrButton={addOrButton}
        //                     onOrAddRemoveClick={this.onOrButtonClick}
        //                     id={item.id}
        //                     modifier={this.state.modifier}
        //                     code={item.code}
        //                     system={item.system}
        //                     onTokenEdit={this.onEdit}
        //                 />
        //             )
        //         case FhirConstant.searchType.date:
        //             return (
        //                 <DateTime
        //                     isFirst={isFirst}
        //                     addOrButton={addOrButton}
        //                     onOrAddRemoveClick={this.onOrButtonClick}
        //                     id={item.id}
        //                     modifier={this.state.modifier}
        //                     prefix={item.prefix}
        //                     dateString={item.dateString}
        //                     timeString={item.timeString}
        //                     zoneString={item.zoneString}
        //                     onEdit={this.onEdit}
        //                 />
        //             )
        //         case FhirConstant.searchType.uri:
        //             return (
        //                 <Uri
        //                     isFirst={isFirst}
        //                     addOrButton={addOrButton}
        //                     onOrAddRemoveClick={this.onOrButtonClick}
        //                     id={item.id}
        //                     modifier={this.state.modifier}
        //                     uri={item.uri}
        //                     onEdit={this.onEdit}
        //                 />
        //             )
        //         case FhirConstant.searchType.number:
        //             return (
        //                 <Number
        //                     isFirst={isFirst}
        //                     addOrButton={addOrButton}
        //                     onOrAddRemoveClick={this.onOrButtonClick}
        //                     id={item.id}
        //                     modifier={this.state.modifier}
        //                     prefix={item.prefix}
        //                     number={item.number}
        //                     onEdit={this.onEdit}
        //                 />
        //             )
        //         case FhirConstant.searchType.reference:
        //             return (
        //                 <ReferenceNew
        //                     isFirst={isFirst}
        //                     addOrButton={addOrButton}
        //                     onOrAddRemoveClick={this.onOrButtonClick}
        //                     id={item.id}
        //                     modifier={this.state.modifier}
        //                     resourceList={this.props.resourceList}
        //                     resourceSelectOptions={item.resourceSelectOptions}
        //                     resource={item.resource}
        //                     resourceId={item.resourceId}
        //                     selectedSearch={item.selectedSearch}
        //                     onEdit={this.onEdit}
        //                     onRemoveChainClick={this.onRemoveChainClick}
        //                     childReferenceElement={item.childReferenceElement}
        //                 />
        //             )
        //         default:
        //     }
        // }

        const renderChildReferenceElement = () => {
            const testChild = this.state.childReferenceElement;
            const testElement = this.state.endValueElement;
            if (isEmpty(this.state.childReferenceElement) && isNil(this.state.endValueElement)) {
                return null;
            } else if (isEmpty(this.state.childReferenceElement) && !isNil(this.state.endValueElement)) {
                return (
                    <SearchTypeFrame
                        key={this.state.endValueElement}
                        type={this.state.endValueElement.type}
                        onAddOrRemoveButtonClick={this.onRemoveSearchParameter}
                        onCheckClick={this.onHideEdit}
                        onEdit={this.onEditSearchParameter}
                        id={this.state.endValueElement.id}
                        name={this.state.endValueElement.name}
                        modifier={this.state.endValueElement.modifier}
                        isEditMode={true}
                        elementList={this.state.endValueElement.valueList}
                        resourceList={this.props.resourceList}
                        selectedResource={this.state.ResourceElement}
                    />
                )
            } else {                
                return (
                    <Grid>
                        <Grid.Row verticalAlign='middle'>
                            <Grid.Column width={16} >
                                <Divider fitted horizontal>Chained</Divider>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={1}>
                            <Grid.Column width={16} >
                                <ReferenceNew
                                    isFirst={true}
                                    addOrButton={true}
                                    onOrAddRemoveClick={this.onOrButtonClick}
                                    id={this.state.childReferenceElement.id}
                                    modifier={this.state.modifier}
                                    resourceList={this.props.resourceList}
                                    resourceSelectOptions={this.state.childReferenceElement.resourceSelectOptions}
                                    resource={this.state.childReferenceElement.resource}
                                    resourceId={this.state.childReferenceElement.resourceId}
                                    selectedSearch={this.state.childReferenceElement.selectedSearch}
                                    onEdit={this.onEdit}
                                    onRemoveChainClick={this.onRemoveChainClick}
                                    childReferenceElement={this.state.childReferenceElement.childReferenceElement}
                                    endValueElement={this.state.childReferenceElement.endValueElement}
                                />
                                {/* {renderItemType(this.state.childReferenceElement, true, true)} */}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                )
            }
        }

        const renderOrButtons = () => {
            if (this.state.referenceType != FhirConstant.referenceType.chained) {
                return (
                    <SearchOrButton
                        isDisable={false}
                        id={this.state.id}
                        onOrAdd={this.onOrAdd}
                        onOrRemove={this.onOrRemove}
                    />
                )
            } else {
                return null;
            }
        }

        return (
            <Grid>
                {renderModifierSelectorRow()}
                <Grid.Row columns={4}>
                    <Grid.Column width={14} >
                        {renderReferenceByType()}
                    </Grid.Column>
                    <Grid.Column width={1} floated='left' verticalAlign='middle' >
                        {renderOrButtons()}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Grid.Column width={16} >
                        {renderChildReferenceElement()}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

}

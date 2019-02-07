import React from 'react';

import { Grid, Form, Button, Icon, Divider } from 'semantic-ui-react'

import map from 'lodash/map';
import filter from 'lodash/filter';
import find from 'lodash/find';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import split from 'lodash/split';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import FhirConstant from '../../../../Constants/FhirConstant';
import UuidSupport from '../../../../SupportTools/UuidSupport';
import FhirSearchParameterFactory from '../../../../Constants/FhirSearchParameterFactory';
//import SearchTypeFrame from './SearchTypeFrame';
import TokenParameter from '../TokenType/TokenParameter';
// import String from './String';
// import Quantity from './Quantity';
// import DateTime from './DateTime';
// import Uri from './Uri';
// import Number from './Number';

import ReferenceRelative from './ReferenceRelative';
import ReferenceAbsolute from './ReferenceAbsolute';
import ReferenceChained from './ReferenceChained';
import ReferenceTypeButton from '../ReferenceTypeButton';
import SearchOrButton from '../SearchOrButton';

export default class ReferenceParameter extends React.Component {

    static propTypes = {
        onEdit: PropTypes.func.isRequired,
        resourceList: PropTypes.array.isRequired,
        resourceSelectOptions: PropTypes.array.isRequired,

        onAddParameter: PropTypes.func.isRequired,
        onRemoveParameter: PropTypes.func.isRequired,

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

    // Use the provided ResourceName but if not provided and the resourceoptions list
    // only contains 1 option then make this the selected resourceName
    getSelectedResourceName = () => {
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

    getSelectedResourceElement = () => {
        return find(this.props.resourceList, { 'type': this.getSelectedResourceName() });
    }


    getSubmitted = () => {
        return (
            {
                submittedId: this.props.id,
                submittedType: FhirConstant.searchType.reference,
                submittedResourceSelectOptions: this.props.resourceSelectOptions,
                submittedParentResourceElement: this.getSelectedResourceElement(),
                submittedResourceId: this.props.resourceId,
                submittedUrl: this.props.url,
                submittedResource: this.props.resource,
                submittedSelectedSearch: this.props.selectedSearch,
                submittedModifier: this.props.modifier,
                submittedReferenceType: this.props.referenceType,
                submittedChildReferenceElement: this.props.childReferenceElement,
                submittedEndValueElement: this.props.endValueElement
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

    onModifierChange = (e, { modifier }) => {
        e.preventDefault();
        const submitted = this.getSubmitted();
        submitted.submittedModifier = modifier
        this.props.onEdit(submitted);

        // if (value == 'missing') {
        //     this.setState({
        //         modifier: value,
        //         resource: '',
        //         resourceId: '',
        //         url: '',
        //         selectedSearch: '',
        //         //referenceType: FhirConstant.referenceType.relative,
        //         childReferenceElement: {},
        //         //chainList: {}
        //     });
        // } else {
        //     this.setState({
        //         modifier: value
        //     });
        // }
    }

    onResourceIdChange = (resourceId) => {
        const submitted = this.getSubmitted();
        submitted.submittedResourceId = resourceId
        this.props.onEdit(submitted);
        this.setState(() => ({ resourceId }));
    }

    onUrlChange = (url) => {
        const submitted = this.getSubmitted();
        submitted.submittedUrl = url
        this.props.onEdit(submitted);
        this.setState(() => ({ url }));
    }

    onResourceFilterChange = (selectedResource) => {
        if (this.props.resource != selectedResource) {
            const submitted = this.getSubmitted();
            submitted.submittedResource = selectedResource
            submitted.submittedChildReferenceElement = {};
            submitted.submittedSelectedSearch = '';
            this.props.onEdit(submitted);

            // const ResourceElement = find(this.props.resourceList, { 'type': eventSelectedResource });
            // this.setState(() => ({
            //     resource: eventSelectedResource,
            //     selectedResourceElement: ResourceElement,
            //     childReferenceElement: {},
            //     selectedSearch: ''
            // }));
        }
    }

    onAddParameter = () => {
        this.props.onAddParameter(this.props.id)
    }

    onRemoveParameter = () => {
        this.props.onRemoveParameter(this.props.id)
    }

    // onOrAddButtonClick = (e) => {
    //     e.preventDefault();
    //     this.props.onOrAddRemoveClick({
    //         eventId: this.props.id,
    //         eventIsAdd: true
    //     })
    // }

    // onOrRemoveButtonClick = (e) => {
    //     e.preventDefault();

    //     this.props.onOrAddRemoveClick({
    //         eventId: this.props.id,
    //         eventIsAdd: false
    //     })
    // }

    //new
    onOrAdd = () => {
        noop();
        //e.eventId here is the id of the other 'OR' that triggered this add
        // const submitted = this.getSubmitted();
        // submitted.submittedOrList.push({
        //     id: uniqueId(`${this.searchParameterType}Or_`),
        //     system: '',
        //     code: '',
        // });
        // this.props.onOrEdit(submitted);
    }

    onOrRemove = (e) => {
        const submitted = this.getSubmitted();
        submitted.submittedEndValueElement = filter(submitted.submittedEndValueElement, (x) => x.id != e.eventId)
        this.props.onEdit(submitted);
    }

    // //Old
    // onOrAdd = (e) => {
    //     e.preventDefault();

    //     this.props.onOrAddRemoveClick({
    //         eventId: this.props.id,
    //         eventIsAdd: true
    //     })
    // }

    // onOrRemove = (e) => {
    //     e.preventDefault();

    //     this.props.onOrAddRemoveClick({
    //         eventId: this.props.id,
    //         eventIsAdd: false
    //     })
    // }

    onReferenceTypeChange = (referenceType) => {
        if (referenceType != this.props.referenceType) {
            const submitted = this.getSubmitted();

            // //If no longer a chained then clear the chained list and selected search
            // if (this.props.referenceType == FhirConstant.referenceType.chained) {
            //     submitted.submittedChildReferenceElement = {};
            //     submitted.submittedSelectedSearch = '';
            //     this.setState(() => ({
            //         referenceType: eventReferenceType,
            //         childReferenceElement: {},
            //         selectedSearch: ''
            //     }));
            // } else {
            //     this.setState(() => ({
            //         referenceType: eventReferenceType,
            //     }));
            // }

            submitted.submittedReferenceType = referenceType;
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


    onSelectedSearchChange = (selectedSearch) => {

        const SearchArray = filter(this.getSelectedResourceElement().searchParam, { 'name': selectedSearch });
        const searchParameterType = SearchArray[0].type;
        const searchParameterName = SearchArray[0].name;
        const SelectedResourceElement = this.state.selectedResourceElement;

        let newChildChainObject = {};
        let newEndValueElement = null;
        if (searchParameterType == FhirConstant.searchType.reference) {
            newChildChainObject = {
                id: UuidSupport.createGUID(),
                type: searchParameterType,
                // selectedResourceName: e.submittedParentResourceName,                    
                resourceSelectOptions: ReferenceParameter.getChainSearchResourceOptions(SelectedResourceElement.searchInclude, searchParameterName),
                modifier: 'none',
                resource: '',
                resourceId: '',
                url: '',
                selectedSearch: '',
                searchName: '',
                childReferenceElement: {},
                endValueElement: null
            };
        } else {
            newEndValueElement = FhirSearchParameterFactory.create(searchParameterType, searchParameterName);
        }

        const submitted = this.getSubmitted();
        submitted.submittedSelectedSearch = selectedSearch;
        submitted.submittedEndValueElement = newEndValueElement;
        submitted.submittedChildReferenceElement = newChildChainObject;
        this.props.onEdit(submitted);

        // this.setState(() => ({
        //     selectedSearch,
        //     searchElement: SearchArray[0],
        //     endValueElement: newEndValueElement,
        //     childReferenceElement: newChildChainObject
        // }));

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

        //this.setState({ endValueElement: NewEndValueElement })

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
            if (this.props.modifier == 'missing') {
                return true;
            } else {
                return false;
            }
        }

        const disableDueToChildChain = () => {
            if (isEmpty(this.props.childReferenceElement)) {
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
                                        value={this.props.modifier}
                                        options={modifierOptions()}
                                        onChange={this.onModifierChange}
                                    />
                                </Form.Group>
                            </Form>
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <ReferenceTypeButton
                                isDisable={this.props.modifier == 'missing'}
                                activeType={this.props.referenceType}
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
            if (isNil(this.selectedResourceElement)) {
                //Oddly if I return a list with a single entry on none as commented out below
                //then I get an error that their is a duplicate in the list, has same key!
                //However return an empty list [] sems to work fine here.
                // return [{ key: 'none', icon: 'search', text: 'none', description: 'none', value: 'none' }]
                return []
            } else {
                return (map(this.selectedResourceElement.searchParam, function (item) {
                    return { key: item.name, icon: 'search', text: item.name, description: item.documentation, value: item.name };
                }))
            }
        };

        const renderReferenceByType = () => {
            switch (this.props.referenceType) {
                case FhirConstant.referenceType.relative:
                    return (
                        <ReferenceRelative
                            isDisable={this.props.modifier == 'missing'}
                            selectedResource={this.props.resource}
                            resourceOptions={this.props.resourceSelectOptions}
                            resourceId={this.props.resourceId}
                            onSelectedResourceChange={this.onResourceFilterChange}
                            onResourceIdChange={this.onResourceIdChange}
                        />
                    )
                case FhirConstant.referenceType.absolute:
                    return (
                        <ReferenceAbsolute
                            isDisable={this.props.modifier == 'missing'}
                            url={this.props.url}
                            onUrlChange={this.onUrlChange}
                        />
                    )
                case FhirConstant.referenceType.chained:
                    return (
                        <ReferenceChained
                            isDisable={this.props.modifier == 'missing'}
                            resourceOptions={this.props.resourceSelectOptions}
                            selectedResource={this.props.resource}
                            onSelectedResourceChange={this.onResourceFilterChange}
                            searchOptions={getSearchOptions()}
                            selectedSearch={this.props.selectedSearch}
                            onSelectedSearchChange={this.onSelectedSearchChange}
                        />
                    )
                default:
                    return null;
            }
        }

        const renderChildReferenceElement = () => {
            if (isEmpty(this.props.childReferenceElement) && isNil(this.props.endValueElement)) {
                return null;
            } else if (isEmpty(this.props.childReferenceElement) && !isNil(this.props.endValueElement)) {

                switch (this.props.endValueElement.type) {
                    case FhirConstant.searchType.quantity:
                        break;
                    case FhirConstant.searchType.string:
                        break;
                    case FhirConstant.searchType.token:
                        return (
                            <TokenParameter
                                onOrEdit={this.onEdit}
                                onAddParameter={this.onAddSearchParameter}
                                onRemoveParameter={this.onRemoveSearchParameter}
                                id={this.props.endValueElement.id}
                                searchParameterName={this.props.endValueElement.searchParameterName}
                                modifier={this.props.endValueElement.modifier}
                                orList={this.props.endValueElement.valueList}
                                isVisable={this.props.endValueElement.isVisable}
                                isDisabled={false}
                            />
                        )
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

                return (
                    // <SearchTypeFrame
                    //     key={this.state.endValueElement}
                    //     type={this.state.endValueElement.type}
                    //     onAddOrRemoveButtonClick={this.onRemoveSearchParameter}
                    //     onCheckClick={this.onHideEdit}
                    //     onEdit={this.onEditSearchParameter}
                    //     id={this.state.endValueElement.id}
                    //     name={this.state.endValueElement.name}
                    //     modifier={this.state.endValueElement.modifier}
                    //     isEditMode={true}
                    //     elementList={this.state.endValueElement.valueList}
                    //     resourceList={this.props.resourceList}
                    //     selectedResource={this.state.ResourceElement}
                    // />
                    null
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
                                <ReferenceParameter
                                    onEdit={this.onEdit}
                                    resourceList={this.props.resourceList}
                                    resourceSelectOptions={this.props.childReferenceElement.resourceSelectOptions}

                                    onAddParameter={this.onAddParameter}
                                    onRemoveParameter={this.onRemoveParameter}

                                    onRemoveChainClick={this.onRemoveChainClick}
                                    id={this.props.childReferenceElement.id}
                                    resource={this.props.childReferenceElement.resource}

                                    resourceId={this.props.childReferenceElement.resourceId}
                                    url={this.props.childReferenceElement.url}
                                    selectedSearch={this.props.childReferenceElement.selectedSearch}
                                    childReferenceElement={this.props.childReferenceElement.childReferenceElement}
                                    modifier={this.props.modifier}
                                    isFirst={true}
                                    referenceType={this.props.childReferenceElement.referenceType}
                                    endValueElement={this.props.childReferenceElement.endValueElement}
                                />
                                {/* {renderItemType(this.state.childReferenceElement, true, true)} */}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                )
            }
        }

        const renderOrButtons = () => {
            if (this.props.referenceType != FhirConstant.referenceType.chained) {
                return (
                    <SearchOrButton
                        isDisable={false}
                        id={this.props.id}
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

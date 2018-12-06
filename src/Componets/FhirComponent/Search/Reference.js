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

import Token from './Token';
import String from './String';
import Quantity from './Quantity';
import DateTime from './DateTime';
import Uri from './Uri';
import Number from './Number';
//import code from 'react-syntax-highlighter/styles/hljs/xcode';


export default class Reference extends React.Component {

    static propTypes = {
        onEdit: PropTypes.func.isRequired,
        resourceList: PropTypes.array.isRequired,
        parentSelectedResource: PropTypes.object.isRequired,
        onOrAddRemoveClick: PropTypes.func,
        onRemoveChainClick: PropTypes.func,
        id: PropTypes.string,
        name: PropTypes.string,
        resource: PropTypes.string,
        resourceId: PropTypes.string,
        childChainElement: PropTypes.object,
        // chainList: PropTypes.array,
        modifier: PropTypes.string,
        addOrButton: PropTypes.bool,
        isFirst: PropTypes.bool
    }

    static defaultProps = {
        id: UuidSupport.createGUID(),
        resource: '',
        resourceId: '',
        modifier: 'none',
        addOrButton: false,
        isFirst: false,
        childChainElement: {}
    }

    constructor(props) {
        super(props);


        const chainResList = () => {
            const mappedIncludeList = () => {
                return (map(this.props.parentSelectedResource.searchInclude, function (item) {
                    const itemSplit = split(item, ':');
                    const paramName = itemSplit[1];
                    const resourceName = itemSplit[2];
                    return { searchParameterName: paramName, resource: resourceName };
                }))
            }
            const filteredIncludeList = filter(mappedIncludeList(), { 'searchParameterName': this.props.name });

            return (map(filteredIncludeList, function (item) {
                return { key: item.resource, icon: 'tag', text: item.resource, value: item.resource };
            }))
        }
        const selectedResource = () => {
            const list = chainResList();
            if (list.length == 1) {
                return list[0].value;
            } else {
                return 'none';
            }
        }

        const resourceElement = find(this.props.resourceList, { 'type': selectedResource() });

        this.state = {
            resource: this.props.resource,
            resourceId: this.props.resourceId,
            modifier: this.props.modifier,
            isChainSearch: false,

            selectedResource: selectedResource(),
            ResourceElement: resourceElement,
            selectedSearch: 'none',
            SearchElement: null,
            savedSearchParameters: [],
            childChainElement: this.props.childChainElement,
            chainResourceList: chainResList(),
            chainList: [],
            subName: ''
        };
    }

    getSubmitted = () => {
        return (
            {
                submittedId: this.props.id,
                submittedType: FhirConstant.searchType.reference,
                submittedResource: this.state.resource,
                submittedResourceId: this.state.resourceId,
                submittedModifier: this.state.modifier,
                submittedChainList: this.state.chainList
            }
        )
    }


    //Not sure what to do here, we have events from the resourceID and Resource selector of Referance but then
    //we also have events bubbling up from any type (number, String, Quantity) or even reference its self. These
    //bubbled events are not synthetic and have no e.preventDefault() or e.target.
    onEdit = (e) => {
        // e.preventDefault();

        const submitted = this.getSubmitted();
        const newArray = this.state.chainList.slice(0);
        switch (e.submittedType) {
            case FhirConstant.searchType.quantity:
                newArray.push({ id: e.submittedId, prefix: e.submittedPrefix, number: e.submittedNumber, system: e.submittedSystem, code: e.submittedCode });
                break;
            case FhirConstant.searchType.string:
                newArray.push({ id: e.submittedId, string: e.submittedString });
                submitted.chainList = newArray;
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
                const target = e.target;
                const value = target.value;
                const name = target.name;

                this.setState({
                    [name]: value
                });

                if (name == 'resourceId') {
                    submitted.resourceId = value;
                }
            }
                break;
            default:
        }


        this.props.onEdit(submitted);
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
                childChainElement: {},
                chainList: []
            });
        } else {
            this.setState({
                modifier: value
            });
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

    onResourceFilterChange = (e, { value }) => {
        e.preventDefault();
        const ResourceArray = find(this.props.resourceList, { 'type': value });
        this.setState(() => ({ selectedResource: value, ResourceElement: ResourceArray }));
    }

    onChainToggle = (e) => {
        e.preventDefault();
        this.setState(() => ({ isChainSearch: !this.state.isChainSearch }));
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
                childChainElement: {},
                selectedSearch: 'none',
                SearchElement: null,
            }));
        }

        if (isNil(e.eventRemove)) {
            this.props.onRemoveChainClick({
                eventRemove: true
            })
        }

    }

    onSearchFilterChange = (e, { value }) => {
        e.preventDefault();

        const SearchArray = filter(this.state.ResourceElement.searchParam, { 'name': value });
        const searchParameterType = SearchArray[0].type;
        const searchParameterName = SearchArray[0].name;
        const parentResource = this.state.ResourceElement;

        // const newArray = this.state.childChainElement.slice(0);

        let newChildChainObject = {};

        switch (searchParameterType) {
            case FhirConstant.searchType.quantity:
                newChildChainObject = { id: UuidSupport.createGUID(), type: searchParameterType, prefix: '', number: '', system: '', code: '' };
                // newArray.push({ id: UuidSupport.createGUID(), type: searchParameterType, prefix: '', number: '', system: '', code: '' });
                break;
            case FhirConstant.searchType.string:
                newChildChainObject = { id: UuidSupport.createGUID(), type: searchParameterType, string: '' };
                // newArray.push({ id: UuidSupport.createGUID(), type: searchParameterType, string: '' });
                break;
            case FhirConstant.searchType.token:
                newChildChainObject = { id: UuidSupport.createGUID(), type: searchParameterType, system: '', code: '' };
                // newArray.push({ id: UuidSupport.createGUID(), type: searchParameterType, system: '', code: '' });
                break;
            case FhirConstant.searchType.date:
                newChildChainObject = { id: UuidSupport.createGUID(), type: searchParameterType, prefix: 'none', dateString: '', timeString: '', zoneString: '' };
                // newArray.push({ id: UuidSupport.createGUID(), type: searchParameterType, prefix: 'none', dateString: '', timeString: '', zoneString: '' });
                break;
            case FhirConstant.searchType.uri:
                newChildChainObject = { id: UuidSupport.createGUID(), type: searchParameterType, uri: '' };
                // newArray.push({ id: UuidSupport.createGUID(), type: searchParameterType, uri: '' });
                break;
            case FhirConstant.searchType.number:
                newChildChainObject = { id: UuidSupport.createGUID(), type: searchParameterType, prefix: 'none', number: '' };
                // newArray.push({ id: UuidSupport.createGUID(), type: searchParameterType, prefix: 'none', number: '' });
                break;
            case FhirConstant.searchType.reference:
                newChildChainObject = { id: UuidSupport.createGUID(), type: searchParameterType, parentSelectedResource: parentResource, subName: searchParameterName, prefix: 'none', resource: '', resourceId: '', childChainElement: {} };
                // newArray.push({ id: UuidSupport.createGUID(), type: searchParameterType, parentSelectedResource: parentResource, subName: searchParameterName, prefix: 'none', resource: '', resourceId: '', childChainElement: [] });
                break;
            default:
        }

        this.setState(() => ({ selectedSearch: value, SearchElement: SearchArray[0], childChainElement: newChildChainObject }));
    }

    render() {

        const renderRemoveOrButton = () => {
            if (this.props.addOrButton && !this.props.isFirst && !this.state.isChainSearch) {
                return <Button key='3' onClick={this.onOrRemoveButtonClick} size='mini' icon color='red' type='submit'><Icon name='remove' />{' '}OR</Button>
            }
        }

        const renderOrButton = () => {
            if (this.state.isChainSearch) {
                return null;
            } else {
                if (this.props.addOrButton) {
                    return <Button key='1' disabled={disableDueToMissing()} onClick={this.onOrAddButtonClick} size='mini' icon color='green' type='submit'><Icon name='add' />{' '}OR</Button>
                } else {
                    return <Button key='2' onClick={this.onOrRemoveButtonClick} size='mini' icon color='red' type='submit'><Icon name='remove' />{' '}OR</Button>
                }
            }
        }

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

        // const disableDueToChildChain = () => {
        //     if (isNil(this.state.childChainElement)) {
        //         return false;
        //     } else if (this.state.childChainElement.length > 0) {
        //         return true;
        //     } else {
        //         return false;
        //     }

        // }

        const disableDueToChildChain = () => {
            if (isEmpty(this.state.childChainElement)) {
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
        const renderModifierDropdown = () => {
            return (
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Select width={3} compact label='Modifier' disabled={disableDueToChildChain()} value={this.state.modifier} options={modifierOptions()} placeholder='Modifier' onChange={this.onModifierChange} />
                    </Form.Group>
                </Form>
            )
        }

        const renderChainedToggleButtons = () => {
            return (
                <span>
                    <Button.Group size='small' color='black'>
                        <Button onClick={this.onChainToggle} disabled={disableControls()} toggle active={!this.state.isChainSearch} attached='left'>Resource Id</Button>
                        <Button onClick={this.onChainToggle} disabled={disableControls()} toggle active={this.state.isChainSearch} attached='right' >Chained</Button>
                    </Button.Group>
                </span>
            )
        }

        const renderRemoveChainButton = () => {
            if (!this.props.isFirst) {
                return (
                    <Button disabled={disableControls()} onClick={this.onRemoveChainClick} size='mini' icon color='red' type='submit'><Icon name='remove' /></Button>
                )
            } else {
                return null;
            }
        }
        const renderModifierSelector = () => {

            return (
                <Grid.Row columns={3} verticalAlign='middle'>
                    <Grid.Column width={3} >
                        {renderModifierDropdown()}
                    </Grid.Column>
                    <Grid.Column width={12}>
                        {renderChainedToggleButtons()}
                    </Grid.Column>
                    <Grid.Column width={1}>
                        {renderRemoveChainButton()}
                    </Grid.Column>
                </Grid.Row>
            )

        }

        const searchList = () => {
            if (isNil(this.state.ResourceElement)) {
                //Oddly if I return a list with a single entry on none as commented out below
                //then I get an error that their is a duplicate in the list, has same key!
                //However return an empty list [] sems to work fine here.
                // return [{ key: 'none', icon: 'search', text: 'none', description: 'none', value: 'none' }]
                return []
            } else {
                return (map(this.state.ResourceElement.searchParam, function (item) {
                    return { key: item.name, icon: 'search', text: item.name, description: item.documentation, value: item.name };
                }))
            }
        };

        const renderChainSwitch = () => {

            const disabled = () => {
                if (isNil(this.state.ResourceElement)) {
                    return true;
                } else if (disableControls()) {
                    return true;
                } else {
                    return false;
                }
            }

            // const test = uniqBy(searchList(), 'key');
            const test = searchList();
            if (this.state.isChainSearch) {
                return (
                    <Form.Select
                        key='SearchSelect'
                        label='Search Parameter'
                        fluid
                        width={4}
                        disabled={disabled()}
                        options={test}
                        placeholder='Search Parameter'
                        search
                        closeOnChange
                        onChange={this.onSearchFilterChange}
                        value={this.state.selectedSearch}
                    />

                )
            } else {
                return (
                    <Form.Field key='ResId' label='Resource Id' width={4} name='resourceId' control='input' disabled={disableControls()} placeholder='12345' value={resourceId} onChange={this.onEdit} />
                )
            }
        }



        const renderItemType = (item, isFirst, addOrButton) => {

            switch (item.type) {
                case FhirConstant.searchType.quantity:
                    return (
                        <Quantity
                            isFirst={isFirst}
                            addOrButton={addOrButton}
                            onOrAddRemoveClick={this.onOrButtonClick}
                            id={item.id}
                            modifier={this.state.modifier}
                            prefix={item.prefix}
                            number={item.number}
                            code={item.code}
                            system={item.system}
                            onEdit={this.onEdit}
                        />
                    )
                case FhirConstant.searchType.string:
                    return (
                        <String
                            isFirstString={isFirst}
                            addOrButton={addOrButton}
                            onOrAddRemoveClick={this.onOrButtonClick}
                            id={item.id}
                            string={item.string}
                            modifier={this.state.modifier}
                            onStringEdit={this.onEdit}
                        />
                    )
                case FhirConstant.searchType.token:
                    return (
                        <Token
                            isFirstToken={isFirst}
                            addOrButton={addOrButton}
                            onOrAddRemoveClick={this.onOrButtonClick}
                            id={item.id}
                            modifier={this.state.modifier}
                            code={item.code}
                            system={item.system}
                            onTokenEdit={this.onEdit}
                        />
                    )
                case FhirConstant.searchType.date:
                    return (
                        <DateTime
                            isFirst={isFirst}
                            addOrButton={addOrButton}
                            onOrAddRemoveClick={this.onOrButtonClick}
                            id={item.id}
                            modifier={this.state.modifier}
                            prefix={item.prefix}
                            dateString={item.dateString}
                            timeString={item.timeString}
                            zoneString={item.zoneString}
                            onEdit={this.onEdit}
                        />
                    )
                case FhirConstant.searchType.uri:
                    return (
                        <Uri
                            isFirst={isFirst}
                            addOrButton={addOrButton}
                            onOrAddRemoveClick={this.onOrButtonClick}
                            id={item.id}
                            modifier={this.state.modifier}
                            uri={item.uri}
                            onEdit={this.onEdit}
                        />
                    )
                case FhirConstant.searchType.number:
                    return (
                        <Number
                            isFirst={isFirst}
                            addOrButton={addOrButton}
                            onOrAddRemoveClick={this.onOrButtonClick}
                            id={item.id}
                            modifier={this.state.modifier}
                            prefix={item.prefix}
                            number={item.number}
                            onEdit={this.onEdit}
                        />
                    )
                case FhirConstant.searchType.reference:
                    return (
                        <Reference
                            isFirst={isFirst}
                            addOrButton={addOrButton}
                            onOrAddRemoveClick={this.onOrButtonClick}
                            id={item.id}
                            name={item.subName}
                            modifier={this.state.modifier}
                            resourceList={this.props.resourceList}
                            parentSelectedResource={item.parentSelectedResource}
                            resource={item.resource}
                            resourceId={item.resourceId}
                            onEdit={this.onEdit}
                            onRemoveChainClick={this.onRemoveChainClick}
                        />
                    )
                default:
            }
        }

        const renderChildChainedElement = () => {
            if (isEmpty(this.state.childChainElement)) {
                return null;
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
                                {renderItemType(this.state.childChainElement, false, true)}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                )
            }
        }

        const { resourceId, chainResourceList, selectedResource } = this.state


        return (
            <Grid>
                {renderModifierSelector()}
                <Grid.Row columns={4}>
                    <Grid.Column width={14} >
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Select
                                    disabled={disableControls()}
                                    label='Resource Type'
                                    width={3}
                                    fluid
                                    value={selectedResource}
                                    options={chainResourceList}
                                    placeholder='Resource'
                                    search
                                    closeOnChange
                                    onChange={this.onResourceFilterChange}
                                />
                                {renderChainSwitch()}
                            </Form.Group>
                        </Form>
                    </Grid.Column>
                    <Grid.Column width={1} floated='left' verticalAlign='middle' >
                        <Button.Group size='mini' >
                            {renderRemoveOrButton()}
                            {renderOrButton()}
                        </Button.Group>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Grid.Column width={16} >
                        {renderChildChainedElement()}
                    </Grid.Column>
                </Grid.Row>

            </Grid>
        )
    }

}

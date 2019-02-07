import React from 'react';

import { Grid, Button, Form, Label, Divider, Header, Popup, Segment, List, Image, Icon } from 'semantic-ui-react'

import map from 'lodash/map';
import filter from 'lodash/filter';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import endsWith from 'lodash/endsWith';
import noop from 'lodash/noop';

import PropTypes from 'prop-types';

import FhirQueryButton from '../FhirComponent/Search/FhirQueryButton';
import EncodingButton from '../FhirComponent/Search/EncodingButton';
import SummaryButton from '../FhirComponent/Search/SummaryButton';
import ResponseRender from '../FhirComponent/Search/ResponseRender';
import PublicServerResetMessage from '../../Componets/PublicServer/Messages/PublicServerResetMessage';
import DeviceConstants from '../../Constants/DeviceConstants';
import SearchUrlFormat from '../FhirComponent/Search/SearchUrlFormat';

import FhirConstant from '../../Constants/FhirConstant';
import FhirSearchParameterFactory from '../../Constants/FhirSearchParameterFactory';
import FhirServerConstant from '../../Constants/FhirServerConstant';
import TokenParameter from '../FhirComponent/Search/TokenType/TokenParameter';


export default class PyroServerSearchComponentTwo extends React.Component {

    static propTypes = {
        ConformanceStatmentResource: PropTypes.object.isRequired,
        FhirServerName: PropTypes.string.isRequired,
        FhirIcon: PropTypes.string,
    }

    static defaultProps = {
        FhirIcon: require('../../Images/FhirIcon/icon-fhir-32.png')
    }

    constructor(props) {
        super(props);

        this.state = {
            selectedResource: [{ key: 'none', icon: 'tag', text: 'none', value: 'none' }],
            selectedSearch: 'none',
            SearchElement: null,
            savedSearchParameterList: [],
            encodingType: FhirConstant.DefaultFhirJsonFormat,
            summaryType: FhirConstant.searchSummaryType.none,
        };
    }

    onResourceFilterChange = (e, { value }) => {
        e.preventDefault();
        const ResourceArray = filter(this.props.ConformanceStatmentResource.rest[0].resource, { 'type': value });
        this.setState(() => ({ selectedResource: value, ResourceElement: ResourceArray[0] }));
    }

    onSearchFilterChange = (e, { value }) => {
        e.preventDefault();
        const searchName = value;
        const fhirSearchParameter = find(this.state.ResourceElement.searchParam, { 'name': value });
        const newSearchParameter = FhirSearchParameterFactory.create(fhirSearchParameter.type, searchName);
        
        this.setState(() => ({            
            selectedSearch: value,
            SearchElement: fhirSearchParameter,
            savedSearchParameterList: [...this.state.savedSearchParameterList, newSearchParameter]
        }));
    }

    onEncodeingClick = (e) => {
        this.setState({ encodingType: e.encodingType })
    }

    onSummaryClick = (e) => {
        this.setState({ summaryType: e.summaryType })
    }

    onCancelClick = () => {
        this.setState({ SearchElement: null, selectedSearch: 'none' })
    }

    onEditSearchParameter = (e) => {
        const newSearchParameter = {
            id: e.submittedId,
            searchParameterName: e.submittedSearchParameterName,
            type: e.submittedType,
            modifier: e.submittedModifier,
            isVisable: e.submittedIsVisable,
            orList: e.submittedOrList,
        }
        const newSearchParameterList = this.state.savedSearchParameterList.slice(0);
        const targetIndex = findIndex(newSearchParameterList, { id: newSearchParameter.id })
        newSearchParameterList.splice(targetIndex, 1, newSearchParameter);
        this.setState({ savedSearchParameterList: newSearchParameterList })
    };

    onAddSearchParameter = (InstanceId) => {
        //We only need to find the instance with the id and set the isVisable to false
        //as the instance is already added to the saved list from the dropdown select, this 
        //just hides the instance from the user as commited/added.
        const newSearchParameterList = this.state.savedSearchParameterList.slice(0);
        const targetIndex = findIndex(newSearchParameterList, { id: InstanceId })
        //toggel bolean
        newSearchParameterList[targetIndex].isVisable = false;
        this.setState({ savedSearchParameterList: newSearchParameterList })

        // this.setState({ savedSearchParameters: newArray, SearchElement: null, selectedSearch: 'none' })
    };

    onRemoveSearchParameter = (id) => {
        const newSearchParameterList = filter(this.state.savedSearchParameterList, (x) => x.id != id);
        this.setState({ savedSearchParameterList: newSearchParameterList })
    };

    onSendClick = () => {
        noop();
    };

    onShowEdit = (e) => {
        const newArray = this.state.savedSearchParameterList.slice(0);
        const Index = findIndex(newArray, { id: e.eventId })
        //toggel bolean
        newArray[Index].isVisable = !newArray[Index].isVisable;
        this.setState({ savedSearchParameterList: newArray })

    };

    onHideEdit = (e) => {
        const newArray = this.state.savedSearchParameterList.slice(0);
        const Index = findIndex(newArray, { id: e.eventId })
        newArray[Index].showEdit = false;
        this.setState({ savedSearchParameterList: newArray })
    };

    generateSendQuery = () => {
        let counter = 0;
        const ServerEndpoint = FhirServerConstant.getEndpointForServerName(this.props.FhirServerName);
        const ResourceName = this.state.selectedResource;
        let MainQuery = `${ServerEndpoint}/${ResourceName}`;
        const TempArray = this.queryElementArray();
        for (let i = 0; i < TempArray.length; i++) {
            let queryDelimiter = '&';
            if (counter == 0) {
                queryDelimiter = '?';
            }
            //Below checks is the query is empty and does not render it if it is as it means nothing
            if (!endsWith(TempArray[i].queryString, '=', TempArray[i].queryString.length)) {
                counter++;
                MainQuery = MainQuery.concat(`${queryDelimiter}${TempArray[i].queryString}`)
            }
        }
        return MainQuery;
    }

    queryElementArray = () => map(this.state.savedSearchParameterList, (parameter) => {
        if (parameter.type == FhirConstant.searchType.token) {
            return SearchUrlFormat.anyParameter(parameter);
        } else if (parameter.type == FhirConstant.searchType.string) {
            return SearchUrlFormat.anyParameter(parameter);
        } else if (parameter.type == FhirConstant.searchType.quantity) {
            return SearchUrlFormat.anyParameter(parameter);
        } else if (parameter.type == FhirConstant.searchType.date) {
            return SearchUrlFormat.anyParameter(parameter);
        } else if (parameter.type == FhirConstant.searchType.uri) {
            return SearchUrlFormat.anyParameter(parameter);
        } else if (parameter.type == FhirConstant.searchType.number) {
            return SearchUrlFormat.anyParameter(parameter);
        } else if (parameter.type == FhirConstant.searchType.reference) {

            let theQuery = '';
            for (let i = 0; i < parameter.orList.length; i++) {

                let modifier = '';
                if (parameter.modifier != 'none') {
                    modifier = parameter.modifier
                }

                if (i > 0) {
                    theQuery = theQuery.concat(`,${SearchUrlFormat.reference(parameter.orList[i])}`)
                } else {
                    if (modifier == 'missing') {
                        theQuery = SearchUrlFormat.missingModifier(parameter.searchParameterName);
                    } else if (modifier != '') {
                        theQuery = `${parameter.searchParameterName}:${modifier}=${SearchUrlFormat.reference(parameter.orList[i])}`;
                    } else {
                        if (!isNil(parameter.orList[i]) && !isNil(parameter.orList[i].resourceId) && parameter.orList[i].resourceId != '') {
                            theQuery = `${parameter.searchParameterName}=${SearchUrlFormat.reference(parameter.orList[i])}`;
                        }
                        if (!isNil(parameter.orList[i]) && !isNil(parameter.orList[i].resource) && parameter.orList[i].resource != '') {
                            theQuery = `${parameter.searchParameterName}`;
                            let currectItem = parameter.orList[i];
                            while (!isEmpty(currectItem)) {
                                if (currectItem.type == FhirConstant.searchType.reference) {
                                    if (currectItem.isChainSearch) {
                                        theQuery = `${theQuery}:${SearchUrlFormat.anyType(currectItem)}`;
                                    } else {
                                        theQuery = `${theQuery}=${SearchUrlFormat.anyType(currectItem)}`;
                                    }
                                } else {
                                    theQuery = `${theQuery}=${SearchUrlFormat.anyType(currectItem)}`;
                                }
                                currectItem = currectItem.childReferenceElement;
                            }
                        }
                    }
                }
            }
            return { id: parameter.id, queryString: theQuery, searchType: parameter.type }

        } else {
            return 'notdone!!';
        }
    })


    render() {

        const FhirResource = this.props.ConformanceStatmentResource;

        const ResourceList = map(FhirResource.rest[0].resource, function (item) {
            return { key: item.type, icon: 'tag', text: item.type, value: item.type };
        });

        const searchList = () => {
            if (isNil(this.state.ResourceElement)) {
                return [{ key: 'none', icon: 'search', text: 'none', description: 'none', value: 'none' }]
            } else {
                return (map(this.state.ResourceElement.searchParam, function (item) {
                    return { key: item.name, icon: 'search', text: item.name, description: item.documentation, value: item.name };
                }))
            }
        };

        const renderFhirQuery = () => {
            const ButtonSize = 'small';
            return (
                <Grid>
                    <Grid.Row columns={16} only='computer'>
                        <Grid.Column width={16}>
                            {/* <Header size='tiny'>FHIR Query</Header> */}
                            <Segment>
                                <Grid doubling>
                                    <Grid.Row columns={16}>
                                        <Grid.Column width={13}>
                                            {renderFhirUrl(ButtonSize)}
                                        </Grid.Column>
                                        <Grid.Column width={3} >
                                            <Button.Group size={ButtonSize} >
                                                <Popup trigger={<Button color='black'><Icon name='trash' /></Button>} content='Clear the query' />
                                                <Popup trigger={<Button color='black'><Icon name='clipboard'></Icon></Button>} content='Copy to clipboard' />
                                                <Button color='blue' onClick={this.onSendClick}>Send</Button>
                                            </Button.Group>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row >
                    <Grid.Row columns={16} only='tablet'>
                        <Grid.Column width={16}>
                            <Header size='tiny'>FHIR Query</Header>
                            <Segment>
                                <Grid doubling>
                                    <Grid.Row columns={16}>
                                        <Grid.Column width={11}>
                                            {renderFhirUrl(ButtonSize)}
                                        </Grid.Column>
                                        <Grid.Column width={5} >
                                            <Button.Group size={ButtonSize} >
                                                <Popup trigger={<Button color='black'><Icon name='trash' /></Button>} content='Clear the query' />
                                                <Popup trigger={<Button color='black'><Icon name='clipboard'></Icon></Button>} content='Copy to clipboard' />
                                                <Button color='blue' onClick={this.onSendClick}>Send</Button>
                                            </Button.Group>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row >
                </Grid>
            )
        }

        const renderServerInfo = () => {
            return (
                <Grid>
                    <Grid.Row columns={16} only='computer'>
                        <Grid.Column width={16}>
                            <Segment>
                                <List verticalAlign='middle' relaxed size='medium'>
                                    <List.Item>
                                        <Image avatar src={this.props.FhirIcon} />
                                        <List.Content>
                                            <List.Header>FHIR R4 Endpoint</List.Header>
                                            <List.Description>
                                                <Button basic compact size='small' color='black'>[Base]: <code>{FhirServerConstant.PyroR4FhirServerEndpoint}</code></Button>
                                            </List.Description>                                            
                                        </List.Content>
                                    </List.Item>
                                </List>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row >
                </Grid>
            )
        }


        const renderResourceSelector = () => {

            let ResourcePopupMessage = 'Select a resource to search on';
            if (this.state.savedSearchParameterList.length > 0) {
                ResourcePopupMessage = 'You must clear all search parameters to modify the currect resource type';
            }

            let LockResourceSelector = false;
            if (this.state.savedSearchParameterList.length > 0) {
                LockResourceSelector = true;
            }
            return (
                <Segment raised >
                    <PublicServerResetMessage deviceType={DeviceConstants.deviceType.computer} plural={false} />
                    {renderServerInfo()}
                    {renderFhirQuery()}
                    <Segment>
                        <Grid>
                            <Grid.Row columns={16}>
                                <Grid.Column width={4}>
                                    <EncodingButton size='tiny' onClick={this.onEncodeingClick} />
                                </Grid.Column>
                                <Grid.Column width={5}>
                                    <SummaryButton size='tiny' onClick={this.onSummaryClick} />
                                </Grid.Column>
                            </Grid.Row>

                        </Grid>
                    </Segment>
                    <Divider horizontal hidden></Divider>
                    <Form>
                        <Popup trigger={
                            <Form.Group widths='equal'>
                                <Form.Select
                                    disabled={LockResourceSelector}
                                    label='Resource'
                                    fluid
                                    defaultValue='none'
                                    options={ResourceList}
                                    placeholder='Resource'
                                    search
                                    closeOnChange
                                    onChange={this.onResourceFilterChange} />
                            </Form.Group>
                        } content={ResourcePopupMessage} />
                    </Form>
                    {renderSearch()}
                    {/* {renderSearchType()} */}
                </Segment>
            )
        }

        const renderSearch = () => {
            if (isNil(this.state.ResourceElement)) {
                return null;
            } else {
                return (
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Select
                                label='Search Parameter'
                                fluid
                                options={searchList()}
                                placeholder='Search Parameter'
                                search
                                closeOnChange
                                onChange={this.onSearchFilterChange}
                                value={this.state.selectedSearch} />
                        </Form.Group>
                    </Form>
                )
            }
        }


        const renderSearchParameter = (searchParameter) => {
            switch (searchParameter.type) {
                case FhirConstant.searchType.quantity:
                    return null;
                case FhirConstant.searchType.string:
                    return null;
                case FhirConstant.searchType.token:
                    return (
                        <TokenParameter
                            onOrEdit={this.onEditSearchParameter}
                            onAddParameter={this.onAddSearchParameter}
                            onRemoveParameter={this.onRemoveSearchParameter}
                            id={searchParameter.id}
                            searchParameterName={searchParameter.searchParameterName}
                            modifier={searchParameter.modifier}
                            orList={searchParameter.orList}
                            isVisable={searchParameter.isVisable}
                            isDisabled={false}
                        />
                    )
                case FhirConstant.searchType.date:
                    return null;
                case FhirConstant.searchType.uri:
                    return null;
                case FhirConstant.searchType.number:
                    return null;
                case FhirConstant.searchType.reference:
                    return null;
                default:
            }
        }

        const renderSavedSearchPatrameterList = () => {

            const ShowEditCount = filter(this.state.savedSearchParameterList, { 'isVisable': true }).length;

            const renderAndDivider = (CurrectCounter) => {
                if (ShowEditCount > 1 && CurrectCounter > 1) {
                    return <Divider horizontal>And</Divider>
                }
            }

            //const revList = this.state.savedSearchParameterList.slice(0);
            //reverse(revList);
            let CurrectCounter = 0;
            return (
                <Grid.Row columns={16}>
                    <Grid.Column width={16}>
                        {map(this.state.savedSearchParameterList, (item) => {
                            if (!item.isVisable) {
                                return null;
                            }
                            CurrectCounter++

                            return (
                                <React.Fragment key={item.id}>
                                    {renderAndDivider(CurrectCounter)}
                                    {renderSearchParameter(item)}
                                </React.Fragment>
                            )
                        })}
                    </Grid.Column>
                </Grid.Row>
            )
        }

        const renderQueryLabels = (ButtonSize) => {
            let counter = 0;
            const TempArray = this.queryElementArray();
            return (

                map(TempArray, (item, index) => {
                    let queryDelimiter = '&';
                    if (counter == 0) {
                        queryDelimiter = '?';
                    }
                    //Below checks is the query is empty and does not render it if it is as it means nothing
                    if (!endsWith(item.queryString, '=', item.queryString.length)) {
                        counter++;
                        return (
                            <FhirQueryButton
                                key={index}
                                id={item.id}
                                size={ButtonSize}
                                delimiter={queryDelimiter}
                                value={item.queryString}
                                color={FhirConstant.getColorForSearchType(item.searchType)}
                                onClick={this.onShowEdit}
                                onRemoveClick={this.onRemoveSearchParameter} />
                        )
                    }
                })
            )
        }

        const renderFhirUrl = (ButtonSize) => {
            if (!isNil(this.state.ResourceElement)) {
                return (
                    <Label.Group >
                        <Button basic compact size={ButtonSize} color='black'>[Base]</Button>
                        <Button basic compact size={ButtonSize} color='grey'>/</Button>
                        <Button basic compact size={ButtonSize} color='green'>{this.state.selectedResource}</Button>
                        {renderQueryLabels(ButtonSize)}
                    </Label.Group>

                )
            } else {
                return (
                    <Label.Group >
                        <Button basic compact size={ButtonSize} color='black'>[Base]</Button>
                        <Button basic compact size={ButtonSize} color='grey'>/</Button>
                    </Label.Group>
                )
            }
        };

        const renderQueryResponse = () => {

            return (
                <Grid.Row columns={16}>
                    <Grid.Column width={16}>
                        <ResponseRender />
                    </Grid.Column>
                </Grid.Row>
            )
        }

        return (

            <Grid>
                <Grid.Row columns={16}>
                    <Grid.Column width={16}>
                        {renderResourceSelector()}
                    </Grid.Column>
                </Grid.Row>
                {renderSavedSearchPatrameterList()}
                {renderQueryResponse()}
            </Grid>

        )
    }


}

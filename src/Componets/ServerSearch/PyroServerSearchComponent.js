import React from 'react';

import { Grid, Button, Form, Label, Divider, Header, Popup } from 'semantic-ui-react'

import map from 'lodash/map';
import filter from 'lodash/filter';
import findIndex from 'lodash/findIndex';
import reverse from 'lodash/reverse';
import isNil from 'lodash/isNil';
import endsWith from 'lodash/endsWith';
import noop from 'lodash/noop';

import PropTypes from 'prop-types';

import TokenSearch from '../FhirComponent/Search/TokenSearch';
import StringSearch from '../FhirComponent/Search/StringSearch';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';

import UuidSupport from '../../SupportTools/UuidSupport'
import FhirConstant from '../../Constants/FhirConstant';
import FhirServerConstant from '../../Constants/FhirServerConstant';

export default class PyroServerSearchComponent extends React.Component {

    static propTypes = {
        ConformanceStatmentResource: PropTypes.object.isRequired,
        FhirServerName: PropTypes.string.isRequired
    }

    static defaultProps = {
    }

    constructor(props) {
        super(props);

        this.state = {
            selectedResource: [{ key: 'none', icon: 'tag', text: 'none', value: 'none' }],
            selectedSearch: 'none',
            SearchElement: { key: 'none', icon: 'search', text: 'none', description: 'none', value: 'none' },
            savedSearchParameters: [],
        };
    }

    onResourceFilterChange = (e, { value }) => {
        e.preventDefault();
        const ResourceArray = filter(this.props.ConformanceStatmentResource.rest[0].resource, { 'type': value });
        this.setState(() => ({ selectedResource: value, ResourceElement: ResourceArray[0] }));
    }

    onSearchFilterChange = (e, { value }) => {
        e.preventDefault();
        const SearchArray = filter(this.state.ResourceElement.searchParam, { 'name': value });
        this.setState(() => ({ selectedSearch: value, SearchElement: SearchArray[0] }));
    }

    onAddSearchParameter = (e) => {
        // e.preventDefault();

        const searchParameter = {
            id: e.eventId,
            type: e.eventType,
            name: e.eventName,
            modifier: e.eventModifier,
            valueList: e.eventValueList
        };
        const newArray = this.state.savedSearchParameters.slice(0);
        newArray.push(searchParameter);

        this.setState({ savedSearchParameters: newArray, SearchElement: null, selectedSearch: 'none' })
    };

    onRemoveSearchParameter = (e) => {
        // e.preventDefault();

        const newArray = filter(this.state.savedSearchParameters, function (currentObject) {
            return currentObject.id != e.eventId;
        });

        this.setState({ savedSearchParameters: newArray })
    };

    onEditSearchParameter = (e) => {

        const searchParameter = {
            id: e.eventId,
            type: e.eventType,
            name: e.eventName,
            modifier: e.eventModifier,
            valueList: e.eventValueList,
        };

        const newArray = this.state.savedSearchParameters.slice(0);
        const Index = findIndex(newArray, { id: searchParameter.id })
        newArray.splice(Index, 1, searchParameter);

        this.setState({ savedSearchParameters: newArray })
    };

    onSendClick = () => {
        noop();
        //const xx = this.generateSendQuery();
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

    queryElementArray = () => map(this.state.savedSearchParameters, (item) => {
        if (item.type == FhirConstant.searchType.token) {
            let theQuery = `${item.name}=`;
            for (let i = 0; i < item.valueList.length; i++) {
                if (i > 0) {
                    if (item.valueList[i].system == '') {
                        theQuery = theQuery.concat(`,${item.valueList[i].code}`)
                    } else {
                        theQuery = theQuery.concat(`,${item.valueList[i].system}|${item.valueList[i].code}`)
                    }
                } else {
                    if (item.modifier != 'none') {
                        theQuery = `${item.name}:${item.modifier}=true`;
                    } else if (item.valueList[i].system == '') {
                        theQuery = theQuery.concat(`${item.valueList[i].code}`)
                    } else {
                        theQuery = theQuery.concat(`${item.valueList[i].system}|${item.valueList[i].code}`)
                    }
                }
            }
            return { queryString: theQuery, searchType: item.type }

        } else if (item.type == FhirConstant.searchType.string) {

            let theQuery = `${item.name}=`;
            for (let i = 0; i < item.valueList.length; i++) {

                if (i > 0) {
                    if (!isNil(item.valueList[i]) && !isNil(item.valueList[i].string) && item.valueList[i].string != '') {
                        theQuery = theQuery.concat(`,${item.valueList[i].string}`)
                    }
                } else {
                    if (item.modifier != 'none') {
                        if (item.modifier == 'missing') {
                            theQuery = `${item.name}:${item.modifier}=true`;
                        } else {
                            if (!isNil(item.valueList[i]) && !isNil(item.valueList[i].string) && item.valueList[i].string != '') {
                                theQuery = `${item.name}:${item.modifier}=${item.valueList[i].string}`;
                            }
                        }
                    } else {
                        if (!isNil(item.valueList[i]) && !isNil(item.valueList[i].string) && item.valueList[i].string != '') {
                            theQuery = theQuery.concat(`${item.valueList[i].string}`)
                        }
                    }
                }
            }
            return { queryString: theQuery, searchType: item.type }

        } else {
            return null;
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

        const renderResourceSelector = () => {

            let ResourcePopupMessage = 'Select a resource to search on';
            if (this.state.savedSearchParameters.length > 0) {
                ResourcePopupMessage = 'You must clear all search parameters to modify the currect resource type';
            }

            let LockResourceSelector = false;
            if (this.state.savedSearchParameters.length > 0) {
                LockResourceSelector = true;
            }
            return (
                <Segment raised >
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
                    {renderSearchType()}
                </Segment>
            )
        }

        const renderSearch = () => {
            if (isNil(this.state.ResourceElement)) {
                return null;
            } else {
                return (
                    // <Segment>
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
                    // </Segment>
                )
            }
        }

        const renderSearchType = () => {
            if (isNil(this.state.SearchElement)) {
                return null;
            } else if (this.state.SearchElement.type == FhirConstant.searchType.token) {
                return <TokenSearch onAddOrRemoveButtonClick={this.onAddSearchParameter} name={this.state.SearchElement.name} isEditMode={false} id={UuidSupport.createGUID()} ></TokenSearch>
            } else if (this.state.SearchElement.type == FhirConstant.searchType.string) {
                return <StringSearch onAddOrRemoveButtonClick={this.onAddSearchParameter} name={this.state.SearchElement.name} isEditMode={false} id={UuidSupport.createGUID()} ></StringSearch>
            }

        }

        const renderSavedSearchPatrameterList = () => {

            const renderAndDivider = (Index) => {
                if (this.state.savedSearchParameters.length > 1 && Index > 0) {
                    return <Divider horizontal>And</Divider>
                }
            }

            const revList = this.state.savedSearchParameters.slice(0);
            reverse(revList);
            return (
                <Grid.Row columns={16}>
                    <Grid.Column width={16}>
                        {map(revList, (item, Index) => {
                            // const System = item.system;
                            // const Code = item.code;
                            if (item.type == FhirConstant.searchType.token) {
                                return (
                                    <React.Fragment key={item.id}>
                                        {renderAndDivider(Index)}
                                        <TokenSearch
                                            onAddOrRemoveButtonClick={this.onRemoveSearchParameter}
                                            onTokenEdit={this.onEditSearchParameter}
                                            id={item.id}
                                            name={item.name}
                                            modifier={item.modifier}
                                            isEditMode={true}
                                            tokenElementList={item.valueList} />
                                    </React.Fragment>
                                )
                            } else if (item.type == FhirConstant.searchType.string) {
                                return (
                                    <React.Fragment key={item.id}>
                                        {renderAndDivider(Index)}
                                        <StringSearch
                                            onAddOrRemoveButtonClick={this.onRemoveSearchParameter}
                                            onStringEdit={this.onEditSearchParameter}
                                            id={item.id}
                                            name={item.name}
                                            modifier={item.modifier}
                                            isEditMode={true}
                                            stringElementList={item.valueList} />
                                    </React.Fragment>
                                )
                            } else {
                                return null;
                            }
                        })}
                    </Grid.Column>
                </Grid.Row>
            )
        }




        const renderQueryLabels = () => {
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
                        if (item.searchType == FhirConstant.searchType.token) {
                            return (
                                <React.Fragment key={index}>
                                    <Label color='grey'>{queryDelimiter}</Label>
                                    <Label color='teal'>{item.queryString}</Label>
                                </React.Fragment>
                            )
                        } else if (item.searchType == FhirConstant.searchType.string) {
                            return (
                                <React.Fragment key={index}>
                                    <Label color='grey'>{queryDelimiter}</Label>
                                    <Label color='blue'>{item.queryString}</Label>
                                </React.Fragment>
                            )
                        } else {
                            return null;
                        }
                    }
                })
            )
        }

        const renderFhirUrl = () => {
            if (!isNil(this.state.ResourceElement)) {
                return (
                    <Label.Group size='medium'>
                        <Label color='black'>[Base]</Label>
                        <Label color='grey'>/</Label>
                        <Label color='violet'>{this.state.selectedResource}</Label>
                        {renderQueryLabels()}
                    </Label.Group>

                )
            } else {
                return null;
            }
        };

        const renderFhirQuery = () => {
            if (this.state.savedSearchParameters.length > 0) {
                return (
                    <Grid.Row columns={16}>
                        <Grid.Column width={16}>
                            <Segment>
                                <Grid>
                                    <Grid.Row columns={16}>
                                        <Grid.Column width={16}>
                                            <Header>FHIR Query</Header>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={16}>
                                        <Grid.Column width={14}>
                                            <Segment>
                                                {renderFhirUrl()}
                                            </Segment>
                                        </Grid.Column>
                                        <Grid.Column width={2} verticalAlign='middle'>
                                            <Button onClick={this.onSendClick} floated='right' color='blue'>Send</Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row >
                )
            } else {
                return null;
            }
        }
        return (
            <Segment>
                <Grid>
                    <Grid.Row columns={16}>
                        <Grid.Column width={16}>
                            {renderResourceSelector()}
                        </Grid.Column>
                    </Grid.Row>
                    {renderFhirQuery()}
                    {renderSavedSearchPatrameterList()}
                </Grid>
            </Segment >
        )
    }


}

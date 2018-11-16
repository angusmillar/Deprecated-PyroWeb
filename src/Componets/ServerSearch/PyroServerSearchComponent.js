import React from 'react';

import { Grid, Button, Form, Label, Divider, Header, Popup } from 'semantic-ui-react'

import map from 'lodash/map';
import filter from 'lodash/filter';
import findIndex from 'lodash/findIndex';
import reverse from 'lodash/reverse';
import isNil from 'lodash/isNil';

import PropTypes from 'prop-types';

import SearchToken from '../FhirComponent/Search/SearchToken';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';

import UuidSupport from '../../SupportTools/UuidSupport'

export default class PyroServerSearchComponent extends React.Component {

    static propTypes = {
        ConformanceStatmentResource: PropTypes.object.isRequired,
        FhirServerName: PropTypes.string.isRequired
    }

    static defaultProps = {
    }

    constructor(props) {
        super(props);
        // this.onTokenRemove = this.onTokenRemove.bind(this);
        this.state = {
            selectedResource: [{ key: 'none', icon: 'tag', text: 'none', value: 'none' }],
            selectedSearch: 'none',
            SearchElement: { key: 'none', icon: 'search', text: 'none', description: 'none', value: 'none' },
            savedSearchParameters: [],
        };
    }

    handleResourceFilterChange = (e, { value }) => {
        const ResourceArray = filter(this.props.ConformanceStatmentResource.rest[0].resource, { 'type': value });
        this.setState(() => ({ selectedResource: value, ResourceElement: ResourceArray[0] }));
    }

    handleSearchFilterChange = (e, { value }) => {
        const SearchArray = filter(this.state.ResourceElement.searchParam, { 'name': value });
        this.setState(() => ({ selectedSearch: value, SearchElement: SearchArray[0] }));
    }

    onTokenSubmit = (Submitted) => {

        const searchParameter = {
            id: UuidSupport.createGUID(),
            type: Submitted.submittedType,
            name: Submitted.submittedName,
            system: Submitted.submittedSystem,
            code: Submitted.submittedCode
        };
        const newArray = this.state.savedSearchParameters.slice(0);
        newArray.push(searchParameter);

        this.setState({ savedSearchParameters: newArray, SearchElement: null, selectedSearch: 'none' })
    };

    onTokenEdit = (Submitted) => {

        const searchParameter = {
            id: Submitted.submittedId,
            type: Submitted.submittedType,
            name: Submitted.submittedName,
            system: Submitted.submittedSystem,
            code: Submitted.submittedCode
        };

        const newArray = this.state.savedSearchParameters.slice(0);
        const Index = findIndex(newArray, { id: searchParameter.id })
        newArray.splice(Index, 1, searchParameter);


        this.setState({ savedSearchParameters: newArray })
    };

    onTokenRemove = (Submitted) => {
        const newArray = filter(this.state.savedSearchParameters, function (currentObject) {
            return currentObject.id != Submitted.submittedId;
        });

        this.setState({ savedSearchParameters: newArray })
    };

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
                                    onChange={this.handleResourceFilterChange} />

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
                                // defaultValue='none'
                                options={searchList()}
                                placeholder='Search Parameter'
                                search
                                closeOnChange
                                onChange={this.handleSearchFilterChange}
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
            } else if (this.state.SearchElement.type == 'token') {
                return <SearchToken onSubmit={this.onTokenSubmit} name={this.state.SearchElement.name} isEditMode={false} id={UuidSupport.createGUID()} ></SearchToken>
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
                            const System = item.system;
                            const Code = item.code;
                            if (item.type == 'token') {
                                return (
                                    <React.Fragment key={item.id}>
                                        {renderAndDivider(Index)}
                                        <SearchToken onSubmit={this.onTokenRemove} onTokenEdit={this.onTokenEdit} id={item.id} name={item.name} system={System} code={Code} isEditMode={true}></SearchToken>
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


        const queryElementArray = map(this.state.savedSearchParameters, (item) => {
            if (item.type == 'token') {
                return { queryString: `${item.name}=${item.system}|${item.code}`, searchType: item.type }
            } else {
                return null;
            }
        })

        const renderQueryLabels = () => {
            return (
                map(queryElementArray, (item, index) => {
                    let queryDelimiter = '&';
                    if (index == 0) {
                        queryDelimiter = '?';
                    }
                    if (item.searchType == 'token') {
                        return (
                            <React.Fragment key={index}>
                                <Label color='grey'>{queryDelimiter}</Label>
                                <Label color='teal'>{item.queryString}</Label>
                            </React.Fragment>
                        )
                    } else {
                        return null;
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
                                            <Button floated='right' color='blue'>Send</Button>
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

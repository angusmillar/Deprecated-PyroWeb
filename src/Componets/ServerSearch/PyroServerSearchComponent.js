import React from 'react';

import { Grid, Form, Label, Divider } from 'semantic-ui-react'

import map from 'lodash/map';
import filter from 'lodash/filter';
// import filter from 'lodash/filter';
import reverse from 'lodash/reverse';


import PropTypes from 'prop-types';

import SearchToken from '../FhirComponent/Search/SearchToken';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import isNil from 'lodash/isNil';
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
            selectedSearch: [{ key: 'none', icon: 'search', text: 'none', description: 'none', value: 'none' }],
            savedSearchParameters: []
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
            type: 'token',
            name: Submitted.submittedName,
            system: Submitted.submittedSystem,
            code: Submitted.submittedCode
        };
        const newArray = this.state.savedSearchParameters.slice(0);
        newArray.push(searchParameter);

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
            return (
                <Segment raised >
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Select
                                label='Resource'
                                fluid
                                defaultValue='none'
                                options={ResourceList}
                                placeholder='Resource'
                                search
                                closeOnChange
                                onChange={this.handleResourceFilterChange} />
                        </Form.Group>
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
                                defaultValue='none'
                                options={searchList()}
                                placeholder='Search Parameter'
                                search
                                closeOnChange
                                onChange={this.handleSearchFilterChange} />
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
                return <SearchToken onSubmit={this.onTokenSubmit} name={this.state.SearchElement.name} readOnly={false} id={UuidSupport.createGUID()} ></SearchToken>
            }
        }

        const renderSavedSearchPatrameterList = () => {

            const renderAndDivider = (Index) => {
                if (this.state.savedSearchParameters.length > 1 & Index > 0) {
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
                                        <SearchToken onSubmit={this.onTokenRemove} id={item.id} name={item.name} system={System} code={Code} readOnly={true}></SearchToken>
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

        const renderFhirQuery = () => {

            const queryElementArray = map(this.state.savedSearchParameters, (item) => {
                if (item.type == 'token') {
                    return `${item.name}=${item.system}|${item.code}`
                } else {
                    return null;
                }
            })

            const query = (QueryArray) => {
                const arrayLength = QueryArray.length;
                let FinalQuery = '';
                for (let i = 0; i < arrayLength; i++) {
                    if (i == 0) {
                        FinalQuery = FinalQuery.concat(`?${QueryArray[i]}`)
                    } else {
                        FinalQuery = FinalQuery.concat(`&${QueryArray[i]}`)
                    }

                }
                return FinalQuery;
            };

            return query(queryElementArray);
        }

        const renderFhirUrl = () => {
            if (!isNil(this.state.ResourceElement)) {
                return (
                    <React.Fragment>
                        <Label size='mini' color='blue'>[Base]</Label>
                        <Label size='mini' color='grey'>/</Label>
                        <Label size='mini' color='violet'>{this.state.selectedResource}</Label>
                        <Label size='mini' color='grey'>?</Label>
                        <Label size='mini' color='teal'>{renderFhirQuery()}</Label>
                        <Label size='mini' color='grey'>&</Label>
                        <Label size='mini' color='purple'>{renderFhirQuery()}</Label>
                        <Label size='mini' color='grey'>&</Label>
                        <Label size='mini' color='brown'>{renderFhirQuery()}</Label>
                        <Label size='mini' color='grey'>&</Label>
                        <Label size='mini' color='olive'>{renderFhirQuery()}</Label>

                    </React.Fragment>
                )
            } else {
                return null;
            }
        };

        return (
            <Segment>
                <Grid>
                    <Grid.Row columns={16}>
                        <Grid.Column width={16}>
                            {renderResourceSelector()}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={16}>
                        <Grid.Column width={16}>
                            <Segment>
                            <label>FHIR URL</label><br></br>
                                {renderFhirUrl()}

                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    {renderSavedSearchPatrameterList()}
                </Grid>
            </Segment >
        )
    }


}

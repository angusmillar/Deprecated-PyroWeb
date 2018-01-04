import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import find from 'lodash/find'
import map from 'lodash/map';
import transform from 'lodash/transform'
import { Grid, List, Divider, Dropdown, Header, Segment } from 'semantic-ui-react'

import RestAPIComponent from './RestAPIComponent'
import ContactDetails_Table from '../FhirComponent/ComplexType/ContactPoint/ContactDetails_Table'

export default class PyroServerApi extends React.Component {

    static propTypes = {
        ConformanceStatmentResource: PropTypes.object.isRequired,
        apiSchema: PropTypes.array.isRequired,
    }

    static defaultProps = {
        apiSchema: [{ key: 'https', text: 'https', value: 'https' }, { key: 'http', text: 'http', value: 'http' }],
    }

    constructor(props) {
        super(props);
        this.formatArray = transform(this.props.ConformanceStatmentResource.format, (result, form) => {
            result.push({ key: form, text: form, value: form });
        });


        this.state = {
            selectedSchema: this.props.apiSchema[0],
            selectedContentType: this.formatArray[0].value,
            selectedAccept: this.formatArray[0].value,
        };
    }

    handleSchemaChange = (e, { value }) => {
        const x = find(this.props.apiSchema, ['value', value])
        this.setState(() => ({ selectedSchema: x }));
    }

    handleContentTypeChange = (e, { value }) => {
        this.setState(() => ({ selectedContentType: value }));        
    }

    handleAcceptChange = (e, { value }) => {
        this.setState(() => ({ selectedAccept: value }));
    }


    render() {

        const renderContact = (Contacts) => {
            if (isNil(Contacts)) {
                return null
            }
            else {
                return (
                    map(Contacts, (Contact, Index) => {
                        return (
                            <ContactDetails_Table
                                key={Index}
                                Telecom={Contact.telecom}
                                Name={Contact.name} />
                        )
                    }
                    ))
            }
        };

        const renderEndpointUrl = (ServiceRootUrl) => {
            if (isNil(this.props.apiSchema) || isNil(ServiceRootUrl)) {
                return null
            }
            else {
                const FullUrl = `${this.state.selectedSchema.value}://${ServiceRootUrl}`;
                return FullUrl;
            }
        };

        const renderResources = (Resources) => {
            if (isNil(Resources)) {
                return null
            }
            else {
                // const ConentType = this.state.selectedContentType;
                return (
                    map(Resources, (Resource, Index) => {
                        return (
                            <RestAPIComponent
                                key={Index}
                                resource={Resource}
                                endpointUrl={EndpointUrl}
                                contentTypeElement={ContentTypeElement}
                                acceptElement={AcceptElement}
                                selectedContentType={this.state.selectedContentType}
                            />
                        )
                    }
                    )
                )
            }
        };

        const renderContentTypeDropdown = () => {
            return (
                <Dropdown
                    options={this.formatArray}
                    floating                    
                    onChange={this.handleContentTypeChange}
                    value={this.state.selectedContentType}
                />
            )
        };

        const renderAcceptDropdown = () => {
            return (
                <Dropdown
                    options={this.formatArray}
                    floating                    
                    onChange={this.handleAcceptChange}
                    value={this.state.selectedAccept}
                />
            )
        };

        const FhirResource = this.props.ConformanceStatmentResource;
        const currentSchemaValue = this.state.selectedSchema;
        // const currentContentType = this.state.selectedContentType;
        // const formatArray = transform(FhirResource.format, (result, form) => {
        //     result.push({ key: form, text: form, value: form });
        // });

        const HeadingSize = 'medium';
        const HeadingColor = 'black';
        const serviceRootUrl = FhirResource.implementation.url;
        const apiDescription = FhirResource.implementation.description;
        const apiContacts = FhirResource.contact;
        const apiResources = FhirResource.rest[0].resource;
        const ContentTypeElement = renderContentTypeDropdown();
        const AcceptElement = renderAcceptDropdown();
        const EndpointUrl = renderEndpointUrl(serviceRootUrl);

        return (
            <div>
                <Segment padded>
                    <List relaxed='very'>
                        <List.Item>
                            <List.Content>
                                <Header color={HeadingColor} dividing size={HeadingSize} >FHIR endpoint</Header><br />
                            </List.Content>
                            <span>
                                Schema: {' '}
                                <Dropdown inline
                                    options={this.props.apiSchema}
                                    value={currentSchemaValue.value}
                                    onChange={this.handleSchemaChange} />
                            </span>
                        </List.Item>
                        <List.Item>
                            <Grid columns={2}>
                                <Grid.Row>
                                    <Grid.Column floated='left' width={5}>
                                        Endpoint Url:
                                    </Grid.Column>
                                    <Grid.Column floated='left' width={10}>
                                        <b><code>{EndpointUrl}</code></b>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column floated='left' width={5}>
                                        {/* this leaves space for formating purposes */}
                                    </Grid.Column>
                                    <Grid.Column floated='left' width={10}>
                                        The service base Url with the schema pre-pended
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column floated='left' width={5}>
                                        Service base Url
                                    </Grid.Column>
                                    <Grid.Column floated='left' width={10}>
                                        <b><code>{serviceRootUrl}</code></b>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column floated='left' width={5}>
                                        {/* this leaves space for formating purposes */}
                                    </Grid.Column>
                                    <Grid.Column floated='left' width={10}>
                                        The service base Url
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </List.Item>
                        <List.Item>
                            <Header color={HeadingColor} dividing size={HeadingSize}>Description</Header>
                            <p>{apiDescription}</p>
                        </List.Item>
                        <List.Item>
                            <Header color={HeadingColor} dividing size={HeadingSize}>Contact Developer</Header>
                            {renderContact(apiContacts)}
                        </List.Item>
                        <List.Item>
                            <Header color={HeadingColor} dividing size={HeadingSize}>Content-Type &amp; Accept Headers</Header>
                            <Divider hidden />
                            <Grid columns={3}>
                                <Grid.Row>
                                    <Grid.Column floated='left' width={2}>
                                        Content-Type:
                                    </Grid.Column>
                                    <Grid.Column floated='left' width={7}>
                                        <b>
                                            {ContentTypeElement}
                                        </b>
                                    </Grid.Column>
                                    <Grid.Column floated='left' width={4}>
                                        The format the data you are sending to the server is formated as
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column floated='left' width={2}>
                                        Accept:
                                    </Grid.Column>
                                    <Grid.Column floated='left' width={7}>
                                        <b>
                                            <Dropdown
                                                options={this.formatArray}
                                                floating
                                                value={this.state.selectedAccept}
                                                onChange={this.handleAcceptChange}
                                            />
                                        </b>
                                    </Grid.Column>
                                    <Grid.Column floated='left' width={4}>
                                        The format you are asking the server to return the data as                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </List.Item>
                    </List>
                </Segment>
                {renderResources(apiResources)}
            </div>
        )
    }

}

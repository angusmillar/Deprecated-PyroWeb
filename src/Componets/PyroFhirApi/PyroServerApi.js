import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import find from 'lodash/find'
import map from 'lodash/map';
import transform from 'lodash/transform'
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import { Grid, Dropdown, Header, Popup, Segment } from 'semantic-ui-react'

import RestAPIComponent from './RestAPIComponent'
import ContactDetails_Table from '../FhirComponent/ComplexType/ContactPoint/ContactDetails_Table'
import FhirConstant from '../../Constants/FhirConstant';

export default class PyroServerApi extends React.Component {

    static propTypes = {
        ConformanceStatmentResource: PropTypes.object.isRequired,
    }

    static defaultProps = {
        // apiSchema: [{ key: 'https', text: 'https', value: 'https' }, { key: 'http', text: 'http', value: 'http' }],
    }

    constructor(props) {
        super(props);
        this.formatArray = transform(this.props.ConformanceStatmentResource.format, (result, form) => {
            result.push({ key: form, text: form, value: form });
        });

        this.AcceptResponseformatArray = [
            { key: FhirConstant.DefaultFhirJsonFormat, text: FhirConstant.DefaultFhirJsonFormat, value: FhirConstant.DefaultFhirJsonFormat },
            { key: FhirConstant.DefaultFhirXmlFormat, text: FhirConstant.DefaultFhirXmlFormat, value: FhirConstant.DefaultFhirXmlFormat }],

            this.state = {
                selectedContentType: find(this.formatArray, ['value', FhirConstant.DefaultFhirJsonFormat]).value,
                selectedAccept: find(this.formatArray, ['value', FhirConstant.DefaultFhirJsonFormat]).value,
                selectedResponseAccept: find(this.AcceptResponseformatArray, ['value', FhirConstant.DefaultFhirJsonFormat]).value,
            };
    }

    handleContentTypeChange = (e, { value }) => {
        this.setState(() => ({ selectedContentType: value }));
    }

    // Switch the list of Format types to the default format Types used application/fhir+xml or application/fhir+json
    // User can use the non-standard formats 'text/xml' in the Accept header but they will only ever be retuned in responses
    // the FHIR default equivented application/fhir+xml or application/fhir+json
    // this switch and seperate ResponseAcceptDropdown manage this
    responseFormat = (value) => {
        if (includes(toLower(value), 'xml')) {
            return FhirConstant.DefaultFhirXmlFormat;
        } else if (includes(toLower(value), 'json')) {
            return FhirConstant.DefaultFhirJsonFormat;
        } else {
            return value;
        }
    }

    handleAcceptChange = (e, { value }) => {
        this.setState(() => ({ selectedAccept: value, selectedResponseAccept: this.responseFormat(value) }));
    }

    handleResponseAcceptChange = (e, { value }) => {

        this.setState(() => ({ selectedAccept: value, selectedResponseAccept: this.responseFormat(value) }));
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
                                acceptResponseElement={AcceptResponseElement}
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

        const renderResponseAcceptDropdown = () => {
            return (
                <Dropdown
                    options={this.AcceptResponseformatArray}
                    floating
                    onChange={this.handleAcceptChange}
                    value={this.state.selectedResponseAccept}
                />
            )
        };

        const FhirResource = this.props.ConformanceStatmentResource;
        const HeadingSize = 'medium';
        const HeadingColor = 'grey';
        const serviceRootUrl = FhirResource.implementation.url;
        const apiDescription = FhirResource.implementation.description;
        const apiContacts = FhirResource.contact;
        const apiResources = FhirResource.rest[0].resource;
        const ContentTypeElement = renderContentTypeDropdown();
        const AcceptElement = renderAcceptDropdown();
        const AcceptResponseElement = renderResponseAcceptDropdown();
        const EndpointUrl = serviceRootUrl;

        return (
            <div>
                <Segment>
                    <Grid stackable>
                        <Grid.Row columns={16} stretched>
                            <Grid.Column width={16}>
                                <Header color={HeadingColor} dividing size={HeadingSize}>Implementation Description</Header>
                            </Grid.Column>
                            <Grid.Column width={13} floated='left'>
                                <p>{apiDescription}</p>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={16} stretched>
                            <Grid.Column width={16}>
                                <Header color={HeadingColor} dividing size={HeadingSize} >FHIR endpoint</Header>
                            </Grid.Column>
                            <Grid.Column width={3} floated='left' >
                                <b>Endpoint Url</b>
                            </Grid.Column>
                            <Grid.Column width={13} floated='left'>
                                <Popup
                                    trigger={<code>{EndpointUrl}</code>}
                                    content='The FHIR server&#39;s service base Url with the schema pre-pended'
                                />
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={16} stretched>
                            <Grid.Column width={16}>
                                <Header color={HeadingColor} dividing size={HeadingSize}>Content-Type &amp; Accept Headers</Header>
                                {/* <br /> */}
                            </Grid.Column>
                            <Grid.Column width={3} floated='left'>
                                <b>Content-Type</b>
                            </Grid.Column>
                            <Grid.Column width={5} floated='left' >
                                {ContentTypeElement}
                            </Grid.Column>
                            <Grid.Column width={8} floated='left'>
                                <p>The format of the data you are sending to the server</p>
                            </Grid.Column>

                            <Grid.Column width={3} floated='left'>
                                <b>Accept</b>
                            </Grid.Column>
                            <Grid.Column width={5} floated='left' >
                                <Dropdown
                                    options={this.formatArray}
                                    floating
                                    value={this.state.selectedAccept}
                                    onChange={this.handleAcceptChange}
                                />
                            </Grid.Column>
                            <Grid.Column width={8} floated='left'>
                                <p>The format you are asking the server to return</p>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={16} stretched>
                            <Grid.Column width={16}>
                                <Header color={HeadingColor} dividing size={HeadingSize}>Contact Developer</Header>
                                <br />
                            </Grid.Column>
                            <Grid.Column width={16} >
                                {renderContact(apiContacts)}
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={16} stretched>
                            <Grid.Column width={16}>
                                <Header color={HeadingColor} dividing size={HeadingSize}>Resources</Header>
                                <br />
                            </Grid.Column>
                            <Grid.Column width={16} >
                                {renderResources(apiResources)}
                            </Grid.Column>
                        </Grid.Row>

                    </Grid>
                </Segment>
            </div>
        )

    }

}

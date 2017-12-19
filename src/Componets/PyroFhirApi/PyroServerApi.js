import React from 'react';
import AppActionsMetadata from 'Actions/AppActionsMetadata';
import AppStoreMetadata from 'Store/AppStoreMetadata';
import AjaxConstant from 'Constants/AjaxConstant';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import find from 'lodash/find'
import map from 'lodash/map';
import { List, Dropdown, Divider, Container, Header, Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

import RestAPIComponent from './RestAPIComponent'
import ContactDetails_Table from '../FhirComponent/ComplexType/ContactPoint/ContactDetails_Table'

function getItemsState() {
    return {
        MetadataState: AppStoreMetadata.getState()
    };
}

class PyroServerApi extends React.Component {
    constructor(props) {
        super(props);
        this.initialise();
        // this.state = getItemsState();
        this.state = { store: getItemsState(), selectedSchema: this.props.apiSchema[0] };
        this._onChange = this._onChange.bind(this);
        this.handleSchemaChange = this.handleSchemaChange.bind(this);
    }

    getInitialState() {
        return getItemsState();
    }

    componentDidMount() {
        AppStoreMetadata.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        AppStoreMetadata.removeChangeListener(this._onChange);
    }

    initialise() {
        //AppActionsMetadata.initialiseStore();
        AppActionsMetadata.getMetadata()
    }

    handleClickGetMetadata() {
        AppActionsMetadata.getMetadata();
    }

    _onChange() {
        this.setState({ store: getItemsState() });
    }

    handleSchemaChange(e, { value }) {
        const x = find(this.props.apiSchema, ['value', value])
        this.setState({ selectedSchema: x })
    }


    renderApiDocumentation() {
        if (this.state.store.MetadataState.AjaxCallState === AjaxConstant.CallState.Call_None) {
            return null;
        }
        else if (this.state.store.MetadataState.AjaxCallState === AjaxConstant.CallState.Call_Pending) {
            return (
                <Segment>
                    <Dimmer active inverted>
                        <Loader size='large'>Loading</Loader>
                    </Dimmer>
                    <Image src={this.props.wireframeParagraphImage} />
                </Segment>
            );
        }
        else if (this.state.store.MetadataState.AjaxCallState === AjaxConstant.CallState.Call_Complete) {
            if (this.state.store.MetadataState.AjaxOutcome.CallCompletedState == AjaxConstant.CallCompletedState.Completed_Ok) {
                //We have the ConformanceStatment FHIR Resource

                const renderContact = (Contacts) => {
                    if (isNil(Contacts)) {
                        return null
                    }
                    else {
                        return (
                            map(Contacts, (Contact, Index) => {
                                return (
                                    <ContactDetails_Table key={Index} Telecom={Contact.telecom} Name={Contact.name} />
                                )
                            }
                            ))
                    }
                };

                const renderFullURL = (ServiceRootUrl) => {
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
                        return (
                            map(Resources, (Resource, Index) => {
                                return (
                                    <RestAPIComponent key={Index} resource={Resource} />
                                )
                            }
                            ))
                    }
                };


                const FhirResource = this.state.store.MetadataState.AjaxOutcome.FhirResource;
                const currentValue = this.state.selectedSchema.value;
                const HeadingSize = 'medium';
                const apiTitle = `${FhirResource.name} FHIR API `;                                
                const serviceRootUrl = FhirResource.implementation.url;
                const apiDescription = FhirResource.implementation.description;
                const apiContacts = FhirResource.contact;
                const apiResources = FhirResource.rest[0].resource;


                
                return (
                    <Container text style={{ marginTop: '7em' }}>
                        <div>
                            <Divider hidden />
                            <Header size='large'>{apiTitle}</Header>
                            <Segment padded>
                                <List relaxed='very'>
                                    <List.Item>
                                        <List.Content>
                                            <Header color='teal' dividing size={HeadingSize} >FHIR endpoint</Header><br />
                                        </List.Content>
                                        <span>
                                            <b>Schema: </b> {' '}
                                            <Dropdown inline
                                                options={this.props.apiSchema}
                                                defaultValue={currentValue}
                                                onChange={this.handleSchemaChange} />
                                        </span>
                                    </List.Item>
                                    <List.Item>
                                        <p><b>Endpoint URL: </b>     {renderFullURL(serviceRootUrl)}</p><br />
                                    </List.Item>
                                    <List.Item>
                                        <p><b>Service Base URL: </b>{serviceRootUrl}</p>
                                    </List.Item>
                                    <List.Item>
                                        <Header color='teal' dividing size={HeadingSize}>Description</Header>
                                        <p>{apiDescription}</p>
                                    </List.Item>
                                    <List.Item>                                        
                                        <Header color='teal' dividing size={HeadingSize}>Contact Developer</Header>
                                        {renderContact(apiContacts)}                                        
                                    </List.Item>
                                </List>
                            </Segment>
                            {renderResources(apiResources)}                            
                        </div>
                    </Container>
                )
                
            }
            else if (this.state.store.MetadataState.AjaxOutcome.CallCompletedState == AjaxConstant.CallCompletedState.Completed_ResponseNotOk) {
                return <h2>Response was not OK Maybe a FHIR OperationOutcome, work to do here!</h2>
            }
            else if (this.state.store.MetadataState.AjaxOutcome.CallCompletedState == AjaxConstant.CallCompletedState.Completed_NoResponse) {
                return <h2>We got no response from the Ajax call, work to do here!</h2>
            }
            else if (this.state.store.MetadataState.AjaxOutcome.CallCompletedState == AjaxConstant.CallCompletedState.Completed_CallSetupFailed) {
                return <h2>Call Setup failed in Ajax call, work to do here!</h2>
            }
            else {
                return <h2>Unkown AjaxConstant.CallCompletedState</h2>
            }

        }
    }



    render() {
        return (
            <div>
                {this.renderApiDocumentation()})
            </div>
        )
    }

}
//Type Checking
PyroServerApi.propTypes = {
    wireframeParagraphImage: PropTypes.string,        
    apiSchema: PropTypes.array.isRequired,            
}

PyroServerApi.defaultProps = {
    wireframeParagraphImage: require('../../Images/wireframe/paragraph.png'),        
    apiSchema: [{ key: 'https', text: 'https', value: 'https' }, { key: 'http', text: 'http', value: 'http' }],            
}

export default PyroServerApi;  
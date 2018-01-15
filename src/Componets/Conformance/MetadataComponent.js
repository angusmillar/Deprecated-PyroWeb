import React from 'react';

import { Icon, Divider, Container, Header, Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

import AjaxConstant from 'Constants/AjaxConstant';
import MetadataHeader from './MetadataHeader';
import PropTypes from 'prop-types';

export default class MetadataComponent extends React.Component {
    
    static propTypes = {
        store: PropTypes.object.isRequired,
        wireframeParagraphImage: PropTypes.string,
    }

    static defaultProps = {    
        wireframeParagraphImage: require('../../Images/wireframe/paragraph.png')
    }
    
    constructor(props) {
        super(props);        
    }

    conformanceStatement() {
        if (this.props.store.MetadataState.AjaxCallState === AjaxConstant.CallState.Call_None) {
            return null;
        }
        else if (this.props.store.MetadataState.AjaxCallState === AjaxConstant.CallState.Call_Pending) {
            return (
                <Segment>
                    <Dimmer active inverted>
                        <Loader size='large'>Loading</Loader>
                    </Dimmer>
                    <Image src={this.props.wireframeParagraphImage} />
                </Segment>
            );
        }
        else if (this.props.store.MetadataState.AjaxCallState === AjaxConstant.CallState.Call_Complete) {
            if (this.props.store.MetadataState.AjaxOutcome.CallCompletedState == AjaxConstant.CallCompletedState.Completed_Ok) {
                const FhirResource = this.props.store.MetadataState.AjaxOutcome.FhirResource;
                return <MetadataHeader
                    Date={FhirResource.date}
                    Name={FhirResource.name}
                    Version={FhirResource.version}
                    FhirVersion={FhirResource.fhirVersion}
                    Publisher={FhirResource.publisher}
                    Description={FhirResource.description}
                    Status={FhirResource.status}
                    Experimental={FhirResource.experimental}
                    Url={FhirResource.url}
                    Purpose={FhirResource.purpose}
                    Copyright={FhirResource.copyright}
                    Kind={FhirResource.kind}
                    AcceptUnknown={FhirResource.acceptUnknown}
                    Contact={FhirResource.contact}
                    Jurisdiction={FhirResource.jurisdiction}
                    Software={FhirResource.software}
                    Implementation={FhirResource.implementation}
                    Format={FhirResource.format}
                    Rest={FhirResource.rest}>
                </MetadataHeader>
            }
            else if (this.props.store.MetadataState.AjaxOutcome.CallCompletedState == AjaxConstant.CallCompletedState.Completed_ResponseNotOk) {
                return <h2>Response was not OK Maybe a FHIR OperationOutcome, work to do here!</h2>
            }
            else if (this.props.store.MetadataState.AjaxOutcome.CallCompletedState == AjaxConstant.CallCompletedState.Completed_NoResponse) {
                return <h2>We got no response from the Ajax call, work to do here!</h2>
            }
            else if (this.props.store.MetadataState.AjaxOutcome.CallCompletedState == AjaxConstant.CallCompletedState.Completed_CallSetupFailed) {
                return <h2>Call Setup failed in Ajax call, work to do here!</h2>
            }
            else {
                return <h2>Unkown AjaxConstant.CallCompletedState</h2>
            }

        }
    }

    render() {
        
        return (
            <Container style={{ marginTop: '7em' }}>                
                <div>
                    <Divider hidden />
                    <Header as='h2'>
                        <Icon name='settings' />
                        <Header.Content>
                            FHIR Server Conformance Statement
                    </Header.Content>
                    </Header>
                    <Segment raised padded >
                        {this.conformanceStatement()}
                    </Segment>

                </div>
            </Container>
        )
    }

}

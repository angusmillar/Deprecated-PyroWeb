import React from 'react';
import AppActionsMetadata from 'Actions/AppActionsMetadata';
import AppStoreMetadata from 'Store/AppStoreMetadata';
import AjaxConstant from 'Constants/AjaxConstant';
import MetadataHeader from './MetadataHeader';
import PropTypes from 'prop-types';
import { Icon, Divider, Container, Header, Dimmer, Loader, Image, Segment } from 'semantic-ui-react'


function getItemsState() {
    return {
        MetadataState: AppStoreMetadata.getState()
    };
}

class MetadataComponent extends React.Component {
    constructor(props) {
        super(props);
        this.initialise();
        this.state = getItemsState();
        this._onChange = this._onChange.bind(this);
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
        this.setState(getItemsState());
    }

    conformanceStatement() {
        if (this.state.MetadataState.AjaxCallState === AjaxConstant.CallState.Call_None) {
            return null;
        }
        else if (this.state.MetadataState.AjaxCallState === AjaxConstant.CallState.Call_Pending) {
            return (
                <div>
                    <Segment>
                        <Dimmer active inverted>
                            <Loader size='large'>Loading</Loader>
                        </Dimmer>
                        <Image src={this.props.wireframeParagraphImage} />
                    </Segment>
                </div>
            );
        }
        else if (this.state.MetadataState.AjaxCallState === AjaxConstant.CallState.Call_Complete) {
            if (this.state.MetadataState.AjaxOutcome.CallCompletedState == AjaxConstant.CallCompletedState.Completed_Ok) {
                const FhirResource = this.state.MetadataState.AjaxOutcome.FhirResource;
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
            else if (this.state.MetadataState.AjaxOutcome.CallCompletedState == AjaxConstant.CallCompletedState.Completed_ResponseNotOk) {
                return <h2>Response was not OK Maybe a FHIR OperationOutcome, work to do here!</h2>
            }
            else if (this.state.MetadataState.AjaxOutcome.CallCompletedState == AjaxConstant.CallCompletedState.Completed_NoResponse) {
                return <h2>We got no response from the Ajax call, work to do here!</h2>
            }
            else if (this.state.MetadataState.AjaxOutcome.CallCompletedState == AjaxConstant.CallCompletedState.Completed_CallSetupFailed) {
                return <h2>Call Setup failed in Ajax call, work to do here!</h2>
            }
            else {
                return <h2>Unkown AjaxConstant.CallCompletedState</h2>
            }

        }
    }

    render() {
        //const items = this.state.appState;


        return (
            <Container text style={{ marginTop: '7em' }}>
                {/* <Button positive onClick={this.handleClickGetMetadata} >Load Conformance Statment</Button>                 */}
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
//Type Checking
MetadataComponent.propTypes = {
    wireframeParagraphImage: PropTypes.string,
}

MetadataComponent.defaultProps = {
    wireframeParagraphImage: require('../../Images/wireframe/paragraph.png')
}

export default MetadataComponent;  
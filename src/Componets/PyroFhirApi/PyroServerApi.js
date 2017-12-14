import React from 'react';
import AppActionsMetadata from 'Actions/AppActionsMetadata';
import AppStoreMetadata from 'Store/AppStoreMetadata';
import AjaxConstant from 'Constants/AjaxConstant';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import find from 'lodash/find'
import { List, Dropdown, Icon, Divider, Container, Header, Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

import RestAPIComponent from './RestAPIComponent'

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
                return <RestAPIComponent />
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

        const renderFullURL = () => {
            if (isNil(this.props.apiSchema) || isNil(this.props.serviceRootUrl)) {
                return null
            }
            else {
                const FullUrl = `${this.state.selectedSchema.value}://${this.props.serviceRootUrl}`;
                return (
                    <List.Content>
                        <List.Description as='a' href={FullUrl}>{FullUrl}</List.Description>
                    </List.Content>
                )
            }
        };

        const currentValue = this.state.selectedSchema.value;
        return (
            <Container text style={{ marginTop: '7em' }}>
                {/* <Button positive onClick={this.handleClickGetMetadata} >Load Conformance Statment</Button>                 */}
                <div>
                    <Divider hidden />
                    <Header size='large'>{this.props.apiTitle}</Header>
                    <Segment padded>
                        <List relaxed='very'>
                            <List.Content>
                                <code>[<b>Base URL: </b>{this.props.serviceRootUrl}]</code>
                            </List.Content>
                            <List.Item>{renderFullURL()}</List.Item>
                            <List.Item>
                                <Header size='tiny'>Description</Header>
                                <p>{this.props.apiDescription}</p>
                            </List.Item>
                            <List.Item>

                                <Header size='tiny'>Contact Developer</Header>
                                <List.Description as='a' href={'mailto:'.concat(this.props.apiContactEmail)}>{this.props.apiContactEmail}</List.Description>

                            </List.Item>
                            <Header size='tiny'>Schema</Header>
                            <List.Content>
                                <Dropdown
                                    placeholder='schema'
                                    value={currentValue}                                   
                                    selection
                                    options={this.props.apiSchema}
                                    onChange={this.handleSchemaChange} />
                            </List.Content>
                        </List>



                    </Segment>

                    <Segment raised padded >
                        {this.renderApiDocumentation()}
                    </Segment>

                </div>
            </Container>
        )
    }

}
//Type Checking
PyroServerApi.propTypes = {
    wireframeParagraphImage: PropTypes.string,
    apiTitle: PropTypes.string.isRequired,
    apiServerName: PropTypes.string.isRequired,
    apiSchema: PropTypes.array.isRequired,
    serviceRootUrl: PropTypes.string.isRequired,
    apiDescription: PropTypes.string.isRequired,
    apiContactEmail: PropTypes.string.isRequired,
}

PyroServerApi.defaultProps = {
    wireframeParagraphImage: require('../../Images/wireframe/paragraph.png'),
    apiTitle: 'Pyro Server FHRI API ',
    apiServerName: 'Pyro FHIR Server',
    apiSchema: [{ key: 'https', text: 'https', value: 'https' }, { key: 'http', text: 'http', value: 'http' }],
    serviceRootUrl: 'stu3.test.pyrohealth.net/fhir',
    apiDescription: 'The is the API docuemntation for the Pyro FHIR Server which is an implmentation based to the HL7 FHIR specification.',
    apiContactEmail: 'angusbmillar@gmail.com'
}

export default PyroServerApi;  
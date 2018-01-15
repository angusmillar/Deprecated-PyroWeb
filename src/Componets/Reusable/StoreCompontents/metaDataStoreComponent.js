import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Grid, Divider, Container, Header } from 'semantic-ui-react'

import AjaxConstant from 'Constants/AjaxConstant';
import PyroServerApi from '../../PyroFhirApi/PyroServerApi';
import PageDimmer from '../PageDimmer/PageDimmer';

export default class MetaDataStoreComponent extends React.Component {
    
    static propTypes = {
        store: PropTypes.object.isRequired,
    };

    static defaultProps = {        
    }

    constructor(props) {
        super(props);       
    }

    renderApiDocumentation() {
        if (this.props.store.MetadataState.AjaxCallState === AjaxConstant.CallState.Call_None) {
            return null;
        }
        else if (this.props.store.MetadataState.AjaxCallState === AjaxConstant.CallState.Call_Pending) {
            return <PageDimmer />
        }
        else if (this.props.store.MetadataState.AjaxCallState === AjaxConstant.CallState.Call_Complete) {
            if (this.props.store.MetadataState.AjaxOutcome.CallCompletedState == AjaxConstant.CallCompletedState.Completed_Ok) {
                return <PyroServerApi ConformanceStatmentResource={this.props.store.MetadataState.AjaxOutcome.FhirResource} />
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
        const ApiDocumentation = this.renderApiDocumentation();
        return (
            <Container style={{ marginTop: '7em' }}>
                <div>
                    <Divider hidden />
                    <Header as='h2'>
                        <Icon name='settings' />
                        <Header.Content>
                            FHIR API Documentation
                    </Header.Content>
                    </Header>
                    <Grid>
                        <Grid.Row only='tablet computer' >
                            <div style={{ width: '1000px' }}>
                                {ApiDocumentation}
                            </div>
                        </Grid.Row>
                        <Grid.Row only='mobile' >
                            <div style={{ width: '640px' }}>
                                {ApiDocumentation}
                            </div>
                        </Grid.Row>
                    </Grid>
                </div>
            </Container>
        )
    }

}

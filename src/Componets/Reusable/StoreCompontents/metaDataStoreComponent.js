import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Grid, Header } from 'semantic-ui-react'

import AjaxConstant from 'Constants/AjaxConstant';
import PyroServerApi from '../../PyroFhirApi/PyroServerApi';
import PyroServerConformanceStatmentComponent from '../../Conformance/PyroServerConformanceStatmentComponent'
import PageDimmer from '../PageDimmer/PageDimmer';

export default class MetaDataStoreComponent extends React.Component {

    static propTypes = {
        store: PropTypes.object.isRequired,
        renderType: PropTypes.string.isRequired,
    };

    static defaultProps = {
    }

    constructor(props) {
        super(props);
    }

    //The enum of which type to render as these both use the same store data
    static RenderType = {
        ServerAPI: 'ServerAPI',
        ServerConformanceStatment: 'ServerConformanceStatment',
    };

    renderBody() {
        if (this.props.store.MetadataState.AjaxCallState === AjaxConstant.CallState.Call_None) {
            return null;
        }
        else if (this.props.store.MetadataState.AjaxCallState === AjaxConstant.CallState.Call_Pending) {
            return <PageDimmer />
        }
        else if (this.props.store.MetadataState.AjaxCallState === AjaxConstant.CallState.Call_Complete) {
            if (this.props.store.MetadataState.AjaxOutcome.CallCompletedState == AjaxConstant.CallCompletedState.Completed_Ok) {
                if (this.props.renderType === MetaDataStoreComponent.RenderType.ServerAPI) {
                    return <PyroServerApi ConformanceStatmentResource={this.props.store.MetadataState.AjaxOutcome.FhirResource} />
                } else if (this.props.renderType === MetaDataStoreComponent.RenderType.ServerConformanceStatment) {
                    return <PyroServerConformanceStatmentComponent ConformanceStatmentResource={this.props.store.MetadataState.AjaxOutcome.FhirResource} />
                } else {
                    return <h2>Render Type switch was not set correctly</h2>
                }
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
        const renderHeader = () => {
            if (this.props.renderType === MetaDataStoreComponent.RenderType.ServerAPI) {
                return 'FHIR API Documentation';
            } else if (this.props.renderType === MetaDataStoreComponent.RenderType.ServerConformanceStatment) {
                return 'FHIR Server Conformance Statement'
            } else {
                return 'Render Switch was not set correctly'
            }
        }

        const Body = this.renderBody();
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={16} >
                        <Header as='h2'>
                            <Icon name='settings' />
                            <Header.Content>
                                {renderHeader()}
                            </Header.Content>
                        </Header>
                    </Grid.Column>
                </Grid.Row>
                {/* <Divider hidden /> */}
                <Grid.Row only='tablet computer' >
                    <Grid.Column width={16} >
                        {/* <div style={{ width: '1000px' }}> */}
                            {Body}
                        {/* </div> */}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row only='mobile' >
                    <Grid.Column width={16} >
                        {/* <div style={{ width: '640px' }}> */}
                            {Body}
                        {/* </div> */}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

}

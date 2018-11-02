import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Grid, Header } from 'semantic-ui-react'

import AjaxConstant from 'Constants/AjaxConstant';
import PyroServerApi from '../../PyroFhirApi/PyroServerApi';
import PyroServerConformanceStatmentComponent from '../../Conformance/PyroServerConformanceStatmentComponent'
import PageDimmer from '../PageDimmer/PageDimmer';
import FhirServerConstant from '../../../Constants/FhirServerConstant';

export default class MetaDataStoreComponent extends React.Component {

    static propTypes = {
        metadataState: PropTypes.object.isRequired,
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
        
        const Metadata = this.props.metadataState

        if (Metadata.AjaxCallState === AjaxConstant.CallState.Call_None) {
            return null;
        }
        else if (Metadata.AjaxCallState === AjaxConstant.CallState.Call_Pending) {
            return <PageDimmer />
        }
        else if (Metadata.AjaxCallState === AjaxConstant.CallState.Call_Complete) {
            if (Metadata.AjaxOutcome.CallCompletedState == AjaxConstant.CallCompletedState.Completed_Ok) {
                if (this.props.renderType === MetaDataStoreComponent.RenderType.ServerAPI) {
                    return <PyroServerApi ConformanceStatmentResource={Metadata.AjaxOutcome.FhirResource} FhirServerName={Metadata.FhirServerName} />
                } else if (this.props.renderType === MetaDataStoreComponent.RenderType.ServerConformanceStatment) {
                    return <PyroServerConformanceStatmentComponent ConformanceStatmentResource={Metadata.AjaxOutcome.FhirResource} FhirServerName={Metadata.FhirServerName} />
                } else {
                    return <h2>Render Type switch was not set correctly</h2>
                }
            }
            else if (Metadata.AjaxOutcome.CallCompletedState == AjaxConstant.CallCompletedState.Completed_ResponseNotOk) {
                return <h2>Response was not OK Maybe a FHIR OperationOutcome, work to do here!</h2>
            }
            else if (Metadata.AjaxOutcome.CallCompletedState == AjaxConstant.CallCompletedState.Completed_NoResponse) {
                    // return <h2>We got no response from the Ajax call, work to do here!</h2>
                return <h2>{Metadata.AjaxOutcome.ErrorMessage}</h2>
            }
            else if (Metadata.AjaxOutcome.CallCompletedState == AjaxConstant.CallCompletedState.Completed_CallSetupFailed) {
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
                if (this.props.metadataState.FhirServerName == FhirServerConstant.PyroServerStu3Name) {
                    return 'Pyro server STU3 API documentation';    
                } else if (this.props.metadataState.FhirServerName == FhirServerConstant.PyroServerR4Name) {
                    return 'Pyro server R4 API documentation';    
                } else {
                    return 'API documentation';    
                }                
            } else if (this.props.renderType === MetaDataStoreComponent.RenderType.ServerConformanceStatment) {
                if (this.props.metadataState.FhirServerName == FhirServerConstant.PyroServerStu3Name) {
                    return 'Pyro server FHIR STU3 conformance statement'
                } else if (this.props.metadataState.FhirServerName == FhirServerConstant.PyroServerR4Name) {
                    return 'Pyro server FHIR R4 conformance statement'
                } else {
                    return 'FHIR server conformance statement'
                }                
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
                <Grid.Row>
                    <Grid.Column width={16} >                        
                            {Body}                        
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

}
